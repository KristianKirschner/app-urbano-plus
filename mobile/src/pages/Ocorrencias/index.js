import React, { useState, useEffect } from 'react';
import { Alert, View, ActivityIndicator } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import styled from 'styled-components/native';

import { Car, Construction, Trash2, Shield, Leaf, AlertTriangle } from 'lucide-react-native';

import api from '../../services/api';
import OcorrenciaModal from '../../components/OcorrenciaModal';
import CriarOcorrenciaModal from '../../components/CriarOcorrenciaModal';
import { Feather } from '@expo/vector-icons';

const Container = styled.View`flex: 1;`;
const LoadingContainer = styled.View`flex: 1; justify-content: center; align-items: center;`;
const RefreshBtn = styled.TouchableOpacity`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const INITIAL_REGION = {
  latitude: -22.9797, longitude: -49.8697,
  latitudeDelta: 0.05, longitudeDelta: 0.05,
};

const CATEGORY_MAP = {
  TRAFFIC:        { Icon: Car,          color: '#f59e0b' },
  INFRASTRUCTURE: { Icon: Construction, color: '#ef4444' },
  SANITATION:     { Icon: Trash2,       color: '#10b981' },
  SECURITY:       { Icon: Shield,       color: '#3b82f6' },
  ENVIRONMENT:    { Icon: Leaf,         color: '#22c55e' },
};
const DEFAULT_CATEGORY = { Icon: AlertTriangle, color: '#6b7280' };
const getIconByCategory = (cat) => CATEGORY_MAP[cat] ?? DEFAULT_CATEGORY;

const CUSTOM_MAP_STYLE = [
  { elementType: 'geometry',           stylers: [{ color: '#f0f0ed' }] },
  { elementType: 'labels.text.fill',   stylers: [{ color: '#5a6473' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#f0f0ed' }] },
  { featureType: 'administrative',     elementType: 'geometry.stroke', stylers: [{ color: '#c9cdd4' }] },
  { featureType: 'poi',                elementType: 'geometry',        stylers: [{ color: '#e8e8e3' }] },
  { featureType: 'poi',                elementType: 'labels',          stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.park',           elementType: 'geometry',        stylers: [{ color: '#d8e8d0' }] },
  { featureType: 'road',               elementType: 'geometry',        stylers: [{ color: '#ffffff' }] },
  { featureType: 'road',               elementType: 'geometry.stroke', stylers: [{ color: '#d8d8d2' }] },
  { featureType: 'road.highway',       elementType: 'geometry',        stylers: [{ color: '#e8e0d0' }] },
  { featureType: 'water',              elementType: 'geometry',        stylers: [{ color: '#c0d8e8' }] },
];

export default function Ocorrencias({ route, navigation }) {
  const [ocorrencias, setOcorrencias]     = useState([]);
  const [loading, setLoading]             = useState(true);
  const [selected, setSelected]           = useState(null);
  const [newCoordinate, setNewCoordinate] = useState(null);
  const [previewRadius, setPreviewRadius] = useState(null);

  useEffect(() => {
    if (!route.params?.ocorrenciaId || ocorrencias.length === 0) return;
    const ocorrencia = ocorrencias.find((o) => o.id === route.params.ocorrenciaId);
    if (ocorrencia) {
      setSelected(ocorrencia);
      navigation.setParams({ ocorrenciaId: undefined });
    }
  }, [route.params?.ocorrenciaId, ocorrencias]);

  useEffect(() => { loadOccurrences(); }, []);

  async function loadOccurrences() {
    try {
      const response = await api.get('/occurrences');
      setOcorrencias(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as ocorrências');
    } finally {
      setLoading(false);
    }
  }

  function handleLongPress(event) {
    setNewCoordinate(event.nativeEvent.coordinate);
  }

  function handleOcorrenciaCriada() {
    loadOccurrences();
  }

  function handleClose() {
    setNewCoordinate(null);
    setPreviewRadius(null);
  }

  if (loading) {
    return <LoadingContainer><ActivityIndicator size="large" /></LoadingContainer>;
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
        {/* ── Marker + Circle de preview (nova ocorrência) ─────────────── */}
        {newCoordinate && (
          <>
            <Marker coordinate={newCoordinate} anchor={{ x: 0.65, y: 0.65 }}>
              <View style={{ borderRadius: 999, padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={28} color={DEFAULT_CATEGORY.color} />
              </View>
            </Marker>

            {previewRadius && (
              <Circle
                center={newCoordinate}
                radius={previewRadius}
                strokeWidth={2}
                strokeColor={`${DEFAULT_CATEGORY.color}99`}
                fillColor={`${DEFAULT_CATEGORY.color}1F`}
              />
            )}
          </>
        )}

        {/* ── Ocorrências existentes ────────────────────────────────────── */}
        {ocorrencias.map((item) => {
          const { Icon, color } = getIconByCategory(item.category);
          const coordinate = { latitude: item.latitude, longitude: item.longitude };
          return (
            <React.Fragment key={item.id}>
              <Circle
                center={coordinate}
                radius={item.radius}
                strokeWidth={2}
                strokeColor={`${color}99`}
                fillColor={`${color}1F`}
              />
              <Marker coordinate={coordinate} onPress={() => setSelected(item)} anchor={{ x: 0.65, y: 0.65 }}>
                <View style={{ borderRadius: 999, padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={28} color={color} />
                </View>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapView>
<RefreshBtn onPress={loadOccurrences}>
  <Feather name="refresh-cw" size={18} color="#2563EB" />
</RefreshBtn>

      <OcorrenciaModal
        item={selected}
        visible={!!selected}
        onClose={() => setSelected(null)}
      />

      <CriarOcorrenciaModal
        visible={!!newCoordinate}
        coordinate={newCoordinate}
        onClose={handleClose}
        onCreate={handleOcorrenciaCriada}
        onRadiusChange={setPreviewRadius}
      />
    </Container>
  );
}