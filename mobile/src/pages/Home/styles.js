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
  z-index: 10;
`;

export const Header = styled.View`
  background-color: #1B4FBB;
  padding: 18px 24px 24px;
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
`;

export const GreetingText = styled.Text`
  font-size: 13px;
  color: #90AADF;
  font-weight: 500;
`;

export const UserName = styled.Text`
  font-size: 22px;
  font-weight: 800;
  color: #FFFFFF;
  letter-spacing: -0.5px;
  margin-top: 2px;
`;

export const LocationRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
  gap: 4px;
`;

export const LocationText = styled.Text`
  font-size: 12px;
  color: #90AADF;
  font-weight: 500;
`;

export const ScrollContent = styled.ScrollView`
  flex: 1;
`;

export const ContentPad = styled.View`
  padding: 16px;
  gap: 12px;
`;

export const Card = styled.View`
  width: 100%;
  background-color: #FFFFFF;
  border-radius: 20px;
  padding: 20px;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

export const SectionLabel = styled.Text`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #7A8FC4;
`;

export const SectionLink = styled.TouchableOpacity``;

export const SectionLinkText = styled.Text`
  font-size: 12px;
  color: #FBBC05;
  font-weight: 700;
`;

export const BusRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: #EEF2FB;
  gap: 12px;
`;

export const BusRowLast = styled(BusRow)`
  border-bottom-width: 0;
  padding-bottom: 0;
`;

export const BusNumBadge = styled.View`
  background-color: #1B4FBB;
  border-radius: 8px;
  padding: 5px 10px;
  min-width: 42px;
  align-items: center;
`;

export const BusNumText = styled.Text`
  font-size: 13px;
  font-weight: 700;
  color: #FFFFFF;
`;

export const BusInfo = styled.View`
  flex: 1;
`;

export const BusDest = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: #0D2D7A;
`;

export const BusPonto = styled.Text`
  font-size: 11px;
  color: #8A9BC4;
  margin-top: 2px;
`;

export const BusTime = styled.View`
  align-items: flex-end;
`;

export const BusMin = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${(props) => (props.warn ? '#E6A817' : '#1B4FBB')};
`;

export const BusHora = styled.Text`
  font-size: 11px;
  color: #8A9BC4;
  margin-top: 1px;
`;

export const EmptyState = styled.View`
  align-items: center;
  padding: 12px 8px 4px;
  gap: 8px;
`;

export const EmptyIconCircle = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: #EEF2FB;
  align-items: center;
  justify-content: center;
`;

export const EmptyTitle = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: #0D2D7A;
  text-align: center;
`;

export const EmptySub = styled.Text`
  font-size: 12px;
  color: #8A9BC4;
  text-align: center;
  line-height: 18px;
`;

export const EmptyButton = styled.TouchableOpacity`
  margin-top: 6px;
  padding: 9px 22px;
  border-radius: 20px;
  border-width: 1.5px;
  border-color: #1B4FBB;
`;

export const EmptyButtonText = styled.Text`
  font-size: 13px;
  font-weight: 700;
  color: #1B4FBB;
`;

export const OcRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: #EEF2FB;
  gap: 10px;
`;

export const OcRowLast = styled(OcRow)`
  border-bottom-width: 0;
  padding-bottom: 0;
`;

export const OcDot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${(props) => props.color};
  margin-top: 4px;
  flex-shrink: 0;
`;

export const OcBody = styled.View`
  flex: 1;
`;

export const OcTitle = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: #0D2D7A;
`;

export const OcMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 3px;
  gap: 6px;
`;

export const OcTime = styled.Text`
  font-size: 11px;
  color: #8A9BC4;
`;

export const Badge = styled.View`
  padding: 2px 8px;
  border-radius: 20px;
  background-color: ${(props) => props.bg};
`;

export const BadgeText = styled.Text`
  font-size: 11px;
  font-weight: 600;
  color: ${(props) => props.color};
`;

export const ConfirmBadge = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 3px;
  background-color: #F4F6FD;
  padding: 2px 8px;
  border-radius: 20px;
`;

export const ConfirmText = styled.Text`
  font-size: 11px;
  font-weight: 600;
  color: #7A8FC4;
`;

export const MapLink = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #FFFFFF;
  border-radius: 20px;
  padding: 14px 18px;
  gap: 12px;
`;

export const MapLinkBody = styled.View`
  flex: 1;
`;

export const MapLinkTitle = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: #0D2D7A;
`;

export const MapLinkSub = styled.Text`
  font-size: 11px;
  color: #8A9BC4;
  margin-top: 2px;
`;

export const MapIconCircle = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background-color: #EEF2FB;
  align-items: center;
  justify-content: center;
`;