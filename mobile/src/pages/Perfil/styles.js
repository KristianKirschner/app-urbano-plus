import styled from "styled-components/native";

const c = {
  bg: "#F0F4FF",
  card: "#FFFFFF",
  accent: "#1B4FBB",
  accentLight: "rgba(27,79,187,0.1)",
  text: "#111827",
  textSub: "#6B7280",
  textMuted: "#9CA3AF",
  border: "#E4EAF7",
  danger: "#EF4444",
  dangerLight: "rgba(239,68,68,0.1)",
  success: "#10b981",
  successLight: "rgba(16,185,129,0.1)",
  warning: "#f59e0b",
  warningLight: "rgba(245,158,11,0.1)",
  gray: "#6b7280",
  grayLight: "rgba(107,114,128,0.1)",
};

export { c };

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: { paddingBottom: 32 },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  background-color: ${c.bg};
`;

export const HeaderBg = styled.View`
  background-color: ${c.accent};
  padding: 52px 24px 32px;
`;

export const AvatarWrapper = styled.View`
  width: 72px;
  height: 72px;
  border-radius: 36px;
  background-color: rgba(255, 255, 255, 0.2);
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;

export const UserName = styled.Text`
  font-size: 22px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 2px;
`;

export const UserEmail = styled.Text`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
`;

export const StatsRow = styled.View`
  flex-direction: row;
  margin: -20px 16px 0;
  gap: 10px;
`;

export const StatCard = styled.View`
  flex: 1;
  background-color: ${c.card};
  border-radius: 16px;
  padding: 14px 10px;
  align-items: center;
`;

export const StatNumber = styled.Text`
  font-size: 22px;
  font-weight: 800;
  color: ${({ color }) => color ?? c.accent};
`;

export const StatLabel = styled.Text`
  font-size: 10px;
  font-weight: 600;
  color: ${c.textMuted};
  text-align: center;
  margin-top: 2px;
`;

export const SectionTitle = styled.Text`
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${c.textSub};
  margin: 28px 20px 10px;
`;

export const OccurrenceCard = styled.View`
  background-color: ${c.card};
  border-radius: 16px;
  margin: 0 16px 10px;
  padding: 14px 16px;
`;

export const OccurrenceRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const OccurrenceTitle = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${c.text};
  flex: 1;
  margin-right: 8px;
`;

export const StatusBadge = styled.View`
  padding: 3px 10px;
  border-radius: 20px;
  background-color: ${({ bg }) => bg};
`;

export const StatusText = styled.Text`
  font-size: 11px;
  font-weight: 700;
  color: ${({ color }) => color};
`;

export const OccurrenceDate = styled.Text`
  font-size: 12px;
  color: ${c.textMuted};
  margin-top: 6px;
`;

export const ReopenBtn = styled.TouchableOpacity`
  margin-top: 10px;
  padding: 8px 14px;
  border-radius: 10px;
  background-color: ${c.accentLight};
  align-self: flex-start;
`;

export const ReopenBtnText = styled.Text`
  font-size: 12px;
  font-weight: 700;
  color: ${c.accent};
`;

export const EmptyText = styled.Text`
  text-align: center;
  color: ${c.textMuted};
  font-size: 13px;
  margin: 16px 0;
`;

export const LogoutBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 24px 16px 0;
  padding: 16px;
  border-radius: 16px;
  background-color: ${c.dangerLight};
`;

export const LogoutText = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: ${c.danger};
`;