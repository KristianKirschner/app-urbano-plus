import React from 'react';
import { Alert, View } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Container = styled.View`
  flex: 1;
`;

const INITIAL_REGION = {
  latitude: -22.9797,
  longitude: -49.8697,
  latitudeDelta: 0.09,
  longitudeDelta: 0.09,
};

const ocorrencias = [
  {
    id: 1,
    tipo: 'roubo',
    titulo: 'Roubo em comércio',
    descricao: 'Centro da cidade',
    latitude: -22.9797,
    longitude: -49.8697,
    raio: 700,
  },
  {
    id: 2,
    tipo: 'acidente',
    titulo: 'Acidente de trânsito',
    descricao: 'Av. principal',
    latitude: -22.9862,
    longitude: -49.8751,
    raio: 600,
  },
  {
    id: 3,
    tipo: 'barulho',
    titulo: 'Barulho noturno',
    descricao: 'Bairro residencial',
    latitude: -22.9725,
    longitude: -49.8618,
    raio: 500,
  },
  {
    id: 4,
    tipo: 'incendio',
    titulo: 'Incêndio controlado',
    descricao: 'Terreno baldio',
    latitude: -22.9688,
    longitude: -49.8820,
    raio: 800,
  },
];

const getIconByTipo = (tipo) => {
  switch (tipo) {
    case 'roubo':
      return { name: 'alert', color: '#e53935' };
    case 'acidente':
      return { name: 'alert', color: '#fb8c00' };
    case 'barulho':
      return { name: 'alert', color: '#1e88e5' };
    case 'incendio':
      return { name: 'alert', color: '#d32f2f' };
    default:
      return { name: 'alert', color: '#333' };
  }
};

export default function Ocorrencias() {
  const handlePress = (item) => {
    Alert.alert(item.titulo, item.descricao);
  };

  return (
    <Container>
      <MapView style={{ flex: 1 }} initialRegion={INITIAL_REGION}>
        {ocorrencias.map((item) => {
          const icon = getIconByTipo(item.tipo);

          return (
            <React.Fragment key={item.id}>

              {/* RAIO */}
              <Circle
                center={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                radius={item.raio}
                strokeWidth={2}
                strokeColor="rgba(255,0,0,0.25)"
                fillColor="rgba(255,0,0,0.12)"
              />

              {/* MARKER COM ÍCONE REAL */}
              <Marker
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                onPress={() => handlePress(item)}
                anchor={{ x: 0.5, y: 0.5 }}
              >
                <View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 999,
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#ccc',
                    elevation: 4,
                  }}
                >
                  <MaterialCommunityIcons
                    name={icon.name}
                    size={22}
                    color={icon.color}
                  />
                </View>
              </Marker>

            </React.Fragment>
          );
        })}
      </MapView>
    </Container>
  );
}