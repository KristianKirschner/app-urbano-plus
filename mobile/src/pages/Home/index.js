import React, { useState, useEffect } from "react";
import { ActivityIndicator, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api"; // ajuste o caminho se necessário

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
  SectionLink,
  SectionLinkText,
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
  EmptyState,
  EmptyIconCircle,
  EmptyTitle,
  EmptySub,
  EmptyButton,
  EmptyButtonText,
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
  MapLink,
  MapLinkBody,
  MapLinkTitle,
  MapLinkSub,
  MapIconCircle,
} from "./styles";

const STATUS_CONFIG = {
  aberta: { label: "Aberta", bg: "#FEE8E8", color: "#C0392B", dot: "#E24B4A" },
  em_analise: {
    label: "Em análise",
    bg: "#FEF5E4",
    color: "#B7770D",
    dot: "#BA7517",
  },
  resolvida: {
    label: "Resolvida",
    bg: "#E6F9F2",
    color: "#0F6E56",
    dot: "#1D9E75",
  },
};

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
};

const mapStatus = (status) => {
  const map = {
    APPROVED: "aberta",
    PENDING: "em_analise",
    EXPIRED: "resolvida",
  };
  return map[status] ?? "aberta";
};

const formatTempo = (createdAt) => {
  const diff = Math.floor((Date.now() - new Date(createdAt)) / 60000);
  if (diff < 60) return `${diff} min`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h`;
  return `${Math.floor(diff / 1440)}d`;
};

export default function HomeScreen({ navigation }) {
  const [loadingBus, setLoadingBus] = useState(true);
  const [loadingOc, setLoadingOc] = useState(true);

  const [linhasFavoritas, setLinhasFavoritas] = useState([]);
  const [ocorrencias, setOcorrencias] = useState([]);

  const usuario = {
    nome: "Carlos Silva",
  };

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

      setLoadingBus(false);
    }, 800);
  }, []);

useEffect(() => {
  const fetchOcorrencias = async () => {
    try {
      const { data } = await api.get('/occurrences/latest');

      setOcorrencias(data.map(o => ({
        id: o.id,
        titulo: o.title,
        status: mapStatus(o.status),
        local: o.description?.slice(0, 30) ?? '',
        tempo: formatTempo(o.createdAt),
        confirmacoes: 0,
      })));
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingOc(false);
    }
  };

  fetchOcorrencias();
}, []);

  const renderBusRow = (item, index, arr) => {
    const isLast = index === arr.length - 1;
    const RowComponent = isLast ? BusRowLast : BusRow;

    return (
      <RowComponent
        key={item.id}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("Ocorrencias")}
      >
        <BusNumBadge>
          <BusNumText>{item.numero}</BusNumText>
        </BusNumBadge>

        <BusInfo>
          <BusDest>{item.destino}</BusDest>

          <BusPonto>
            <Feather name="map-pin" size={10} color="#8A9BC4" /> {item.ponto}
          </BusPonto>
        </BusInfo>

        <BusTime>
          <BusMin warn={item.minutos > 15}>{item.minutos} min</BusMin>

          <BusHora>{item.horario}</BusHora>
        </BusTime>
      </RowComponent>
    );
  };

  const renderOcRow = (item, index, arr) => {
    const isLast = index === arr.length - 1;
    const RowComponent = isLast ? OcRowLast : OcRow;

    const cfg = STATUS_CONFIG[item.status];

    return (
      <RowComponent
        key={item.id}
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate("Ocorrencias", {
            ocorrenciaId: item.id,
          })
        }
      >
        <OcDot color={cfg.dot} />

        <OcBody>
          <OcTitle>{item.titulo}</OcTitle>

          <OcMeta>
            <Badge bg={cfg.bg}>
              <BadgeText color={cfg.color}>{cfg.label}</BadgeText>
            </Badge>

            <OcTime>
              {item.local} · {item.tempo}
            </OcTime>
          </OcMeta>
        </OcBody>

        <ConfirmBadge>
          <Feather name="thumbs-up" size={10} color="#7A8FC4" />

          <ConfirmText>{item.confirmacoes}</ConfirmText>
        </ConfirmBadge>
      </RowComponent>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1B4FBB" }}>
      <StatusBar barStyle="light-content" backgroundColor="#1B4FBB" />

      <Background>
        <TopAccent />

        <Header>
          <GreetingText>{getGreeting()}</GreetingText>

          <UserName>{usuario.nome}</UserName>

          <LocationRow>
            <Feather name="map-pin" size={11} color="#90AADF" />

            <LocationText>Ourinhos, SP</LocationText>
          </LocationRow>
        </Header>

        <ScrollContent
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 14,
          }}
        >
          <ContentPad>
            <Card>
              <CardHeader>
                <SectionLabel>Ônibus — favoritas</SectionLabel>

                <SectionLink
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate("Onibus")}
                >
                  <SectionLinkText>
                    {linhasFavoritas.length === 0
                      ? "explorar linhas"
                      : "ver todas"}
                  </SectionLinkText>
                </SectionLink>
              </CardHeader>

              {loadingBus ? (
                <ActivityIndicator
                  size="small"
                  color="#1B4FBB"
                  style={{ paddingVertical: 16 }}
                />
              ) : linhasFavoritas.length === 0 ? (
                <EmptyState>
                  <EmptyIconCircle>
                    <Feather name="navigation" size={20} color="#1B4FBB" />
                  </EmptyIconCircle>

                  <EmptyTitle>Nenhuma linha favorita ainda</EmptyTitle>

                  <EmptySub>
                    Adicione suas linhas mais usadas para ver os horários direto
                    aqui.
                  </EmptySub>

                  <EmptyButton
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("Onibus")}
                  >
                    <EmptyButtonText>
                      + Adicionar linha favorita
                    </EmptyButtonText>
                  </EmptyButton>
                </EmptyState>
              ) : (
                linhasFavoritas.map((item, index, arr) =>
                  renderBusRow(item, index, arr),
                )
              )}
            </Card>

            <Card>
              <CardHeader>
                <SectionLabel>Últimas ocorrências</SectionLabel>

                <SectionLink
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate("Ocorrencias")}
                >
                  <SectionLinkText>ver todas</SectionLinkText>
                </SectionLink>
              </CardHeader>

              {loadingOc ? (
                <ActivityIndicator
                  size="small"
                  color="#1B4FBB"
                  style={{ paddingVertical: 16 }}
                />
              ) : (
                ocorrencias.map((item, index, arr) =>
                  renderOcRow(item, index, arr),
                )
              )}
            </Card>

            <MapLink
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Mapa")}
            >
              <MapIconCircle>
                <Feather name="map" size={18} color="#1B4FBB" />
              </MapIconCircle>

              <MapLinkBody>
                <MapLinkTitle>Mapa da cidade</MapLinkTitle>

                <MapLinkSub>Ver ocorrências e pontos no mapa</MapLinkSub>
              </MapLinkBody>

              <Feather name="chevron-right" size={18} color="#B0BDD8" />
            </MapLink>
          </ContentPad>
        </ScrollContent>
      </Background>
    </SafeAreaView>
  );
}
