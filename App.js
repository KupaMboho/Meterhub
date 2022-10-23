import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/infrastructure/theme";

//Fonts
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import {
  useFonts as useMontserrant,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";
import {
  useFonts as useRoboto,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";

//react navigation
import RootStack from "./navigators/RootStack";

//Sessions
import { AppContext } from "./src/lib/sessions.context";

export default function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [montserratLoaded] = useMontserrant({
    Montserrat_400Regular,
  });

  const [robotoLoaded] = useRoboto({
    Roboto_400Regular,
  });

  if (!oswaldLoaded || !montserratLoaded || !robotoLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <RootStack />
      </AppContext.Provider>
    </ThemeProvider>
  );
}
