import React, { useCallback, useContext, useState } from "react";
import { Alert, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { AuthContext } from "../../contexts/auth";
import api from "../../services/api";

import {
  c,
  Container,
  HeaderBg,
  AvatarWrapper,
  UserName,
  UserEmail,
  StatsRow,
  StatCard,
  StatNumber,
  StatLabel,
  SectionTitle,
  OccurrenceCard,
  OccurrenceRow,
  OccurrenceTitle,
  StatusBadge,
  StatusText,
  OccurrenceDate,
  ReopenBtn,
  ReopenBtnText,
  EmptyText,
  LogoutBtn,
  LogoutText,
} from "./styles";

const STATUS_CONFIG = {
  APPROVED: { label: "Aprovada",  color: c.success, bg: c.successLight },
  PENDING:  { label: "Pendente",  color: c.warning, bg: c.warningLight },
  REJECTED: { label: "Rejeitada", color: c.danger,  bg: c.dangerLight  },
  EXPIRED:  { label: "Expirada",  color: c.gray,    bg: c.grayLight    },
};

export default function Perfil() {
  const { user, logOut } = useContext(AuthContext);
  const [occurrences, setOccurrences] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [reopening, setReopening]     = useState(null);

  useFocusEffect(
    useCallback(() => {
      loadMyOccurrences();
    }, [])
  );

  async function loadMyOccurrences() {
    setLoading(true);
    try {
      const response = await api.get("/occurrences/my");
      setOccurrences(response.data);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar suas ocorrências.");
    } finally {
      setLoading(false);
    }
  }

  async function handleReopen(id) {
    setReopening(id);
    try {
      await api.post(`/occurrences/${id}/reopen`);
      await loadMyOccurrences();
    } catch {
      Alert.alert("Erro", "Não foi possível reabrir a ocorrência.");
    } finally {
      setReopening(null);
    }
  }

  function handleLogout() {
    Alert.alert("Sair", "Deseja encerrar a sessão?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", style: "destructive", onPress: logOut },
    ]);
  }

  const total    = occurrences.length;
  const approved = occurrences.filter((o) => o.status === "APPROVED").length;
  const rejected = occurrences.filter((o) => o.status === "REJECTED").length;

  const initials = user?.name
    ?.split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() ?? "?";

  return (
    <Container>
      <HeaderBg>
        <AvatarWrapper>
          <UserName style={{ fontSize: 26, marginBottom: 0 }}>{initials}</UserName>
        </AvatarWrapper>
        <UserName>{user?.name ?? "Usuário"}</UserName>
        <UserEmail>{user?.email ?? ""}</UserEmail>
      </HeaderBg>

      <StatsRow>
        <StatCard>
          <StatNumber color={c.accent}>{total}</StatNumber>
          <StatLabel>Total</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber color={c.success}>{approved}</StatNumber>
          <StatLabel>Aprovadas</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber color={c.danger}>{rejected}</StatNumber>
          <StatLabel>Rejeitadas</StatLabel>
        </StatCard>
      </StatsRow>

      <SectionTitle>Minhas ocorrências</SectionTitle>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={c.accent}
          style={{ marginTop: 24 }}
        />
      ) : occurrences.length === 0 ? (
        <EmptyText>Você ainda não criou nenhuma ocorrência.</EmptyText>
      ) : (
        occurrences.map((item) => {
          const cfg = STATUS_CONFIG[item.status] ?? STATUS_CONFIG.PENDING;
          return (
            <OccurrenceCard key={item.id}>
              <OccurrenceRow>
                <OccurrenceTitle numberOfLines={2}>{item.title}</OccurrenceTitle>
                <StatusBadge bg={cfg.bg}>
                  <StatusText color={cfg.color}>{cfg.label}</StatusText>
                </StatusBadge>
              </OccurrenceRow>

              <OccurrenceDate>
                {new Date(item.createdAt).toLocaleString("pt-BR")}
              </OccurrenceDate>

              {item.status === "EXPIRED" && (
                <ReopenBtn
                  onPress={() => handleReopen(item.id)}
                  disabled={reopening === item.id}
                >
                  {reopening === item.id ? (
                    <ActivityIndicator size="small" color={c.accent} />
                  ) : (
                    <ReopenBtnText>Reabrir ocorrência</ReopenBtnText>
                  )}
                </ReopenBtn>
              )}
            </OccurrenceCard>
          );
        })
      )}

      <LogoutBtn onPress={handleLogout}>
        <Feather name="log-out" size={18} color={c.danger} />
        <LogoutText>Encerrar sessão</LogoutText>
      </LogoutBtn>
    </Container>
  );
}