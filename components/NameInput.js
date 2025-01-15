/* GLAVNE REACT/REACT NATIVE BIBLIOTEKE */
import { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

/* GLOBALNI STILOVI */
import { cardColors } from '../styles';

export default function NameInput({ player, index, handlePlayerNameChange }) {
    /* STANJA ZA KOMPONENTU */
    const [name, setName] = useState('');  // Za postavljanje imena igraca
    
    /* FUNKCIJE KOMPONENTE */

    // Handlerska funkcija za tekstni input, s callbackom koji poziva handlersku funkciju iz Lobby ekrana
    const handleNameChange = (newName) => {
        setName(newName);
        handlePlayerNameChange(player.id, newName)
    }; 

    return (
        <View style={nameInputStyle.container}>
            <TextInput
                style={{
                    ...nameInputStyle.input,
                    backgroundColor: cardColors[index].light,
                    color: cardColors[index].dark
                }}
                value={name}
                onChangeText={handleNameChange}
                placeholder="Unesite ime..."
            />
        </View>
    );
}

const nameInputStyle = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        width: "90%",
        padding: 10,
        margin: "5%",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 5,
    }
});
