/* GLAVNE REACT/REACT NATIVE BIBLIOTEKE */
import React from "react";
import { Text, View, Pressable, StyleSheet, FlatList, Image } from "react-native";

/* GLOBALNI STILOVI */
import { styles } from "../styles";

/* KOMPONENTE */
import NameInput from "../components/NameInput";

const Lobby = ({ players, setStartGame, handlePlayerNameUpdate, canContinueToQuiz }) => {
  /* FUNKCIJE LOBBY EKRANA */

  // Dohvaca vrijednosti iz NameInput komponente i salje dalje u Main komponentu
  // gdje se nalazi prikladna handlerska funkcija
  const handlePlayerNameChange = (playerId, newName) => {
    handlePlayerNameUpdate(playerId, newName);
  };

  // Render funkcija za FlatList komponentu - https://reactnative.dev/docs/flatlist
  const renderItem = ({ item, index }) => (
    <NameInput
      player={item}
      index={index}
      handlePlayerNameChange={(id, name) => handlePlayerNameChange(id, name)}
    />
  );

  return (
    <View style={lobbyStyle.container}>
      {/* Logo in the top-left corner */}
      <Image source={require("../assets/logo.svg")} style={lobbyStyle.logo} />

      {/* Secondary Group Icon in the top-right corner */}
      <Image source={require("../assets/groupSecondary.svg")} style={lobbyStyle.secondaryGroupIcon} />

      <View style={lobbyStyle.textWrapper}>
        <Text style={{ ...lobbyStyle.baseText, ...lobbyStyle.title }}>DOBRODOŠLI!</Text>
        <Text style={{ ...lobbyStyle.baseText, ...lobbyStyle.description }}>
          Unesite svoja imena s obzirom na raspored sjedenja:
        </Text>
        {canContinueToQuiz && (
          <Pressable style={{ ...styles.button, ...lobbyStyle.button }} onPress={setStartGame}>
            <Text style={lobbyStyle.buttonText}>POTVRDI</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />

      {/* Group Icon in the bottom-left corner */}
      <Image source={require("../assets/group.svg")} style={lobbyStyle.groupIcon} />

    </View>
  );
};

export const lobbyStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
  baseText: {
    fontFamily: "Comfortaa_600SemiBold",
  },
  title: {
    fontSize: 28,
  },
  description: {
    fontSize: 14,
    margin: 10,
  },
  button: {
    backgroundColor: "#E43A8A",
  },
  buttonText: {
    color: "white",
    letterSpacing: 2,
  },
  textWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },  
  logo: {
    position: "absolute",
    top: 40,
    left: 20,
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  secondaryGroupIcon: {
    position: "absolute",
    top: -20,
    right: 20,
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  groupIcon: {
    position: "absolute",
    bottom: -20,
    left: 20,
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
});

export default Lobby;
