import { useContext } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../contexts/auth';

export default function Home() {
  const { logOut } = useContext(AuthContext);
  return (
   <View>
    <TouchableOpacity onPress={logOut}>
      <Text>Sair</Text>
      </TouchableOpacity>
   </View>
  );
}
