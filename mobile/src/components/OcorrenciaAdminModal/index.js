import React, { useEffect, useState } from "react";
import {
  Modal,
  Alert,
  ActivityIndicator,
  FlatList,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import api from "../../services/api";

const { width, height } = Dimensions.get("window");

const c = {
  bg:           "#F0F4FF",
  card:         "#FFFFFF",
  accent:       "#1B4FBB",
  accentLight:  "rgba(27,79,187,0.1)",
  text:         "#111827",
  textSub:      "#6B7280",
  textMuted:    "#9CA3AF",
  border:       "#E4EAF7",
  success:      "#10b981",
  successLight: "rgba(16,185,129,0.12)",
  warning:      "#f59e0b",
  warningLight: "rgba(245,158,11,0.12)",
  danger:       "#EF4444",
  dangerLight:  "rgba(239,68,68,0.12)",
  gray:         "#6b7280",
  grayLight:    "rgba(107,114,128,0.1)",
};

const CATEGORY_CONFIG = {
  TRAFFIC:        { icon: "car",               color: "#f59e0b", label: "Trânsito",       bg: "#fef3c7" },
  INFRASTRUCTURE: { icon: "hammer-wrench",     color: "#ef4444", label: "Infraestrutura", bg: "#fee2e2" },
  SANITATION:     { icon: "trash-can-outline", color: "#10b981", label: "Saneamento",     bg: "#d1fae5" },
  SECURITY:       { icon: "shield-outline",    color: "#3b82f6", label: "Segurança",      bg: "#dbeafe" },
  ENVIRONMENT:    { icon: "leaf",              color: "#22c55e", label: "Meio ambiente",  bg: "#dcfce7" },
  OTHER:          { icon: "alert-circle",      color: "#6b7280", label: "Outras",         bg: "#f3f4f6" },
};

const TYPE_CONFIG = {
  ROUBO:    { icon: "alert",         color: "#e53935", label: "Roubo",    bg: "#fdecea" },
  ACIDENTE: { icon: "car-emergency", color: "#fb8c00", label: "Acidente", bg: "#fff3e0" },
  BARULHO:  { icon: "volume-high",   color: "#1e88e5", label: "Barulho",  bg: "#e3f2fd" },
  INCENDIO: { icon: "fire",          color: "#d32f2f", label: "Incêndio", bg: "#ffebee" },
};

const getConfig = (item) =>
  CATEGORY_CONFIG[item?.category] ??
  TYPE_CONFIG[item?.type] ?? {
    icon: "alert-circle",
    color: c.accent,
    label: item?.category ?? item?.type ?? "Ocorrência",
    bg: c.accentLight,
  };

export default function OcorrenciaAdminModal({
  item,
  visible,
  isPending,
  acting,
  onClose,
  onApprove,
  onReject,
}) {
  const [details, setDetails]           = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [commentText, setCommentText]   = useState("");
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
      setDetails({ ...detailsRes.data, comments: commentsRes.data });
    } catch {
      Alert.alert("Erro", "Não foi possível carregar os detalhes.");
    } finally {
      setLoadingDetails(false);
    }
  }

  async function handleSendComment() {
    if (!commentText.trim()) return;
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
    } catch {
      Alert.alert("Erro", "Não foi possível enviar o comentário.");
    } finally {
      setSendingComment(false);
    }
  }

  if (!item) return null;

  const cfg  = getConfig(item);
  const data = details ?? item;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={s.overlay}>
        <View style={s.sheet}>

          {/* Handle */}
          <View style={s.handle} />

          {/* ── Header ── */}
          <View style={s.header}>
            <View style={[s.badge, { backgroundColor: cfg.bg }]}>
              <MaterialCommunityIcons name={cfg.icon} size={14} color={cfg.color} />
              <Text style={[s.badgeLabel, { color: cfg.color }]}>{cfg.label}</Text>
            </View>

            <Text style={s.headerTitle} numberOfLines={2}>{item.title}</Text>

            <TouchableOpacity onPress={onClose} style={s.closeBtn}>
              <MaterialCommunityIcons name="close" size={22} color={c.textMuted} />
            </TouchableOpacity>
          </View>

          {/* ── Botões admin (pending only) ── */}
          {isPending && (
            <View style={s.adminBar}>
              <TouchableOpacity
                style={[s.adminBtn, { backgroundColor: c.successLight }]}
                onPress={() => onApprove(item.id)}
                disabled={acting === item.id}
                activeOpacity={0.75}
              >
                {acting === item.id ? (
                  <ActivityIndicator size="small" color={c.success} />
                ) : (
                  <>
                    <Feather name="check-circle" size={16} color={c.success} />
                    <Text style={[s.adminBtnText, { color: c.success }]}>
                      Aprovar
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[s.adminBtn, { backgroundColor: c.dangerLight }]}
                onPress={() => onReject(item.id)}
                disabled={acting === item.id}
                activeOpacity={0.75}
              >
                <Feather name="x-circle" size={16} color={c.danger} />
                <Text style={[s.adminBtnText, { color: c.danger }]}>
                  Rejeitar
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ── Conteúdo ── */}
          {loadingDetails ? (
            <View style={s.loadingBox}>
              <ActivityIndicator size="large" color={cfg.color} />
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={s.scroll}
            >
              {/* Meta info */}
              <View style={s.metaCard}>
                <View style={s.metaRow}>
                  <MaterialCommunityIcons name="clock-outline" size={15} color={c.textMuted} />
                  <Text style={s.metaText}>
                    {new Date(data.createdAt).toLocaleString("pt-BR")}
                  </Text>
                </View>

                {data.address && (
                  <View style={s.metaRow}>
                    <MaterialCommunityIcons name="map-marker-outline" size={15} color={c.textMuted} />
                    <Text style={s.metaText}>{data.address}</Text>
                  </View>
                )}

                <View style={s.metaRow}>
                  <MaterialCommunityIcons name="account-outline" size={15} color={c.textMuted} />
                  <Text style={s.metaText}>{data.userName ?? "Usuário desconhecido"}</Text>
                </View>
              </View>

              {/* Descrição */}
              <View style={s.section}>
                <Text style={s.sectionTitle}>Descrição</Text>
                <Text style={s.description}>{data.description || "—"}</Text>
              </View>

              {/* Fotos */}
              {data.photoUrls?.length > 0 && (
                <View style={s.section}>
                  <Text style={s.sectionTitle}>
                    Fotos ({data.photoUrls.length})
                  </Text>
                  <FlatList
                    data={data.photoUrls}
                    horizontal
                    keyExtractor={(_, i) => String(i)}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item: url }) => (
                      <View style={s.photoWrapper}>
                        <View style={s.photo}>
                          <MaterialCommunityIcons
                            name="image"
                            size={32}
                            color={c.textMuted}
                          />
                        </View>
                      </View>
                    )}
                    contentContainerStyle={{ paddingBottom: 4 }}
                  />
                </View>
              )}

              {/* Comentários */}
              <View style={s.section}>
                <Text style={s.sectionTitle}>
                  Comentários ({data.comments?.length ?? 0})
                </Text>

                {data.comments?.length > 0 ? (
                  data.comments.map((cm, i) => (
                    <View key={cm.id ?? i} style={s.commentCard}>
                      <View style={s.commentHeader}>
                        <View style={s.avatar}>
                          <Text style={s.avatarText}>
                            {(cm.userName ?? "?")[0].toUpperCase()}
                          </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={s.commentAuthor}>
                            {cm.userName ?? "Anônimo"}
                          </Text>
                          {cm.createdAt && (
                            <Text style={s.commentDate}>
                              {new Date(cm.createdAt).toLocaleString("pt-BR")}
                            </Text>
                          )}
                        </View>
                      </View>
                      <Text style={s.commentBody}>{cm.text}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={s.emptyComments}>Nenhum comentário ainda.</Text>
                )}
              </View>

              <View style={{ height: 32 }} />
            </ScrollView>
          )}

          {/* ── Input comentário ── */}
          {!loadingDetails && (
            <View style={s.inputRow}>
              <View style={s.inputWrap}>
                <MaterialCommunityIcons
                  name="comment-outline"
                  size={16}
                  color={c.textMuted}
                  style={{ marginRight: 8 }}
                />
                <View style={{ flex: 1 }}>
                  <View
                    style={s.commentInputFake}
                    // workaround: use TextInput via StyleSheet
                  >
                    <TextInputInline
                      value={commentText}
                      onChangeText={setCommentText}
                    />
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  s.sendBtn,
                  { backgroundColor: commentText.trim() && !sendingComment ? c.accent : c.border },
                ]}
                onPress={handleSendComment}
                disabled={!commentText.trim() || sendingComment}
              >
                {sendingComment ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Feather name="send" size={16} color="#fff" />
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

// Inline TextInput sem styled-components para evitar import extra
function TextInputInline({ value, onChangeText }) {
  const { TextInput } = require("react-native");
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder="Escreva um comentário..."
      placeholderTextColor={c.textMuted}
      multiline
      style={{
        fontSize: 14,
        color: c.text,
        minHeight: 20,
        maxHeight: 80,
        padding: 0,
      }}
    />
  );
}

const s = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: c.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: height * 0.9,
    overflow: "hidden",
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: c.border,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 4,
  },

  // header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
    gap: 10,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    gap: 5,
  },
  badgeLabel: {
    fontSize: 12,
    fontWeight: "700",
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: c.text,
  },
  closeBtn: {
    padding: 4,
  },

  // admin bar
  adminBar: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  adminBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  adminBtnText: {
    fontSize: 14,
    fontWeight: "700",
  },

  // loading
  loadingBox: {
    paddingVertical: 60,
    alignItems: "center",
  },

  // scroll content
  scroll: {
    paddingBottom: 8,
  },

  // meta card
  metaCard: {
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: c.bg,
    borderRadius: 14,
    padding: 14,
    gap: 8,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  metaText: {
    fontSize: 13,
    color: c.textSub,
    flex: 1,
  },

  // sections
  section: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: c.textMuted,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: c.text,
    lineHeight: 23,
  },

  // photo
  photoWrapper: {
    marginRight: 10,
  },
  photo: {
    width: width * 0.55,
    height: 150,
    borderRadius: 14,
    backgroundColor: c.border,
    alignItems: "center",
    justifyContent: "center",
  },

  // comments
  commentCard: {
    backgroundColor: c.bg,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: c.accentLight,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 13,
    fontWeight: "700",
    color: c.accent,
  },
  commentAuthor: {
    fontSize: 13,
    fontWeight: "700",
    color: c.text,
  },
  commentDate: {
    fontSize: 11,
    color: c.textMuted,
    marginTop: 1,
  },
  commentBody: {
    fontSize: 14,
    color: c.textSub,
    lineHeight: 20,
  },
  emptyComments: {
    fontSize: 13,
    color: c.textMuted,
    fontStyle: "italic",
  },

  // input
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: c.border,
    gap: 10,
    backgroundColor: c.card,
  },
  inputWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: c.bg,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    minHeight: 44,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
});