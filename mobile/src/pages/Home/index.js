import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import api from "../../services/api";
import { AuthContext } from "../../contexts/auth";

import {
  Background,
  TopAccent,
  Header,
  GreetingText,
  UserName,
  LocationRow,
  LocationText,
  ScrollContent,
  ContentPad,
  Card,
  CardHeader,
  SectionLabel,
  BusRow,
  BusRowLast,
  BusNumBadge,
  BusNumText,
  BusInfo,
  BusDest,
  BusPonto,
  BusTime,
  BusMin,
  BusHora,
  OcRow,
  OcRowLast,
  OcDot,
  OcBody,
  OcTitle,
  OcMeta,
  OcTime,
  Badge,
  BadgeText,
  ConfirmBadge,
  ConfirmText,
} from "./styles";

/**
 * UI DAS CATEGORIAS (COR + LABEL EM PT-BR)
 */
const CATEGORY_MAP = {
  TRAFFIC: {
    label: "Trânsito",
    color: "#f59e0b",
  },
  INFRASTRUCTURE: {
    label: "Infraestrutura",
    color: "#ef4444",
  },
  SANITATION: {
    label: "Saneamento",
    color: "#10b981",
  },
  SECURITY: {
    label: "Segurança",
    color: "#3b82f6",
  },
  ENVIRONMENT: {
    label: "Meio ambiente",
    color: "#22c55e",
  },
  OTHER: {
    label: "Outros",
    color: "#6B7280",
  },
};

const saudacao = () => {
  const hora = new Date().getHours();
  if (hora < 12) return "Bom dia";
  if (hora < 18) return "Boa tarde";
  return "Boa noite";
};

const formatarTempo = (createdAt) => {
  const minutos = Math.floor((Date.now() - new Date(createdAt)) / 60000);
  if (minutos < 60) return `${minutos} min`;
  if (minutos < 1440) return `${Math.floor(minutos / 60)}h`;
  return `${Math.floor(minutos / 1440)}d`;
};

export default function HomeScreen({ navigation }) {
  const [carregandoOnibus, setCarregandoOnibus] = useState(true);
  const [carregandoOcorrencias, setCarregandoOcorrencias] = useState(true);
  const [linhasFavoritas, setLinhasFavoritas] = useState([]);
  const [ocorrencias, setOcorrencias] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      setLinhasFavoritas([
        {
          id: 1,
          numero: "301",
          destino: "Centro → Cohab",
          ponto: "Praça da Matriz",
          minutos: 8,
          horario: "09:49",
        },
        {
          id: 2,
          numero: "412",
          destino: "Terminal → Jd. América",
          ponto: "R. XV de Novembro",
          minutos: 22,
          horario: "10:03",
        },
      ]);
      setCarregandoOnibus(false);
    }, 800);
  }, []);

  useEffect(() => {
    const buscarOcorrencias = async () => {
      try {
        const { data } = await api.get("/occurrences/latest");

        const formatado = await Promise.all(
          data.map(async (o) => {
            try {
              const { data: comentarios } = await api.get(
                `/occurrences/${o.id}/comments`,
              );

              return {
                id: o.id,
                titulo: o.title,
                categoria: o.category,
                local: o.description?.slice(0, 30) ?? "",
                tempo: formatarTempo(o.createdAt),
                confirmacoes: comentarios.length,
              };
            } catch {
              return {
                id: o.id,
                titulo: o.title,
                categoria: o.category,
                local: o.description?.slice(0, 30) ?? "",
                tempo: formatarTempo(o.createdAt),
                confirmacoes: 0,
              };
            }
          }),
        );

        setOcorrencias(formatado);
      } catch (erro) {
        console.error("Erro ao buscar ocorrências:", erro);
      } finally {
        setCarregandoOcorrencias(false);
      }
    };

    buscarOcorrencias();
  }, []);

  const renderizarOcorrencia = (item, index, lista) => {
    const ultimo = index === lista.length - 1;
    const Linha = ultimo ? OcRowLast : OcRow;

    const ui = CATEGORY_MAP[item.categoria] ?? CATEGORY_MAP.OTHER;

    return (
      <Linha
        key={item.id}
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate("Ocorrencias", { ocorrenciaId: item.id })
        }
      >
        <OcDot color={ui.color} />

        <OcBody>
          <OcTitle>{item.titulo}</OcTitle>

          <OcMeta>
            <Badge>
              <BadgeText>{ui.label}</BadgeText>
            </Badge>

            <OcTime>{item.local}</OcTime>
          </OcMeta>
        </OcBody>

        <ConfirmBadge>
          <Feather name="message-circle" size={10} color="#7A8FC4" />
          <ConfirmText>{item.confirmacoes}</ConfirmText>
        </ConfirmBadge>
      </Linha>
    );
  };

  const renderizarOnibus = (item, index, lista) => {
    const ultimo = index === lista.length - 1;
    const Linha = ultimo ? BusRowLast : BusRow;

    return (
      <Linha key={item.id} onPress={() => navigation.navigate("Ocorrencias")}>
        <BusNumBadge>
          <BusNumText>{item.numero}</BusNumText>
        </BusNumBadge>

        <BusInfo>
          <BusDest>{item.destino}</BusDest>
          <BusPonto>{item.ponto}</BusPonto>
        </BusInfo>

        <BusTime>
          <BusMin>{item.minutos} min</BusMin>
          <BusHora>{item.horario}</BusHora>
        </BusTime>
      </Linha>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1B4FBB" }}>
      <StatusBar barStyle="light-content" />

      <Background>
        <TopAccent />

        <Header>
          <GreetingText>{saudacao()}</GreetingText>
          <UserName>{user?.name}</UserName>

          <LocationRow>
            <Feather name="map-pin" size={11} color="#90AADF" />
            <LocationText>Ourinhos, SP</LocationText>
          </LocationRow>
        </Header>

        <ScrollContent>
          <ContentPad>
            <Card>
              <CardHeader>
                <SectionLabel>Ônibus</SectionLabel>
              </CardHeader>

              {carregandoOnibus ? (
                <ActivityIndicator />
              ) : (
                linhasFavoritas.map((item, i, arr) =>
                  renderizarOnibus(item, i, arr),
                )
              )}
            </Card>

            <Card>
              <CardHeader>
                <SectionLabel>Ultimas Ocorrências</SectionLabel>
              </CardHeader>

              {carregandoOcorrencias ? (
                <ActivityIndicator />
              ) : (
                ocorrencias.map((item, i, arr) =>
                  renderizarOcorrencia(item, i, arr),
                )
              )}
            </Card>
          </ContentPad>
        </ScrollContent>
      </Background>
    </SafeAreaView>
  );
}
