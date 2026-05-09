import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function CriarOcorrenciaModal({
  visible,
  coordinate,
  onClose,
  onCreate,
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [radius, setRadius] = useState(50);
  const [category, setCategory] = useState('TRAFFIC');

  function increase() {
    setRadius((r) => Math.min(r + 25, 500));
  }

  function decrease() {
    setRadius((r) => Math.max(r - 25, 10));
  }

  async function submit() {
    await onCreate({
      title,
      description,
      category,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      radius,
    });

    setTitle('');
    setDescription('');
    setRadius(50);
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1, padding: 16 }}>

        <Text style={{ fontSize: 18 }}>Criar Ocorrência</Text>

        <TextInput
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
        />

        <Text>Raio: {radius}m</Text>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity onPress={decrease}>
            <Text>-</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={increase}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={submit}>
          <Text>Criar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onClose}>
          <Text>Cancelar</Text>
        </TouchableOpacity>

      </View>
    </Modal>
  );
}