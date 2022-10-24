import React, { useContext, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import {
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import styled from "styled-components";
import { Searchbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppBackground } from "../components/styles";
import { OrdersContext } from "../src/services/orders/orders.context";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "../src/infrastructure/theme/colors";
import { FadeInView } from "../src/features/orders/components/animations/fade.animation";
import AsyncStorage from "@react-native-async-storage/async-storage";

//CardView imports
import { FontAwesome } from "@expo/vector-icons";
import {
  Title,
  Address,
  Info,
  OrderCard,
} from "../src/features/orders/components/order-info-card.styles";
import call from "react-native-phone-call";
import { async } from "@firebase/util";

//Search feature
const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const HomeTitle = styled.Text`
  font-size: 38px;
  font-weight: bold;
  margin-bottom: 16px;
  color: ${(props) => props.theme.colors.bg.primary};
`;

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;

const OrderList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const HomeScreen = ({ navigation }) => {
  const { isLoading, orders } = useContext(OrdersContext);
  const [meterReaderID, setMeterReaderID] = useState(null);

  //Backend code test
  const [filterdData, setfilterdData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setsearch] = useState("");

  useEffect(() => {
    navigation.addListener("focus", async () => {
      const meterReaderIDUri = await AsyncStorage.getItem("login");

      const fetchPosts = () => {
        //const apiURL = "http://192.168.8.206:3000/orders";
        const apiURL = "http://meterhub.epizy.com/api/search.php";
        //const apiURL = "http://10.0.2.2:80/api/search.php";

        let data = {
          Meter_Reader_ID: meterReaderIDUri,
        };

        fetch(apiURL, {
          method: "POST",
          header: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
          //body: null,
        })
          .then((response) => response.json())
          .then((responseJson) => {
            setfilterdData(responseJson);
            setmasterData(responseJson);
            setMeterReaderID(meterReaderIDUri);
            AsyncStorage.setItem(
              "phoneNumber",
              responseJson[0].phone_number
            ).catch((e) => {
              console.log("Error" + e);
            });
            console.log(responseJson);
          })
          .catch((error) => {
            console.error(error);
          });
      };
      fetchPosts();
    });
  }, [navigation, meterReaderID]);

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.meter_address
          ? item.meter_address.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterdData(newData);
      setsearch(text);
    } else {
      setfilterdData(masterData);
      setsearch(text);
    }
  };

  return (
    <>
      <AppBackground>
        <SafeArea>
          {isLoading && (
            <LoadingContainer>
              <Loading size={50} animating={true} color={colors.ui.primary} />
            </LoadingContainer>
          )}
          <SearchContainer>
            <ProfileButton />
            <HomeTitle>Home</HomeTitle>
            <Searchbar
              placeholder="Search for a location"
              value={search}
              onSubmitEditing={(text) => searchFilter(text)}
              onChangeText={(text) => searchFilter(text)}
              style={styles.card1}
            />
          </SearchContainer>
          <OrderList
            data={filterdData}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("MeterCapturing", {
                      order: item,
                      image: "",
                    })
                  }
                >
                  <FadeInView>
                    <OrderCard elevation={10} style={styles.card}>
                      <CallButton />
                      <Info>
                        <Title>{item.meter_number}</Title>
                        <Address>{item.meter_address}</Address>
                      </Info>
                    </OrderCard>
                  </FadeInView>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.meter_number}
          />
        </SafeArea>
      </AppBackground>
      <ExpoStatusBar style="light" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  itemStyle: {
    padding: 5,
  },
  textInputStyle: {
    height: 60,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "white",
  },
  card: { backgroundColor: "rgba(220, 220, 220, 0.5)" },
  card1: { borderRadius: 14 },
});

//const styles = StyleSheet.create({
//  card: { backgroundColor: "rgba(220, 220, 220, 0.5)" },
//});

//Call feature
export const CallButtonStyle = styled(TouchableOpacity)`
  position: absolute;
  top: 16px;
  right: 22px;
  z-index: 9;
`;

const CallButton = () => {
  const [inputValue, setInputValue] = useState("");

  const getFirstname = async () => {
    const firstnameUri = await AsyncStorage.getItem("phoneNumber");
    setInputValue(firstnameUri);
  };

  useEffect(() => {
    getFirstname();
  }, []);

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

//Profile icon
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
