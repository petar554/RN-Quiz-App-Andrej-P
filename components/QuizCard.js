/* GLAVNE REACT/REACT NATIVE BIBLIOTEKE */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, useWindowDimensions } from 'react-native';

/* GLOBALNI STILOVI */
import { styles } from '../styles';

/* EXPO-SPECIFIC BIBLIOTEKE */
import Ionicons from '@expo/vector-icons/Ionicons';

const QuizCard = ({
    screenCount,
    player,
    questionIndex,
    question,
    handleChoiceSelect,
    handlePlayerChoiceSelect,
    cardColor,
    rememberCardRotation,
    timeLeft,
}) => {
    /* GLAVNA STANJA KOMPONENTE */
    const [rotation, setRotation] = useState(0);                        // Postavlja rotaciju jedne kartice
    const [isVertical, setIsVertical] = useState(false);                // Provjerava je li sadrzaj vertikalan ili horizontalan
    const [isLandscape, setIsLandscape] = useState(false)               // Provjerava je li orijentacija landscape ili portrait

    // RN hook koji vraca velicinu ekrana za definiranje
    // radi li se o portrait ili landscape orijentaciji
    // https://reactnative.dev/docs/usewindowdimensions
    const { width, height } = useWindowDimensions();

    useEffect(() => { 
        // Provjeravaj orijentaciju i vertikalnost
        setIsVertical(rotation === 180 || rotation === 0)
        setIsLandscape(width > height)
    }, [isVertical, isLandscape])

    /* FUNKCIJE ZA KOMPONENTU */

    // Handlerska funkcija za sve odabire igraca i stanja ekrana
    const handleChoice = (choice, playerId) => {
        handleChoiceSelect()
        handlePlayerChoiceSelect(question, choice, playerId)
    }

    // Aplicira rotaciju, provjerava vertikalnost te orijentaciju
    const handleApplyRotation = () => {
        let rotationUpdate = rotation === 360 ? 0 : (rotation + 90) % 360
        setRotation(rotationUpdate)
        rememberCardRotation(questionIndex, rotationUpdate)
        setIsVertical(rotationUpdate === 180 || rotationUpdate === 0)
        setIsLandscape(width > height)
    };

    // Prema podatku o vertikalnosti i orijentaciji, postavlja skaliranje 
    // elemenata unutar kartice
    const cardScale = () => {
        if (isVertical && !isLandscape) return 1
        else if (!isVertical && !isLandscape) return 0.8
        else if (isVertical && isLandscape) return 0.9
        else {
            // Javlja se edge case radi sirenja trece kartice na ekranu
            // ukoliko igraju samo tri igraca, pa je zbog toga namjesteno
            // da u tom slucaju adaptira sirinu, jer u protivnom izlazi iz
            // granica svoje kartice
            if (screenCount === 3 && questionIndex === 3)
                return 0.7
            else return 0.8
        }
    }

    // Prema podatku o vertikalnosti i orijentaciji, postavlja sirinu 
    // elemenata unutar kartice
    const cardWidth = () => {
        if (isVertical && !isLandscape) return "90%"
        else if (!isVertical && !isLandscape) return "90%"
        else if (isVertical && isLandscape) return "80%"
        else {
            // Javlja se edge case radi sirenja trece kartice na ekranu
            // ukoliko igraju samo tri igraca, pa je zbog toga namjesteno
            // da u tom slucaju adaptira sirinu, jer u protivnom izlazi iz
            // granica svoje kartice
            if (screenCount === 3 && questionIndex === 2)
                return "30%"
            else return "50%"
        }
    }

    return (
        <>
            <Pressable
                onPress={() => handleApplyRotation(questionIndex)}
                style={{ ...quizCardStyle.rotateButton, zIndex: 1, backgroundColor: cardColor.light }}>
                <Ionicons name='refresh' size={24} color={cardColor.dark} />
            </Pressable>

            <View style={{
                ...quizCardStyle.mainContainer,
                transform: [
                    { rotateZ: `${rotation || 0}deg` },
                    { scale: cardScale() }
                ],
                width: cardWidth()
            }}>

                <View>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ ...styles.text, ...quizCardStyle.playerInfoText }}>
                        {`${player.name} (${timeLeft.minutes}:${timeLeft.seconds})`}
                    </Text>
                    <Text style={{ ...styles.text, ...quizCardStyle.questionText }}>{question.text}</Text>
                </View>

                {/* https://reactnative.dev/docs/flatlist */}
                <FlatList
                    data={question.choices}
                    renderItem={({ item, index }) =>
                        <Pressable
                                    key={index}
                                    style={({ pressed }) => [
                                        {
                                            backgroundColor: pressed ? cardColor.dark : cardColor.mid,
                                        },
                                        quizCardStyle.button,
                                    ]}
                                    onPress={() => handleChoice(item, player.id)}
                                >
                            <Text style={{
                                color: cardColor.light,
                                ...quizCardStyle.choiceText
                            }}>{item}</Text>
                        </Pressable>
                    }
                    contentContainerStyle={quizCardStyle.choiceContainer}
                    keyExtractor={item => item}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    numColumns={2} />
            </View>
        </>

    );
};

export const quizCardStyle = StyleSheet.create({
    mainContainer: {
        transformOrigin: 'center',
        justifyContent: "center",
        alignItems: "center"
    },

    choiceContainer: {
        marginTop: 10,
        justifyContent: "center",
        alignItems: "flex-start",
    },

    playerInfoText: {
        fontWeight: "400",
        fontFamily: 'Comfortaa_400Regular',
        fontSize: 12
    },

    questionText: {
        fontWeight: "600",
        fontFamily: 'Comfortaa_600SemiBold'
    },

    rotateButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        borderRadius: 1000,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 6,
        paddingHorizontal: 6,
        elevation: 2,
        margin: 6,
        backgroundColor: 'white',
    },

    choiceText: {
        fontFamily: 'Comfortaa_400Regular',
        fontSize: 10
    },

    button: {
        padding: 9,
        borderRadius: 4,
        marginTop: 5,
        alignItems: "center",
        flexGrow: 1,
        margin: 3,
        width: 130
    }
});

export default QuizCard;

