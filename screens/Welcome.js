import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Lobby from "../screens/Lobby";
import Quiz from "../screens/Quiz";

const Welcome = ({ navigation }) => {
  const handleStart = () => {
    navigation.navigate("Lobby"); // Navigate to the Lobby screen
  };

  return (
    <View style={styles.container}>
      {/* Logo in the top-left corner */}
      <Image source={require("../assets/logo.svg")} style={styles.logo} />

      {/* Secondary Group Icon in the top-right corner */}
      <Image source={require("../assets/groupSecondary.svg")} style={styles.secondaryGroupIcon} />

      {/* Welcome Text */}
      <Text style={styles.heading}>Bok!</Text>
      <Text style={styles.subHeading}>Dobrodošli u CoCo aplikaciju!</Text>

      {/* Start Button */}
      <AwesomeButton
        type="primary"
        onPress={handleStart}
        style={styles.startButton}
        width={200}
        height={60}
      >
        <Text style={styles.startButtonText}>Pokreni</Text>
        <Image source={require("../assets/play.svg")} style={styles.playIcon} />
      </AwesomeButton>

      {/* Bottom Text and Icons */}
      <View style={styles.footerContainer}>
        {/* Bottom Left Icon */}
        <Image source={require("../assets/group.svg")} style={styles.groupIcon} />

        {/* Footer Text */}
        <View style={styles.footerTextContainer}>
          <Text style={styles.footerText}>Trenutne postavke:</Text>
          <Text style={styles.footerText}>Broj učenika: 4 | Trajanje: 10 min | Operatori: + - % *</Text>
          <Text style={styles.footerText}>Prvi operand: od 1 do 100 | Drugi operand: 10</Text>
        </View>

        {/* Bottom Right Icon */}
        <Image source={require("../assets/round.svg")} style={styles.roundIcon} />
      </View>
    </View>
  );
};

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Lobby" component={Lobby} />
        <Stack.Screen name="Quiz" component={Quiz} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6EAF3",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  secondaryGroupIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  heading: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#4B4B4B",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 18,
    color: "#6B6B6B",
    marginBottom: 40,
  },
  startButton: {
    marginVertical: 20,
  },
  startButtonText: {
    fontSize: 20,
    color: "#FFFFFF",
    marginRight: 10,
  },
  playIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  footerContainer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  groupIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  footerTextContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  footerText: {
    fontSize: 14,
    color: "#6B6B6B",
    textAlign: "center",
  },
  roundIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});

export default AppNavigator;
