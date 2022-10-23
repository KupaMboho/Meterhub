import React from "react";

import { Colors } from "./../components/styles";

const { secondary, black } = Colors;

//Screens
import { LoginScreen } from "../screens/LoginScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { CameraScreen } from "../screens/CameraScreen";
import { ResetPassword } from "../screens/ForgotPasswordScreen";

//React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { OrdersContextProvider } from "../src/services/orders/orders.context";
import { LocationContextProvider } from "../src/services/location/location.context";
import { MeterCapturingScreen } from "../screens/meter-capturing.screen";

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <LocationContextProvider>
      <OrdersContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                background: "transparent",
              },
              headerTintColor: black,
              headerTransparent: true,
              headerTitle: "",
              headerLeftContainerStyle: {
                paddingLeft: 20,
              },
            }}
            initialRouteName="Login"
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen
              options={{
                headerTintColor: secondary,
                headerShown: false,
              }}
              name="Home"
              component={HomeScreen}
            />
            <Stack.Screen
              options={{ headerTintColor: secondary }}
              name="Profile"
              component={ProfileScreen}
            />
            <Stack.Screen
              name="MeterCapturing"
              component={MeterCapturingScreen}
            />
            <Stack.Screen
              options={{ headerTintColor: secondary }}
              name="Camera"
              component={CameraScreen}
            />
            <Stack.Screen
              options={{ headerTintColor: secondary }}
              name="Reset"
              component={ResetPassword}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </OrdersContextProvider>
    </LocationContextProvider>
  );
};

export default RootStack;
