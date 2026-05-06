import { useContext } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { AuthContext } from "../../contexts/auth";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'

export default function Home() {
  const { logOut } = useContext(AuthContext);
  return (
    <View>
      <TouchableOpacity onPress={logOut}>
        <Text>Sair</Text>
      </TouchableOpacity>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ width: '100%', height: 300}}
        initialRegion={{
          latitude: -23.5505,
          longitude: -46.6333,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      />
    </View>
  );
}
