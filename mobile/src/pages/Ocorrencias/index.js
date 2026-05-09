import React, { useState, useEffect } from 'react';
import { Alert, View, ActivityIndicator } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import styled from 'styled-components/native';

import {
  Car,
  Construction,
  Trash2,
  Shield,
  Leaf,
  AlertTriangle,
} from 'lucide-react-native';

import api from '../../services/api';
import OcorrenciaModal from '../../components/OcorrenciaModal';
import CriarOcorrenciaModal from '../../components/CriarOcorrenciaModal';

const Container = styled.View`
  flex: 1;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const INITIAL_REGION = {
  latitude: -22.9797,
  longitude: -49.8697,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const CATEGORY_MAP = {
  TRAFFIC:        { Icon: Car,            color: '#f59e0b' },
  INFRASTRUCTURE: { Icon: Construction,   color: '#ef4444' },
  SANITATION:     { Icon: Trash2,         color: '#10b981' },
  SECURITY:       { Icon: Shield,         color: '#3b82f6' },
  ENVIRONMENT:    { Icon: Leaf,           color: '#22c55e' },
};

const DEFAULT_CATEGORY = { Icon: AlertTriangle, color: '#6b7280' };

const getIconByCategory = (category) =>
  CATEGORY_MAP[category] ?? DEFAULT_CATEGORY;

// Estilo claro dessaturado — neutro, sem competir com os markers
const CUSTOM_MAP_STYLE = [
  { elementType: 'geometry',           stylers: [{ color: '#f0f0ed' }] },
  { elementType: 'labels.text.fill',   stylers: [{ color: '#5a6473' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#f0f0ed' }] },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#c9cdd4' }],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9aa3ae' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#e8e8e3' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#d8e8d0' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6a9e5f' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#d8d8d2' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#7a8390' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#e8e0d0' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#d0c8b8' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#5a6473' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#e4e4df' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#8a93a0' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#c0d8e8' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#5a8aaa' }],
  },
];

export default function Ocorrencias({ route, navigation }) {
  const [ocorrencias, setOcorrencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  // Coordenada tocada no mapa para criar nova ocorrência
  const [newCoordinate, setNewCoordinate] = useState(null);

  // Abre modal direto quando vier ocorrenciaId por params
  useEffect(() => {
    if (!route.params?.ocorrenciaId || ocorrencias.length === 0) return;

    const ocorrencia = ocorrencias.find(
      (o) => o.id === route.params.ocorrenciaId
    );

    if (ocorrencia) {
      setSelected(ocorrencia);
      navigation.setParams({ ocorrenciaId: undefined });
    }
  }, [route.params?.ocorrenciaId, ocorrencias]);

  useEffect(() => {
    loadOccurrences();
  }, []);

  async function loadOccurrences() {
    try {
      const response = await api.get('/occurrences');
      setOcorrencias(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar as ocorrências');
    } finally {
      setLoading(false);
    }
  }

  // Toque longo no mapa → abre formulário de criação naquele ponto
  function handleLongPress(event) {
    const { coordinate } = event.nativeEvent;
    setNewCoordinate(coordinate);
  }

  // Após criação bem-sucedida, recarrega a lista
  function handleOcorrenciaCriada() {
    loadOccurrences();
  }

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <MapView
        style={{ flex: 1 }}
        initialRegion={INITIAL_REGION}
        customMapStyle={CUSTOM_MAP_STYLE}
        showsCompass={false}
        rotateEnabled={false}
        showsMyLocationButton={false}
        toolbarEnabled={false}
        onLongPress={handleLongPress}
      >
        {/* Marker temporário do ponto selecionado para criar */}
        {newCoordinate && (
          <Marker coordinate={newCoordinate} anchor={{ x: 0.5, y: 0.5 }}>
            <View
              style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: '#2563eb',
                borderWidth: 3,
                borderColor: '#fff',
                shadowColor: '#000',
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 4,
              }}
            />
          </Marker>
        )}

        {ocorrencias.map((item) => {
          const { Icon, color } = getIconByCategory(item.category);
          const coordinate = {
            latitude: item.latitude,
            longitude: item.longitude,
          };

          return (
            <React.Fragment key={item.id}>
              <Circle
                center={coordinate}
                radius={item.radius}
                strokeWidth={2}
                strokeColor="rgba(255,0,0,0.25)"
                fillColor="rgba(255,0,0,0.12)"
              />

              <Marker
                coordinate={coordinate}
                onPress={() => setSelected(item)}
                anchor={{ x: 0.65, y: 0.65 }}
              >
                <View
                  style={{
                    borderRadius: 999,
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={28} color={color} />
                </View>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapView>

      {/* Modal de visualização de ocorrência existente */}
      <OcorrenciaModal
        item={selected}
        visible={!!selected}
        onClose={() => setSelected(null)}
      />

      {/* Modal de criação de nova ocorrência */}
      <CriarOcorrenciaModal
        visible={!!newCoordinate}
        coordinate={newCoordinate}
        onClose={() => setNewCoordinate(null)}
        onSuccess={handleOcorrenciaCriada}
      />
    </Container>
  );
}