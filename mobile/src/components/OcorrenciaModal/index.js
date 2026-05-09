import React, { useEffect, useState } from "react";
import {
  Modal,
  Alert,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  Overlay,
  Sheet,
  Handle,
  Header,
  TypeBadge,
  TypeLabel,
  TitleText,
  CloseButton,
  Section,
  SectionTitle,
  Description,
  MetaRow,
  MetaText,
  PhotoImage,
  CommentCard,
  CommentAuthor,
  CommentBody,
  CommentDate,
  EmptyText,
  InputRow,
  CommentInput,
  SendButton,
  PhotoListContent,
  Spacer,
  LoadingWrapper,
} from "./styles";

import api from "../../services/api";

const TYPE_CONFIG = {
  ROUBO: { icon: "alert", color: "#e53935", label: "Roubo", bg: "#fdecea" },
  ACIDENTE: { icon: "car-emergency", color: "#fb8c00", label: "Acidente", bg: "#fff3e0" },
  BARULHO: { icon: "volume-high", color: "#1e88e5", label: "Barulho", bg: "#e3f2fd" },
  INCENDIO: { icon: "fire", color: "#d32f2f", label: "Incêndio", bg: "#ffebee" },
};

const getConfig = (tipo) =>
  TYPE_CONFIG[tipo] ?? {
    icon: "alert-circle",
    color: "#555",
    label: tipo,
    bg: "#f5f5f5",
  };

export default function OcorrenciaModal({ item, visible, onClose }) {
  const [details, setDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [sendingComment, setSendingComment] = useState(false);

  useEffect(() => {
    if (visible && item) fetchDetails();
    else {
      setDetails(null);
      setCommentText("");
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
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes.");
    } finally {
      setLoadingDetails(false);
    }
  }

  async function handleSendComment() {
    if (!commentText.trim()) return;

    setSendingComment(true);
    try {
      const response = await api.post(
        `/occurrences/${item.id}/comments`,
        { text: commentText.trim() }
      );

      setDetails((prev) => ({
        ...prev,
        comments: [...(prev?.comments ?? []), response.data],
      }));

      setCommentText("");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível enviar o comentário.");
    } finally {
      setSendingComment(false);
    }
  }

  if (!item) return null;

  const cfg = getConfig(item.type);
  const data = details ?? item;

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <Overlay>
        <Sheet>
          <Handle />

          <Header>
            <TypeBadge bg={cfg.bg}>
              <MaterialCommunityIcons name={cfg.icon} size={14} color={cfg.color} />
              <TypeLabel color={cfg.color}>{cfg.label}</TypeLabel>
            </TypeBadge>

            <TitleText numberOfLines={2}>{item.title}</TitleText>

            <CloseButton onPress={onClose}>
              <MaterialCommunityIcons name="close" size={22} color="#aaa" />
            </CloseButton>
          </Header>

          {loadingDetails ? (
            <LoadingWrapper>
              <ActivityIndicator size="large" color={cfg.color} />
            </LoadingWrapper>
          ) : (
            <FlatList
              data={[0]}
              renderItem={() => null}
              scrollEnabled={false}
              ListHeaderComponent={
                <>
                  <Section>
                    <SectionTitle>Descrição</SectionTitle>
                    <Description>{data.description || "—"}</Description>

                    {data.createdAt && (
                      <MetaRow>
                        <MaterialCommunityIcons name="clock-outline" size={14} color="#bbb" />
                        <MetaText>
                          {new Date(data.createdAt).toLocaleString("pt-BR")}
                        </MetaText>
                      </MetaRow>
                    )}

                    {data.address && (
                      <MetaRow>
                        <MaterialCommunityIcons name="map-marker-outline" size={14} color="#bbb" />
                        <MetaText>{data.address}</MetaText>
                      </MetaRow>
                    )}

                    <MetaRow>
                      <MaterialCommunityIcons name="account-outline" size={14} color="#bbb" />
                      <MetaText>{data.userName ?? "Usuário desconhecido"}</MetaText>
                    </MetaRow>
                  </Section>

                  {data.photos?.length > 0 && (
                    <Section>
                      <SectionTitle>Fotos ({data.photos.length})</SectionTitle>

                      <FlatList
                        data={data.photos}
                        horizontal
                        keyExtractor={(p, i) => String(p.id ?? i)}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item: photo }) => (
                          <PhotoImage source={{ uri: photo.url }} />
                        )}
                        ListFooterComponent={<PhotoListContent />}
                      />
                    </Section>
                  )}

                  <Section>
                    <SectionTitle>
                      Comentários ({data.comments?.length ?? 0})
                    </SectionTitle>

                    {data.comments?.length > 0 ? (
                      data.comments.map((c, i) => (
                        <CommentCard key={c.id ?? i}>
                          <CommentAuthor>{c.userName ?? "Anônimo"}</CommentAuthor>
                          <CommentBody>{c.text}</CommentBody>
                          {c.createdAt && (
                            <CommentDate>
                              {new Date(c.createdAt).toLocaleString("pt-BR")}
                            </CommentDate>
                          )}
                        </CommentCard>
                      ))
                    ) : (
                      <EmptyText>Nenhum comentário ainda.</EmptyText>
                    )}
                  </Section>

                  <Spacer />
                </>
              }
            />
          )}

          {!loadingDetails && (
            <InputRow>
              <CommentInput
                placeholder="Escreva um comentário..."
                placeholderTextColor="#bbb"
                value={commentText}
                onChangeText={setCommentText}
                multiline
              />

              <SendButton
                onPress={handleSendComment}
                disabled={!commentText.trim() || sendingComment}
              >
                {sendingComment ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <MaterialCommunityIcons name="send" size={18} color="#fff" />
                )}
              </SendButton>
            </InputRow>
          )}
        </Sheet>
      </Overlay>
    </Modal>
  );
}