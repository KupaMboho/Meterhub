import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import { Title, Address, Info, OrderCard } from "./order-info-card.styles";
import { Colors } from "../../../../components/styles";
import call from "react-native-phone-call";

const { primary, secondary, black, grey, greyText, blue } = Colors;

export const OrdersInfoCard = ({ order = {} }) => {
  const {
    name = "92012345",
    icon,
    photos,
    address = "43 Caroline Street",
  } = order;

  return (
    <OrderCard elevation={10} style={styles.card}>
      <CallButton />
      <Info>
        <Title>{name}</Title>
        <Address>{address}</Address>
      </Info>
    </OrderCard>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: "rgba(220, 220, 220, 0.5)" },
});

export const CallButtonStyle = styled(TouchableOpacity)`
  position: absolute;
  top: 16px;
  right: 22px;
  z-index: 9;
`;

const CallButton = () => {
  const [inputValue, setInputValue] = useState("+27813101925");

  const triggerCall = () => {
    const args = {
      number: inputValue,
      prompt: false,
      skipCanOpen: true,
    };

    //Make a call
    call(args).catch(console.error);
  };
  return (
    <CallButtonStyle onPress={triggerCall}>
      <FontAwesome name="phone" size={36} color="#144B38" />
    </CallButtonStyle>
  );
};
