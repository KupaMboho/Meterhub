import React, { useState } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { authentication } from "../firebase/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

//Sessions
import { useAppContext } from "../src/lib/sessions.context";

//formik
import { Formik } from "formik";
import * as yup from "yup";

//icons
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";

import { StyleSheet, View, ScrollView, Text, Alert } from "react-native";

import {
  StyledContainer,
  InnerContainerLogin,
  PageLogo,
  PageTitle,
  Subtitle,
  StyledFormArea,
  StyledInputLabel,
  StyledTextInput,
  LeftIcon,
  RightIcon,
  StyledButton,
  ButtonText,
  Colors,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  AppBackground,
} from "./../components/styles";

import KeyboardAvoidingWrapper from "./../components/KeyboardAvoidingWrapper";

const { primary, black, greyText } = Colors;

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .min(6, ({ min }) => `Meter reading should be at least ${min} characters`)
    .required("Meter reading is required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

export const LoginScreen = ({ navigation }) => {
  const [hidePassword, setHidePassowrd] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [isSignIn, setIsSignedIn] = useState("");
  const [pass, setPass] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { userHasAuthenticated } = useAppContext();

  return (
    <>
      <StyledContainer>
        <AppBackground>
          <ScrollView>
            <InnerContainerLogin>
              <PageLogo
                resizeMode="cover"
                source={require("./../assets/meterhub_logo.png")}
              />
              <PageTitle>Welcome Back</PageTitle>
              <Subtitle>Login in to your account!</Subtitle>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  meter_reader_id: "",
                  firstname: "",
                  lastname: "",
                }}
                validateOnMount={true}
                onSubmit={(values) => {
                  let api = "http://meterhub.epizy.com/api/authenticate.php";

                  let headers = {
                    "Content-Type": "application/json",
                  };

                  let data = {
                    Username: values.email,
                    Password: values.password,
                    Meter_Reader_ID: values.meter_reader_id,
                    Firstname: values.firstname,
                    Lastname: values.lastname,
                  };

                  fetch(api, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(data),
                  })
                    .then((response) => response.json())
                    .then((response) => {
                      if (response[0].Username === values.email) {
                        console.log(response);
                        setisLoading(true);
                        setTimeout(() => {
                          setisLoading(false);
                          userHasAuthenticated(true);
                          console.log(response[0].Meter_Reader_ID);
                          AsyncStorage.setItem(
                            "login",
                            response[0].Meter_Reader_ID
                          );
                          AsyncStorage.setItem(
                            "firstname",
                            response[0].Firstname
                          );
                          AsyncStorage.setItem(
                            "lastname",
                            response[0].Lastname
                          );
                          navigation.navigate("Home");
                        }, 1000);
                      } else {
                        Alert.alert("Error", "Incorrect login details", [
                          {
                            text: "OK",
                          },
                        ]);
                      }
                    })
                    .catch((err) => {
                      console.error("ERROR FOUND" + err);
                    });
                  console.log(values);
                }}
                validationSchema={loginValidationSchema}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  touched,
                  errors,
                }) => (
                  <StyledFormArea>
                    <MyTextInput
                      icon="person"
                      placeholder="Username"
                      placeholderTextColor={greyText}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                    <MyTextInput
                      icon="lock-closed"
                      placeholder="********"
                      placeholderTextColor={greyText}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      secureTextEntry={hidePassword}
                      isPassword={true}
                      hidePassword={hidePassword}
                      setHidePassowrd={setHidePassowrd}
                    />
                    {errors.password && touched.password && (
                      <Text style={styles.errorType}>{errors.password}</Text>
                    )}
                    {!isLoading ? (
                      <StyledButton onPress={handleSubmit}>
                        <ButtonText>Login</ButtonText>
                      </StyledButton>
                    ) : (
                      <ActivityIndicator
                        animating={true}
                        color={primary}
                        padding={10}
                      />
                    )}
                    <ExtraView>
                      <ExtraText>Forgot Your Pasword?</ExtraText>
                      <TextLink onPress={() => navigation.navigate("Reset")}>
                        <TextLinkContent>Reset</TextLinkContent>
                      </TextLink>
                    </ExtraView>
                  </StyledFormArea>
                )}
              </Formik>
            </InnerContainerLogin>
          </ScrollView>
        </AppBackground>
      </StyledContainer>
      <ExpoStatusBar style="light" />
    </>
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
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
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
        <Ionicons name={icon} size={30} color={black} />
      </LeftIcon>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  errorType: {
    fontSize: 14,
    color: "red",
    fontWeight: "bold",
    marginLeft: 5,
  },
});
