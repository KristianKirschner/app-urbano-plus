import { ActivityIndicator, View } from "react-native";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";
import AdminRoutes from "./admin.routes";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export default function Routes() {
  const { signed, loading, user } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="small" color="#FBBC05" />
      </View>
    );
  }

  if (!signed) return <AuthRoutes />;
  if (user?.role === "ADMIN") return <AdminRoutes />;
  return <AppRoutes />;
}