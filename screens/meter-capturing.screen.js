import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Formik } from "formik";
import { Ionicons } from "@expo/vector-icons";
import { SafeArea } from "../components/safe-area.components";
import { Avatar } from "react-native-paper";
import { StyleSheet, View, Text, ScrollView, Alert } from "react-native";
import { CheckBox } from "react-native-elements";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import base64 from "react-native-base64";

//axios
import axios from "axios";

//CardView imports
import {
  Title,
  Address,
  Info,
  OrderCard,
} from "../src/features/orders/components/order-info-card.styles";
import call from "react-native-phone-call";
import { FontAwesome } from "@expo/vector-icons";

const { primary, black, greyText } = Colors;

import {
  StyledFormArea,
  StyledTextMeterCapturingInput,
  StyledInputMeterCapturingLabel,
  StyledButton2,
  ButtonText,
  LeftIcon,
  RightIcon,
  Colors,
} from "./../components/styles";

const HomeTitle = styled.Text`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 16px;
  margin-top: 48px;
  text-align: center;
`;

const AvatarContainer = styled.View`
  align-items: center;
`;

const meterReadingSchema = yup.object().shape({
  username: yup
    .string()
    .min(6, ({ min }) => `Meter reading should be at least ${min} numbers`)
    .required("Meter reading is required"),
});

export const MeterCapturingScreen = ({ navigation, route }) => {
  const { order } = route.params;
  //const { imageData } = route.params;
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);

  //Image
  const [photo, setPhoto] = useState(null);

  //inserting into database
  const [reading_id, setReadingId] = useState("");
  const [meter_id, setMeterId] = useState("");
  const [reading, setReading] = useState("");

  const [isSubmit, setIsSubmit] = useState("");

  const getProfilePicture = async () => {
    const photoUri = await AsyncStorage.getItem("imageData");
    console.log(photoUri);
    setPhoto(photoUri);
  };

  useEffect(() => {
    getProfilePicture();
  }, []);

  /* useEffect(() => {
    const authenticate = async () => {
      axios
        .post(
          "http://10.0.2.2:80/api/input.php",
          JSON.stringify({
            ReadingId: ReadingId,
            MeterId: MeterId,
            Reading: Reading,
          })
        )
        .then((response) => {
          console.log(response.data);
          setIsSubmit(false);
          //NAVIGATE USER BASEDON THE RESPONSE
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (isSubmit) {
      authenticate();
    }
  }, [isSubmit, ReadingId, MeterId, Reading]); */

  const readingIdHandler = (text) => {
    //Validations
    setReadingId(text);
  };

  const meterIdHandler = (text) => {
    //Validations
    setMeterId(text);
  };

  const readingHandler = (text) => {
    //Validations
    setReading(text);
  };

  return (
    <SafeArea>
      <ScrollView>
        <HomeTitle>Meter Capturing</HomeTitle>
        <OrderCard elevation={10} style={styles.card} order={order}>
          <CallButton />
          <Info>
            <Title>{order.meter_number}</Title>
            <Address>{order.meter_address}</Address>
          </Info>
        </OrderCard>
        <Formik
          initialValues={{
            username: "",
            reading_id: order.meter_id,
            photo: photo,
          }}
          validateOnMount={true}
          onSubmit={async (values) => {
            axios
              .post(
                //"http://10.0.2.2:80/api/input.php",
                "http://meterhub.epizy.com/api/input.php",
                JSON.stringify({
                  reading: values.username,
                  meter_id: values.reading_id,
                  reading_id: values.photo,
                  //ReadingId: values.ReadingId,
                  //MeterId: values.MeterId,
                  //Reading: values.username,
                })
              )
              .then((response) => {
                console.log(response.data);
                setIsSubmit(false);
                Alert.alert("Great", "Reading captured", [
                  { text: "OK", onPress: () => navigation.navigate("Home") },
                ]);
                //NAVIGATE USER BASED ON THE RESPONSE
              })
              .catch((err) => {
                console.log(err);
              });
            console.log(values);
          }}
          validationSchema={meterReadingSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <StyledFormArea>
              <MyTextInput
                label="Enter Meter Reading:"
                icon="speedometer-outline"
                placeholder="meter reading"
                placeholderTextColor={greyText}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.Reading}
              />
              {errors.username && touched.username && (
                <Text style={styles.errorType}>{errors.username}</Text>
              )}
              <Text style={styles.layoutText}>Upload Meter Reading:</Text>
              <AvatarContainer>
                <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
                  {!photo && (
                    <Avatar.Icon
                      size={130}
                      icon="camera"
                      backgroundColor={primary}
                      marginTop={8}
                      marginLeft={30}
                    />
                  )}
                  {photo && (
                    <Avatar.Image
                      size={180}
                      source={{ uri: photo }}
                      backgroundColor="#2182BD"
                    />
                  )}
                </TouchableOpacity>
              </AvatarContainer>
              <Text style={styles.layoutText}>Select comments:</Text>
              <View style={styles.checkboxView}>
                <CheckBox
                  title="No issues"
                  checked={checked}
                  checkedColor={"green"}
                  onPress={() => setChecked(!checked)}
                />
                <CheckBox
                  title="Locked gate"
                  checked={checked1}
                  checkedColor={"green"}
                  onPress={() => setChecked1(!checked1)}
                />
              </View>
              <View style={styles.checkboxView2}>
                <CheckBox
                  title="Unclear picture"
                  checked={checked2}
                  checkedColor={"green"}
                  onPress={() => setChecked2(!checked2)}
                />
                <CheckBox
                  title="Nobody's home"
                  checked={checked3}
                  checkedColor={"green"}
                  onPress={() => setChecked3(!checked3)}
                />
              </View>
              <CheckBox
                title="Meter not found"
                checked={checked4}
                checkedColor={"green"}
                onPress={() => setChecked4(!checked4)}
              />
              <StyledButton2 onPress={handleSubmit}>
                <ButtonText>Done</ButtonText>
              </StyledButton2>
            </StyledFormArea>
          )}
        </Formik>
      </ScrollView>
    </SafeArea>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassowrd,
  ...props
}) => {
  return (
    <View>
      <StyledInputMeterCapturingLabel>{label}</StyledInputMeterCapturingLabel>
      <StyledTextMeterCapturingInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassowrd(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={30}
            color={black}
          />
        </RightIcon>
      )}
      <LeftIcon>
        <Ionicons name={icon} size={30} color={black} style={styles.layout} />
      </LeftIcon>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: { marginLeft: 14 },
  layoutText: {
    marginTop: 4,
    marginLeft: 16,
    fontSize: 18,
    fontWeight: "bold",
  },
  checkboxView: {
    flexDirection: "row",
    marginRight: 25,
    justifyContent: "space-between",
  },
  checkboxView2: {
    flexDirection: "row",
    marginRight: 6,
    justifyContent: "space-between",
  },
  errorType: {
    fontSize: 14,
    color: "red",
    fontWeight: "bold",
    marginLeft: 16,
  },
  card: { backgroundColor: "rgba(220, 220, 220, 0.5)" },
});

//const styles = StyleSheet.create({
//  card: { backgroundColor: "rgba(220, 220, 220, 0.5)" },
//});

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