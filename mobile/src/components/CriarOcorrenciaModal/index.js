import React, { useState, useEffect, useRef } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";

import api from "../../services/api";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.45;

const c = {
  bg: "#FFFFFF",
  overlay: "rgba(0,0,0,0.35)",
  border: "#E8EAF0",
  surface: "#F5F6FA",
  accent: "#2563EB",
  accentLight: "rgba(37,99,235,0.1)",
  text: "#111827",
  textSub: "#6B7280",
  textMuted: "#9CA3AF",
  track: "#E5E7EB",
  handle: "#D1D5DB",
  danger: "#EF4444",
};

const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${c.overlay};
`;

const Sheet = styled.View`
  height: ${SHEET_HEIGHT}px;
  background-color: ${c.bg};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
`;

const Handle = styled.View`
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background-color: ${c.handle};
  align-self: center;
  margin-top: 12px;
`;

const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 14px 20px 0px;
`;

const SheetTitle = styled.Text`
  flex: 1;
  font-size: 17px;
  font-weight: 700;
  color: ${c.text};
`;

const CloseButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${c.surface};
  align-items: center;
  justify-content: center;
`;

const FieldLabel = styled.Text`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${c.textSub};
  margin-bottom: 6px;
`;

const StyledInput = styled.TextInput.attrs({
  placeholderTextColor: c.textMuted,
})`
  background-color: ${c.surface};
  border-radius: 10px;
  padding: 11px 14px;
  font-size: 14px;
  color: ${c.text};
  margin-bottom: 14px;
`;

const CategoryRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 16px;
`;

const Chip = styled.TouchableOpacity`
  padding: 6px 12px;
  border-radius: 20px;
  border-width: 1.5px;
  border-color: ${({ selected }) => (selected ? c.accent : c.border)};
  background-color: ${({ selected }) => (selected ? c.accentLight : c.bg)};
`;

const ChipText = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${({ selected }) => (selected ? c.accent : c.textSub)};
`;

const RadiusTrackRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const RadiusBtn = styled.TouchableOpacity`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  border-width: 1.5px;
  border-color: ${c.border};
  align-items: center;
  justify-content: center;
`;

const TrackBg = styled.View`
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background-color: ${c.track};
`;

const TrackFill = styled.View`
  height: 6px;
  border-radius: 3px;
  background-color: ${c.accent};
  width: ${({ pct }) => `${Math.round(pct * 100)}%`};
`;

const RadiusLabel = styled.Text`
  font-size: 13px;
  font-weight: 700;
  color: ${c.accent};
  min-width: 52px;
  text-align: right;
`;

const PhotosRow = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  margin-bottom: 16px;
`;

const PhotoThumb = styled.View`
  width: 72px;
  height: 72px;
  border-radius: 10px;
  margin-right: 8px;
  overflow: hidden;
`;

const RemoveBadge = styled.TouchableOpacity`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-color: ${c.danger};
  align-items: center;
  justify-content: center;
`;

const RemoveBadgeText = styled.Text`
  color: #fff;
  font-size: 10px;
  font-weight: 700;
`;

const AddPhotoBtn = styled.TouchableOpacity`
  width: 88px;
  height: 72px;
  border-radius: 12px;
  border-width: 1.5px;
  border-color: ${c.border};
  background-color: ${c.surface};
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

const AddPhotoBtnText = styled.Text`
  font-size: 11px;
  font-weight: 600;
  color: ${c.textSub};
`;

const CreateBtn = styled.TouchableOpacity`
  background-color: ${({ disabled }) => (disabled ? c.textMuted : c.accent)};
  border-radius: 14px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const CreateBtnText = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: #fff;
`;

const MIN_RADIUS = 25;
const MAX_RADIUS = 500;
const STEP = 25;
const MAX_PHOTOS = 5;

const CATEGORIES = [
  { key: "TRAFFIC", label: "Trânsito" },
  { key: "INFRASTRUCTURE", label: "Infraestrutura" },
  { key: "SECURITY", label: "Segurança" },
  { key: "SANITATION", label: "Saneamento" },
  { key: "ENVIRONMENT", label: "Meio ambiente" },
  { key: "OTHER", label: "Outras" },
];

export default function CriarOcorrenciaModal({
  visible,
  coordinate,
  onClose,
  onCreate,
  onRadiusChange,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [radius, setRadius] = useState(100);
  const [category, setCategory] = useState("TRAFFIC");
  const [photos, setPhotos] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const slideAnim = useRef(new Animated.Value(SHEET_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          damping: 22,
          stiffness: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: SHEET_HEIGHT,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  useEffect(() => {
    onRadiusChange?.(visible ? radius : null);
  }, [radius, visible]);

  function changeRadius(delta) {
    setRadius((r) => Math.min(MAX_RADIUS, Math.max(MIN_RADIUS, r + delta)));
  }

  async function pickPhotos() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Acesso à galeria negado.");
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: true,
        selectionLimit: MAX_PHOTOS - photos.length,
        quality: 0.7,
      });

      if (result.canceled) return;

      const selected = result.assets.map((a) => ({
        uri: a.uri,
        name: a.fileName || `photo_${Date.now()}.jpg`,
        type: a.mimeType || "image/jpeg",
      }));

      setPhotos((p) => [...p, ...selected].slice(0, MAX_PHOTOS));
    } catch (err) {
      console.log(err);
      Alert.alert("Erro", "Falha ao abrir galeria.");
    }
  }

  async function takePhoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Acesso à câmera negado.");
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        quality: 0.7,
      });

      if (result.canceled) return;

      const a = result.assets[0];

      setPhotos((p) =>
        [
          ...p,
          {
            uri: a.uri,
            name: a.fileName || `camera_${Date.now()}.jpg`,
            type: a.mimeType || "image/jpeg",
          },
        ].slice(0, MAX_PHOTOS)
      );
    } catch (err) {
      console.log(err);
      Alert.alert("Erro", "Falha ao abrir câmera.");
    }
  }

  function removePhoto(i) {
    setPhotos((p) => p.filter((_, idx) => idx !== i));
  }

  function reset() {
    setTitle("");
    setDescription("");
    setRadius(100);
    setCategory("TRAFFIC");
    setPhotos([]);
  }

  async function submit() {
    if (!title.trim() || submitting) return;

    setSubmitting(true);

    try {
      const form = new FormData();

      // Explicitly set Content-Type to application/json so Spring can
      // deserialize the @RequestPart DTO instead of failing with
      // "Content-Type 'application/octet-stream' is not supported".
      form.append("data", {
        string: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          category,
          radius,
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
        }),
        type: "application/json",
        name: "data",
      });

      photos.forEach((p) => {
        form.append("photos", {
          uri: p.uri,
          name: p.name,
          type: p.type,
        });
      });

      await api.post("/occurrences", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      reset();
      onCreate?.();
      onClose?.();
    } catch (err) {
      console.log(err);
      Alert.alert("Erro", "Falha ao criar ocorrência.");
    } finally {
      setSubmitting(false);
    }
  }

  const pct = (radius - MIN_RADIUS) / (MAX_RADIUS - MIN_RADIUS);
  const canSubmit = title.trim().length > 0 && !submitting;

  return (
    <>
      <Animated.View
        pointerEvents={visible ? "auto" : "none"}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: fadeAnim,
        }}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <Overlay />
        </TouchableWithoutFeedback>
      </Animated.View>

      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <Sheet>
            <Handle />

            <HeaderRow>
              <SheetTitle>Nova Ocorrência</SheetTitle>

              <CloseButton onPress={onClose}>
                <Feather name="x" size={18} color={c.textSub} />
              </CloseButton>
            </HeaderRow>

            <ScrollView contentContainerStyle={{ padding: 20 }}>
              <FieldLabel>Título</FieldLabel>
              <StyledInput value={title} onChangeText={setTitle} />

              <FieldLabel>Descrição</FieldLabel>
              <StyledInput
                value={description}
                onChangeText={setDescription}
                multiline
                style={{ minHeight: 60 }}
              />

              <FieldLabel>Categoria</FieldLabel>

              <CategoryRow>
                {CATEGORIES.map((cat) => (
                  <Chip
                    key={cat.key}
                    selected={category === cat.key}
                    onPress={() => setCategory(cat.key)}
                  >
                    <ChipText selected={category === cat.key}>
                      {cat.label}
                    </ChipText>
                  </Chip>
                ))}
              </CategoryRow>

              <FieldLabel>Raio {radius}m</FieldLabel>

              <RadiusTrackRow>
                <RadiusBtn onPress={() => changeRadius(-STEP)}>
                  <Feather name="minus" size={18} />
                </RadiusBtn>

                <TrackBg>
                  <TrackFill pct={pct} />
                </TrackBg>

                <RadiusBtn onPress={() => changeRadius(STEP)}>
                  <Feather name="plus" size={18} />
                </RadiusBtn>

                <RadiusLabel>{radius}m</RadiusLabel>
              </RadiusTrackRow>

              <FieldLabel>Fotos</FieldLabel>

              <PhotosRow>
                {photos.map((p, i) => (
                  <PhotoThumb key={i}>
                    <Image source={{ uri: p.uri }} style={{ flex: 1 }} />
                    <RemoveBadge onPress={() => removePhoto(i)}>
                      <RemoveBadgeText>×</RemoveBadgeText>
                    </RemoveBadge>
                  </PhotoThumb>
                ))}

                {photos.length < MAX_PHOTOS && (
                  <>
                    <AddPhotoBtn onPress={pickPhotos}>
                      <Feather name="image" size={18} />
                      <AddPhotoBtnText>Galeria</AddPhotoBtnText>
                    </AddPhotoBtn>

                    <AddPhotoBtn onPress={takePhoto}>
                      <Feather name="camera" size={18} />
                      <AddPhotoBtnText>Câmera</AddPhotoBtnText>
                    </AddPhotoBtn>
                  </>
                )}
              </PhotosRow>

              <CreateBtn onPress={submit} disabled={!canSubmit}>
                <CreateBtnText>
                  {submitting ? "Enviando..." : "Criar ocorrência"}
                </CreateBtnText>
              </CreateBtn>
            </ScrollView>
          </Sheet>
        </KeyboardAvoidingView>
      </Animated.View>
    </>
  );
}