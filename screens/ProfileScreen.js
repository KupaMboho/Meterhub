import React, { useEffect, useState } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { StackActions } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  InnerContainer,
  PageTitle,
  Subtitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  ProfileContainer,
  ProfileImage,
  Avatar,
} from "./../components/styles";
import { authentication } from "../firebase/firebase.config";

//Sessions
import { useAppContext } from "../src/lib/sessions.context";

export const ProfileScreen = ({ navigation }) => {
  const { userHasAuthenticated } = useAppContext();

  //Image
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const getFirstname = async () => {
    const firstnameUri = await AsyncStorage.getItem("firstname");
    const lastnameUri = await AsyncStorage.getItem("lastname");
    setFirstname(firstnameUri);
    setLastname(lastnameUri);
  };

  useEffect(() => {
    getFirstname();
  }, []);

  const handleLogout = () => {
    userHasAuthenticated(false);
    navigation.dispatch(StackActions.popToTop());
  };
  /* const handleSignOut = () => {
    authentication
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  }; */

  return (
    <>
      <InnerContainer>
        <ProfileImage
          resizeMode="cover"
          source={require("./../assets/image_bg.png")}
        />
        <ProfileContainer>
          <PageTitle profile={true}>Profile</PageTitle>
          <Subtitle profile={true}>Hi, there</Subtitle>
          <View style={styles.nameDisplay}>
            <Subtitle profile={true}>{firstname}</Subtitle>
            <Subtitle profile={true}>{lastname}</Subtitle>
          </View>
          <StyledFormArea>
            <Avatar
              resizeMode="cover"
              source={require("./../assets/adaptive-black-icon.png")}
            />
            <StyledButton onPress={handleLogout}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </ProfileContainer>
      </InnerContainer>
      <ExpoStatusBar style="light" />
    </>
  );
};

const styles = StyleSheet.create({
  nameDisplay: {
    flexDirection: "row",
  },
});
