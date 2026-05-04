import styled from 'styled-components/native';

export const Background = styled.View`
  flex: 1;
  background-color: #EEF2FB;
`;

export const TopAccent = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background-color: #FBBC05;
`;

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
`;

export const LogoWrapper = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 6px;
`;

export const LogoText = styled.Text`
  font-size: 44px;
  font-weight: 800;
  color: #1B4FBB;
  letter-spacing: -1px;
`;

export const LogoPlus = styled.Text`
  font-size: 44px;
  font-weight: 800;
  color: #FBBC05;
`;

export const LogoTagline = styled.Text`
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 3px;
  color: #7A8FC4;
  text-transform: uppercase;
  margin-bottom: 40px;
`;

export const Card = styled.View`
  width: 100%;
  background-color: #FFFFFF;
  border-radius: 20px;
  padding: 28px 24px;
  shadow-color: #1B4FBB;
  shadow-offset: 0px 8px;
  shadow-opacity: 0.08;
  shadow-radius: 24px;
  elevation: 6;
`;

export const CardTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #0D2D7A;
  margin-bottom: 4px;
`;

export const CardSubtitle = styled.Text`
  font-size: 13px;
  color: #8A9BC4;
  margin-bottom: 24px;
`;

export const AreaInput = styled.View`
  width: 100%;
  margin-bottom: 14px;
`;

export const InputLabel = styled.Text`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #7A8FC4;
  margin-bottom: 7px;
`;

export const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #F4F6FD;
  border-radius: 12px;
  border-width: 1.5px;
  border-color: #DDE4F5;
  padding: 0 14px;
  height: 52px;
`;

export const InputIcon = styled.Text`
  font-size: 15px;
  margin-right: 10px;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: 15px;
  color: #0D2D7A;
  height: 52px;
`;

export const ForgotText = styled.Text`
  font-size: 12px;
  color: #1B4FBB;
  align-self: flex-end;
  margin-top: 2px;
  margin-bottom: 24px;
  font-weight: 600;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  height: 52px;
  border-radius: 12px;
  background-color: #1B4FBB;
  align-items: center;
  justify-content: center;
  shadow-color: #1B4FBB;
  shadow-offset: 0px 6px;
  shadow-opacity: 0.3;
  shadow-radius: 14px;
  elevation: 8;
`;

export const SubmitText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: 0.5px;
`;

export const Divider = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin: 22px 0 0 0;
`;

export const DividerLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: #E4EAF7;
`;

export const DividerText = styled.Text`
  color: #B0BDD8;
  font-size: 12px;
  margin: 0 12px;
  font-weight: 500;
`;

export const Link = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const LinkText = styled.Text`
  font-size: 13px;
  color: #8A9BC4;
`;

export const LinkHighlight = styled.Text`
  font-size: 13px;
  color: #FBBC05;
  font-weight: 800;
  margin-left: 5px;
`;