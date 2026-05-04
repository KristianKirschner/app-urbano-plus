import { ActivityIndicator, View } from "react-native";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export default function Routes(){

    const {signed, loading} = useContext(AuthContext)

    if (loading) {
        return(
            <View
                style={{alignItems: 'center', justifyContent: 'center', flex: 1}}
            >
                <ActivityIndicator size="small" color='#FBBC05' />
            </View>
        )
    }

    return(
        signed ? <AppRoutes/> : <AuthRoutes/> 
    )
}