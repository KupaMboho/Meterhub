import { Card } from "react-native-paper";
import styled from "styled-components";

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 16px;
`;

export const Address = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 14px;
`;

export const Info = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const OrderCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  margin-bottom: ${(props) => props.theme.space[3]};
  border-radius: 15px;
`;
