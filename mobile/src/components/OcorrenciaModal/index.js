import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  View,
} from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import api from "../../services/api";

import {
  Sheet,
  Handle,
  Header,
  CloseButton,
  TypeBadge,
  TypeLabel,
  TitleText,
  Section,
  SectionTitle,
  Description,
  MetaRow,
  MetaText,
  PhotoImage,
  PhotoListContent,
  CommentCard,
  CommentHeader,
  CommentAvatar,
  CommentAvatarText,
  CommentAuthor,
  CommentBody,
  CommentDate,
  EmptyText,
  LoadingWrapper,
  InputArea,
  CommentInputWrapper,
  SendButton,
  SendButtonDisabled,
} from "./styles";

const TYPE_CONFIG = {
  ROUBO: {
    icon: "alert",
    color: "#e53935",
    label: "Roubo",
    bg: "#fdecea",
  },
  ACIDENTE: {
    icon: "car-emergency",
    color: "#fb8c00",
    label: "Acidente",
    bg: "#fff3e0",
  },
  BARULHO: {
    icon: "volume-high",
    color: "#1e88e5",
    label: "Barulho",
    bg: "#e3f2fd",
  },
  INCENDIO: {
    icon: "fire",
    color: "#d32f2f",
    label: "Incêndio",
    bg: "#ffebee",
  },
};

const CATEGORY_CONFIG = {
  TRAFFIC: {
    icon: "car",
    color: "#f59e0b",
    label: "Trânsito",
    bg: "#fef3c7",
  },
  INFRASTRUCTURE: {
    icon: "hammer-wrench",
    color: "#ef4444",
    label: "Infraestrutura",
    bg: "#fee2e2",
  },
  SANITATION: {
    icon: "trash-can-outline",
    color: "#10b981",
    label: "Saneamento",
    bg: "#d1fae5",
  },
  SECURITY: {
    icon: "shield-outline",
    color: "#3b82f6",
    label: "Segurança",
    bg: "#dbeafe",
  },
  ENVIRONMENT: {
    icon: "leaf",
    color: "#22c55e",
    label: "Meio ambiente",
    bg: "#dcfce7",
  },
  OTHER: {
    icon: "alert-circle",
    color: "#6b7280",
    label: "Outras",
    bg: "#f3f4f6",
  },
};

const getConfig = (item) =>
  CATEGORY_CONFIG[item?.category] ??
  TYPE_CONFIG[item?.type] ?? {
    icon: "alert-circle",
    color: "#0B49B7",
    label: item?.category ?? item?.type ?? "Ocorrência",
    bg: "#eef4ff",
  };

function formatarTempo(data) {
  const diff = Date.now() - new Date(data).getTime();
  const minutos = Math.floor(diff / 60000);

  if (minutos < 1) return "agora";
  if (minutos < 60) return `${minutos} min atrás`;

  const horas = Math.floor(minutos / 60);
  if (horas < 24) return `${horas}h atrás`;

  const dias = Math.floor(horas / 24);
  if (dias === 1) return "ontem";
  return `${dias} dias atrás`;
}

function getInitials(name) {
  if (!name) return "?";

  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function OcorrenciaModal({ item, visible, onClose }) {
  const bottomSheetRef = useRef(null);

  const [details, setDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [sendingComment, setSendingComment] = useState(false);

  const snapPoints = useMemo(() => ["55%", "88%"], []);

  const cfg = getConfig(item);
  const data = details ?? item;

  useEffect(() => {
    if (visible && item) {
      bottomSheetRef.current?.snapToIndex(0);
      fetchDetails();
    } else {
      bottomSheetRef.current?.close();
      setDetails(null);
      setCommentText("");
      Keyboard.dismiss();
    }
  }, [visible, item]);

  async function fetchDetails() {
    setLoadingDetails(true);

    try {
      const [detailsRes, commentsRes] = await Promise.all([
        api.get(`/occurrences/${item.id}`),
        api.get(`/occurrences/${item.id}/comments`),
      ]);

      setDetails({
        ...detailsRes.data,
        comments: commentsRes.data,
      });
    } catch {
      Alert.alert("Erro", "Não foi possível carregar os detalhes.");
    } finally {
      setLoadingDetails(false);
    }
  }

  async function handleSendComment() {
    if (!commentText.trim() || sendingComment) return;

    setSendingComment(true);

    try {
      const response = await api.post(`/occurrences/${item.id}/comments`, {
        text: commentText.trim(),
      });

      setDetails((prev) => ({
        ...prev,
        comments: [...(prev?.comments ?? []), response.data],
      }));

      setCommentText("");
      Keyboard.dismiss();
    } catch {
      Alert.alert("Erro", "Não foi possível enviar o comentário.");
    } finally {
      setSendingComment(false);
    }
  }

  function handleSheetChange(index) {
    if (index === -1) {
      onClose();
    }
  }

  const renderBackdrop = useMemo(
    () => (props) =>
      (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.45}
          pressBehavior="close"
        />
      ),
    []
  );

  function renderHeader() {
    return (
      <>
        <Header>
          <View style={{ flex: 1, paddingRight: 14 }}>
            <TypeBadge bg={cfg.bg}>
              <MaterialCommunityIcons
                name={cfg.icon}
                size={14}
                color={cfg.color}
              />
              <TypeLabel color={cfg.color}>{cfg.label}</TypeLabel>
            </TypeBadge>

            <TitleText numberOfLines={2}>{item?.title}</TitleText>
          </View>

          <CloseButton activeOpacity={0.75} onPress={onClose}>
            <MaterialCommunityIcons name="close" size={22} color="#8A9BC4" />
          </CloseButton>
        </Header>

        {loadingDetails ? (
          <LoadingWrapper>
            <ActivityIndicator size="large" color={cfg.color} />
          </LoadingWrapper>
        ) : (
          <>
            <Section>
              <SectionTitle>Descrição</SectionTitle>
              <Description>{data?.description || "Sem descrição informada."}</Description>

              {data?.createdAt ? (
                <MetaRow>
                  <MaterialCommunityIcons
                    name="clock-outline"
                    size={15}
                    color="#8A9BC4"
                  />
                  <MetaText>{formatarTempo(data.createdAt)}</MetaText>
                </MetaRow>
              ) : null}

              {data?.address ? (
                <MetaRow>
                  <MaterialCommunityIcons
                    name="map-marker-outline"
                    size={15}
                    color="#8A9BC4"
                  />
                  <MetaText>{data.address}</MetaText>
                </MetaRow>
              ) : null}

              <MetaRow>
                <MaterialCommunityIcons
                  name="account-outline"
                  size={15}
                  color="#8A9BC4"
                />
                <MetaText>{data?.userName ?? "Usuário desconhecido"}</MetaText>
              </MetaRow>
            </Section>

            {data?.photoUrls?.length > 0 ? (
              <Section>
                <SectionTitle>Fotos ({data.photoUrls.length})</SectionTitle>

                <BottomSheetFlatList
                  data={data.photoUrls}
                  horizontal
                  keyExtractor={(_, index) => String(index)}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item: url }) => (
                    <PhotoImage source={{ uri: `${api.defaults.baseURL}${url}` }} />
                  )}
                  ListFooterComponent={<PhotoListContent />}
                />
              </Section>
            ) : null}

            <Section>
              <SectionTitle>
                Comentários ({data?.comments?.length ?? 0})
              </SectionTitle>
            </Section>
          </>
        )}
      </>
    );
  }

  function renderComment({ item: comment }) {
    return (
      <CommentCard>
        <CommentHeader>
          <CommentAvatar>
            <CommentAvatarText>{getInitials(comment.userName)}</CommentAvatarText>
          </CommentAvatar>

          <View style={{ flex: 1 }}>
            <CommentAuthor>{comment.userName ?? "Anônimo"}</CommentAuthor>

            {comment.createdAt ? (
              <CommentDate>{formatarTempo(comment.createdAt)}</CommentDate>
            ) : null}
          </View>
        </CommentHeader>

        <CommentBody>{comment.text}</CommentBody>
      </CommentCard>
    );
  }

  if (!item) return null;

  return (
    <Sheet
      ref={bottomSheetRef}
      index={visible ? 0 : -1}
      snapPoints={snapPoints}
      enablePanDownToClose
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      backdropComponent={renderBackdrop}
      onChange={handleSheetChange}
      handleComponent={() => <Handle />}
      backgroundStyle={{
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
      }}
    >
      <BottomSheetFlatList
        data={loadingDetails ? [] : data?.comments ?? []}
        keyExtractor={(comment, index) => String(comment.id ?? index)}
        renderItem={renderComment}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          !loadingDetails ? (
            <EmptyText>Nenhum comentário ainda.</EmptyText>
          ) : null
        }
        contentContainerStyle={{
          paddingBottom: 180,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />

      {!loadingDetails ? (
        <InputArea>
          <CommentInputWrapper>
            <BottomSheetTextInput
              placeholder="Escreva um comentário..."
              placeholderTextColor="#A7B6D8"
              value={commentText}
              onChangeText={setCommentText}
              multiline
              maxLength={280}
              style={{
                flex: 1,
                minHeight: 44,
                maxHeight: 94,
                fontSize: 14,
                fontWeight: "600",
                color: "#132F6B",
                paddingTop: 12,
                paddingBottom: 12,
              }}
            />
          </CommentInputWrapper>

          {commentText.trim() && !sendingComment ? (
            <SendButton activeOpacity={0.82} onPress={handleSendComment}>
              <MaterialCommunityIcons name="send" size={19} color="#FFFFFF" />
            </SendButton>
          ) : (
            <SendButtonDisabled disabled>
              {sendingComment ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <MaterialCommunityIcons name="send" size={19} color="#FFFFFF" />
              )}
            </SendButtonDisabled>
          )}
        </InputArea>
      ) : null}
    </Sheet>
  );
}