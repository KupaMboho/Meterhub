import React, { useContext, useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LocationContext } from "../../../services/location/location.context";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const HomeTitle = styled.Text`
  font-size: 38px;
  font-weight: bold;
  margin-bottom: 16px;
  color: ${(props) => props.theme.colors.bg.primary};
`;

export const Search = () => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  return (
    <SearchContainer>
      <ProfileButton />
      <HomeTitle>Home</HomeTitle>
      <Searchbar
        placeholder="Search for a location"
        value={searchKeyword}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
        style={styles.card}
      />
    </SearchContainer>
  );
};

export const ProfileButtonStyle = styled(TouchableOpacity)`
  position: absolute;
  top: 22px;
  right: 20px;
  z-index: 9;
`;

const ProfileButton = () => {
  const navigation = useNavigation();
  return (
    <ProfileButtonStyle onPress={() => navigation.navigate("Profile")}>
      <Ionicons name="person" size={36} color="white" />
    </ProfileButtonStyle>
  );
};

const styles = StyleSheet.create({
  card: { borderRadius: 14 },
});
