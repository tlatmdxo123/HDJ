import styled from 'styled-components';

const MediumButton = styled.button`
  padding: 5px 10px;
  border-radius: 4px;
`;

export const PrimaryButton = styled(MediumButton)<{ backgroundColor: string; color: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
`;

export const LineButton = styled(MediumButton)<{ color: string }>`
  border: 1px solid ${({ color }) => color};
  color: ${({ color }) => color};
`;
