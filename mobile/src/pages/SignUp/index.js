import {
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from "react-native";
import {
  Background,
  TopAccent,
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
  SubmitButton,
  SubmitText,
  Divider,
  DividerLine,
  DividerText,
  Link,
  LinkText,
  LinkHighlight,
} from "../SignIn/styles";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { Feather } from "@expo/vector-icons";

export default function SignUp() {
  const navigation = useNavigation();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, loadingAuth } = useContext(AuthContext);

  function handleSignUp() {
    if (nome === "" || email === "" || password === "") {
      alert("Preencha todos os campos");
      return;
    }
    Keyboard.dismiss()
    signUp(email, password, nome);
    navigation.navigate('SignIn')
  }

  return (
    <Background>
      <TopAccent />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 32,
            paddingVertical: 48,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <LogoWrapper>
            <LogoText>Urbano</LogoText>
            <LogoPlus>+</LogoPlus>
          </LogoWrapper>

          <LogoTagline>Soluções Urbanas</LogoTagline>

          <Card>
            <CardTitle>Criar conta </CardTitle>
            <CardSubtitle>Preencha os dados para se cadastrar</CardSubtitle>

            <AreaInput>
              <InputLabel>Nome</InputLabel>
              <InputWrapper>
                <Feather
                  name="user"
                  size={18}
                  color="#FBBC05"
                  style={{ marginRight: 10 }}
                />
                <Input
                  placeholder="Seu nome completo"
                  placeholderTextColor="#B0BDD8"
                  value={nome}
                  onChangeText={(text) => setNome(text)}
                  autoCapitalize="words"
                />
              </InputWrapper>
            </AreaInput>

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
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={true}
                />
              </InputWrapper>
            </AreaInput>

            <SubmitButton
              activeOpacity={0.85}
              onPress={handleSignUp}
              style={{ marginTop: 8 }}
            >
              {loadingAuth ? (
                <ActivityIndicator size={24} color="#FFF" />
              ) : (
                <SubmitText>Cadastrar</SubmitText>
              )}
            </SubmitButton>

            <Divider>
              <DividerLine />
              <DividerText>ou</DividerText>
              <DividerLine />
            </Divider>
          </Card>

          <Link>
            <LinkText>Já tem uma conta?</LinkText>
            <LinkHighlight onPress={() => navigation.navigate("SignIn")}>
              Entrar
            </LinkHighlight>
          </Link>
        </ScrollView>
      </KeyboardAvoidingView>
    </Background>
  );
}
