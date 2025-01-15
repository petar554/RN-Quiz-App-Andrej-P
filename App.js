/* GLAVNE REACT/REACT NATIVE BIBLIOTEKE */
import { useEffect, useState, useCallback } from "react";
import { View } from "react-native";

/* GLOBALNI STILOVI */
import { styles } from "./styles";

/* EXPO-SPECIFIC BIBLIOTEKE */
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import {
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold,
} from '@expo-google-fonts/comfortaa';

/* EKRANI */
import Main from "./Main";


// SplashScreen je zgodan kada postoje neki resursi koji se trebaju ucitati,
// a korisniku bi moglo smetati sto mora cekati ucitavanje tih resursa, ili 
// kad bi nedostatak tih resursa mogao dovesti do rusenja aplikacije.

// https://docs.expo.dev/versions/latest/sdk/splash-screen/
SplashScreen.preventAutoHideAsync();

export default function App() {
  // https://docs.expo.dev/develop/user-interface/fonts/#use-google-fonts
  let fonts = {
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
  }

  /* STANJA ZA APP KOMPONENTU/EKRAN */
  const [appIsReady, setAppIsReady] = useState(false);  // Je li aplikacija spremna za kompletno ucitavanje (fontovi su se ucitali)

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(fonts)
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  /* FUNKCIJE APP KOMPONENTE */

  // Ukoliko su se fontovi ucitali, sakrij SplashScreen i
  // prikazi glavni UI, u protivnom SplashScreen ostaje aktivan
  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={styles.container}
      onLayout={onLayoutRootView}>
      <Main />
    </View>
  );
}




