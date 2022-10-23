import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

//icons
import { Ionicons } from "@expo/vector-icons";

//formik
import { Formik } from "formik";
import * as yup from "yup";

//Styles
import {
  StyledContainer,
  PageTitleReset,
  SubtitleReset,
  SubtitleReset1,
  StyledFormAreaReset,
  StyledInputLabel,
  StyledTextInput,
  LeftIcon,
  RightIcon,
  StyledButton,
  ButtonText,
  Colors,
  AppBackground,
} from "./../components/styles";

import KeyboardAvoidingWrapper from "./../components/KeyboardAvoidingWrapper";

const { black, greyText } = Colors;

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
});

export const ResetPassword = ({ navigation }) => {
  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <AppBackground>
          <ScrollView>
            <PageTitleReset>Forgot Your Password?</PageTitleReset>
            <SubtitleReset>Enter your email and we will send</SubtitleReset>
            <SubtitleReset1>you a reset code</SubtitleReset1>
            <Formik
              initialValues={{ email: "" }}
              validateOnMount={true}
              onSubmit={(values) => {
                console.log(values);
                navigation.navigate("Login");
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
                <StyledFormAreaReset>
                  <MyTextInput
                    icon="person"
                    placeholder="Email"
                    placeholderTextColor={greyText}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errorType}>{errors.email}</Text>
                  )}
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Send</ButtonText>
                  </StyledButton>
                </StyledFormAreaReset>
              )}
            </Formik>
          </ScrollView>
        </AppBackground>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
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
  errorType: {
    fontSize: 14,
    color: "red",
    fontWeight: "bold",
    marginLeft: 5,
  },
});
