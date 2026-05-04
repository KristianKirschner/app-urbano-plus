import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const AuthStack = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
      }}
    >
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerTitle: 'Criar conta',
          headerTintColor: '#1B4FBB',
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#EEF2FB',
          },
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 16,
            color: '#0D2D7A',
          },
        }}
      />
    </AuthStack.Navigator>
  );
}