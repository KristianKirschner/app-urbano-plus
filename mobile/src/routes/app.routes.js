import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Home from "../pages/Home";
import Ocorrencias from "../pages/Ocorrencias";
import Onibus from "../pages/Onibus";
import Perfil from "../pages/Perfil";

const Tab = createBottomTabNavigator();

export default function AppRoutes() {
    const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1B4FBB",
        tabBarInactiveTintColor: "#9AA9CC",
        tabBarStyle: {
          tabBarStyle: {
            height: 60 + insets.bottom,
            paddingTop: 6,
            paddingBottom: insets.bottom || 10,
            backgroundColor: "#FFF",
            borderTopWidth: 1,
            borderTopColor: "#E4EAF7",
            elevation: 8,
          },
        },
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Feather name="home" size={focused ? 22 : 20} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Ocorrencias"
        component={Ocorrencias}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Feather
              name="alert-circle"
              size={focused ? 22 : 20}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Onibus"
        component={Onibus}
        options={{
          title: "Ônibus",

          tabBarIcon: ({ color, focused }) => (
            <Feather name="navigation" size={focused ? 22 : 20} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Feather name="user" size={focused ? 22 : 20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
