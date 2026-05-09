import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.55);
  justify-content: flex-end;
`;

export const Sheet = styled.View`
  background-color: #fff;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  max-height: ${height * 0.88}px;
  overflow: hidden;
`;

export const Handle = styled.View`
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background-color: #ddd;
  align-self: center;
  margin-top: 12px;
  margin-bottom: 8px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 20px 16px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

export const TypeBadge = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 6px 12px;
  border-radius: 20px;
  background-color: ${(p) => p.bg};
  margin-right: 12px;
`;

export const TypeLabel = styled.Text`
  font-size: 13px;
  font-weight: 700;
  color: ${(p) => p.color};
  margin-left: 6px;
`;

export const TitleText = styled.Text`
  flex: 1;
  font-size: 17px;
  font-weight: 700;
  color: #1a1a1a;
`;

export const CloseButton = styled.TouchableOpacity`
  padding: 4px;
`;

export const Section = styled.View`
  padding: 16px 20px 0;
`;

export const SectionTitle = styled.Text`
  font-size: 12px;
  font-weight: 700;
  color: #999;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

export const Description = styled.Text`
  font-size: 15px;
  color: #333;
  line-height: 22px;
`;

export const MetaRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 6px;
`;

export const MetaText = styled.Text`
  font-size: 13px;
  color: #777;
  margin-left: 6px;
`;

export const PhotoImage = styled.Image`
  width: ${width * 0.58}px;
  height: 160px;
  border-radius: 12px;
  margin-right: 10px;
`;

export const PhotoListContent = styled.View`
  padding-bottom: 4px;
`;

export const CommentCard = styled.View`
  background-color: #f8f8f8;
  border-radius: 12px;
  padding: 12px 14px;
  margin-bottom: 10px;
`;

export const CommentAuthor = styled.Text`
  font-size: 13px;
  font-weight: 700;
  color: #222;
  margin-bottom: 4px;
`;

export const CommentBody = styled.Text`
  font-size: 14px;
  color: #444;
  line-height: 20px;
`;

export const CommentDate = styled.Text`
  font-size: 11px;
  color: #aaa;
  margin-top: 6px;
  text-align: right;
`;

export const EmptyText = styled.Text`
  font-size: 14px;
  color: #bbb;
  font-style: italic;
`;

export const InputRow = styled.View`
  flex-direction: row;
  align-items: flex-end;
  padding: 12px 16px;
  border-top-width: 1px;
  border-top-color: #f0f0f0;
  background-color: #fff;
`;

export const CommentInput = styled.TextInput`
  flex: 1;
  min-height: 40px;
  max-height: 100px;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 10px 16px;
  font-size: 14px;
  color: #222;
  margin-right: 10px;
`;

export const SendButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(p) => (p.disabled ? "#e0e0e0" : "#1e88e5")};
  align-items: center;
  justify-content: center;
`;

export const LoadingWrapper = styled.View`
  padding: 40px;
  align-items: center;
`;

export const Spacer = styled.View`
  height: 32px;
`;