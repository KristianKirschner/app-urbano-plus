import styled from 'styled-components/native';

// ─── Paleta ───────────────────────────────────────────────────────────────────
const colors = {
  background: '#0F1117',
  surface: '#1A1D27',
  surfaceHigh: '#22263A',
  border: '#2E3248',
  accent: '#4F6EF7',
  accentLight: 'rgba(79, 110, 247, 0.15)',
  danger: '#F75C5C',
  textPrimary: '#ECEEF8',
  textSecondary: '#7A80A0',
  textMuted: '#4A5070',
};

// ─── Container principal ───────────────────────────────────────────────────────
export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
  padding: 0px 24px 40px;
  justify-content: flex-end;
`;

export const Header = styled.View`
  padding: 36px 0px 28px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
  margin-bottom: 28px;
`;

export const HeaderLabel = styled.Text`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2.5px;
  color: ${colors.accent};
  text-transform: uppercase;
  margin-bottom: 6px;
`;

export const Title = styled.Text`
  font-size: 26px;
  font-weight: 800;
  color: ${colors.textPrimary};
  letter-spacing: -0.5px;
`;

// ─── Formulário ───────────────────────────────────────────────────────────────
export const FieldGroup = styled.View`
  margin-bottom: 20px;
`;

export const FieldLabel = styled.Text`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  color: ${colors.textSecondary};
  margin-bottom: 8px;
`;

export const StyledInput = styled.TextInput.attrs({
  placeholderTextColor: colors.textMuted,
})`
  background-color: ${colors.surface};
  border-width: 1px;
  border-color: ${colors.border};
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 15px;
  color: ${colors.textPrimary};
  font-weight: 400;
`;

export const StyledTextArea = styled(StyledInput)`
  min-height: 90px;
`;

// ─── Raio ─────────────────────────────────────────────────────────────────────
export const RadiusRow = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.surface};
  border-width: 1px;
  border-color: ${colors.border};
  border-radius: 12px;
  overflow: hidden;
`;

export const RadiusButton = styled.TouchableOpacity`
  width: 52px;
  height: 52px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.surfaceHigh};
`;

export const RadiusButtonText = styled.Text`
  font-size: 22px;
  font-weight: 300;
  color: ${colors.textPrimary};
  line-height: 26px;
`;

export const RadiusValueWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const RadiusValue = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.textPrimary};
  letter-spacing: -0.3px;
`;

export const RadiusUnit = styled.Text`
  font-size: 12px;
  color: ${colors.textSecondary};
  font-weight: 500;
`;

// ─── Categoria ────────────────────────────────────────────────────────────────
export const CategoryRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

export const CategoryChip = styled.TouchableOpacity`
  padding: 8px 14px;
  border-radius: 20px;
  border-width: 1.5px;
  border-color: ${({ selected }) => (selected ? colors.accent : colors.border)};
  background-color: ${({ selected }) =>
    selected ? colors.accentLight : colors.surface};
`;

export const CategoryChipText = styled.Text`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: ${({ selected }) =>
    selected ? colors.accent : colors.textSecondary};
`;

// ─── Coordenadas ──────────────────────────────────────────────────────────────
export const CoordBadge = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  background-color: ${colors.accentLight};
  border-radius: 8px;
  padding: 8px 12px;
  align-self: flex-start;
  margin-bottom: 28px;
`;

export const CoordText = styled.Text`
  font-size: 12px;
  color: ${colors.accent};
  font-weight: 600;
  font-variant: tabular-nums;
`;

// ─── Ações ────────────────────────────────────────────────────────────────────
export const ActionsWrapper = styled.View`
  gap: 12px;
  margin-top: 8px;
`;

export const PrimaryButton = styled.TouchableOpacity`
  background-color: ${colors.accent};
  border-radius: 14px;
  height: 54px;
  align-items: center;
  justify-content: center;
`;

export const PrimaryButtonText = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.3px;
`;

export const SecondaryButton = styled.TouchableOpacity`
  border-radius: 14px;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-width: 1.5px;
  border-color: ${colors.border};
`;

export const SecondaryButtonText = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: ${colors.textSecondary};
`;