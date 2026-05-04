import { ActivityIndicator, Platform } from "react-native";
import {
  Background,
  TopAccent,
  Container,
  LogoWrapper,
  LogoText,
  LogoPlus,
  LogoTagline,
  Card,
  CardTitle,
  CardSubtitle,
  AreaInput,
  InputLabel,
  InputWrapper,
  InputIcon,
  Input,
  ForgotText,
  SubmitButton,
  SubmitText,
  Divider,
  DividerLine,
  DividerText,
  Link,
  LinkText,
  LinkHighlight,
} from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { Feather } from "@expo/vector-icons";

export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, loadingAuth } = useContext(AuthContext);

  function handleLogin() {
    signIn(email, password);
  }

  return (
    <Background>
      <TopAccent />
      <Container behavior={Platform.OS === "ios" ? "padding" : ""} enabled>
        <LogoWrapper>
          <LogoText>Urbano</LogoText>
          <LogoPlus>+</LogoPlus>
        </LogoWrapper>

        <LogoTagline>Soluções Urbanas</LogoTagline>

        <Card>
          <CardTitle>Bem-vindo! </CardTitle>
          <CardSubtitle>Faça login para continuar</CardSubtitle>

          <AreaInput>
            <InputLabel>E-mail</InputLabel>
            <InputWrapper>
              <Feather
                name="mail"
                size={18}
                color="#FBBC05"
                style={{ marginRight: 10 }}
              />
              <Input
                placeholder="seu@email.com"
                placeholderTextColor="#B0BDD8"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </InputWrapper>
          </AreaInput>

          <AreaInput>
            <InputLabel>Senha</InputLabel>
            <InputWrapper>
              <Feather
                name="lock"
                size={18}
                color="#FBBC05"
                style={{ marginRight: 10 }}
              />
              <Input
                placeholder="••••••••"
                placeholderTextColor="#B0BDD8"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </InputWrapper>
          </AreaInput>

          <ForgotText>Esqueceu a senha?</ForgotText>

          <SubmitButton activeOpacity={0.85} onPress={handleLogin}>
            {loadingAuth ? (
              <ActivityIndicator size={24} color="#FFF" />
            ) : (
              <SubmitText>Entrar</SubmitText>
            )}
          </SubmitButton>

          <Divider>
            <DividerLine />
            <DividerText>ou</DividerText>
            <DividerLine />
          </Divider>
        </Card>

        <Link>
          <LinkText>Ainda não tem conta?</LinkText>
          <LinkHighlight onPress={() => navigation.navigate("SignUp")}>
            Criar conta
          </LinkHighlight>
        </Link>
      </Container>
    </Background>
  );
}
