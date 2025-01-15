/* GLAVNE REACT/REACT NATIVE BIBLIOTEKE */
import React from "react";
import { Text, View, Pressable, StyleSheet, FlatList } from "react-native";

/* GLOBALNI STILOVI */
import { styles } from "../styles";

/* KOMPONENTE */
import NameInput from "../components/NameInput";

const Lobby = ({ players, setStartGame, handlePlayerNameUpdate, canContinueToQuiz }) => {
  
  /* FUNKCIJE LOBBY EKRANA */

  // Dohvaca vrijednosti iz NameInput komponente i salje dalje u Main komponentu
  // gdje se nalazi prikladna handlerska funkcija
  const handlePlayerNameChange = (playerId, newName) => {
    handlePlayerNameUpdate(playerId, newName)
  }

  // Render funkcija za FlatList komponentu - https://reactnative.dev/docs/flatlist
  const renderItem = ({ item, index }) =>
    <NameInput
      player={item}
      index={index}
      handlePlayerNameChange={(id, name) => handlePlayerNameChange(id, name)} />

  return (
    <View style={lobbyStyle.container}>
      <Text style={{ ...lobbyStyle.baseText, ...lobbyStyle.title }}>DOBRODOŠLI!</Text>
      <Text style={{ ...lobbyStyle.baseText, ...lobbyStyle.description }}>Unesite svoja imena s obzirom na raspored sjedenja:</Text>

      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />

      {canContinueToQuiz && <Pressable
        style={{ ...styles.button, ...lobbyStyle.button }}
        onPress={setStartGame}>
        <Text style={lobbyStyle.buttonText}>POTVRDI</Text>
      </Pressable>}

    </View>
  );
};


export const lobbyStyle = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
  },

  baseText: {
    fontFamily: 'Comfortaa_600SemiBold',
  },

  title: {
    fontSize: 28
  },

  description: {
    fontSize: 14,
    margin: 10
  },

  button: {
    backgroundColor: "#E43A8A",
    marginTop: 10
  },

  buttonText: {
    color: "white",
    letterSpacing: 2
  },
})

export default Lobby;


