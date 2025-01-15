/* GLAVNE REACT/REACT NATIVE BIBLIOTEKE */
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, useWindowDimensions } from 'react-native';

/* EXPO-SPECIFIC BIBLIOTEKE */
import Ionicons from '@expo/vector-icons/Ionicons';

/* KOMPONENTE */
import SimpleRow from './SimpleRow';
import SolutionPager from './SolutionPagerComponent/SolutionPager';

const ResultsCard = ({
    questionIndex,
    screenCount,
    totalQuestions,
    player,
    colorScheme,
    areAllScreensCompleted,
    cardRotation
}) => {

    /* STANJA ZA KOMPONENTU */
    const [coeffCorrectAnswers, setCoeffCorrectAnswers] = useState(player.score / totalQuestions)   // Koeficijent tocnih odgovora
    const [eduMessage, setEduMessage] = useState("")                                                // Info poruka za ucenika
    const [displaySolutions, setDisplaySolutions] = useState(false)

    // RN hook koji vraca velicinu ekrana za definiranje
    // radi li se o portrait ili landscape orijentaciji
    // https://reactnative.dev/docs/usewindowdimensions 
    const { width, height } = useWindowDimensions();

    // Provjera vertikale i orijentacije (nije potrebno kao stanje, jer
    // se na ekranu rezultata ne postavlja rotacija nego rotacija ostaje
    // na stupnju na kojem je pripadajuca kartica bila u trenutku zavrsetka igre)
    let isVertical = cardRotation.degrees === 180 || cardRotation.degrees === 0
    let isLandscape = width > height

    /* FUNKCIJE ZA KOMPONENTU */

    // Na temelju dobivenog koeficijenta, prikazi prikladnu poruku
    const handleGradingMessage = () => {
        if (coeffCorrectAnswers > 0.75) {
            setEduMessage("Bravo! Imao si više od 75% točnih odgovora!")
        } else if (coeffCorrectAnswers >= 0.5) {
            setEduMessage("Dobro si se snašao, ali možeš i bolje!")
        } else {
            setEduMessage("Nije ti sve uspjelo, ali možeš i bolje! Pokušaj ponovno!")
        }
    }


    const handleDisplaySolutions = () => {
        setDisplaySolutions(!displaySolutions)
    }


    // Prema podatku o vertikalnosti i orijentaciji, postavlja skaliranje 
    // elemenata unutar kartice
    const cardScale = () => {
        if (isVertical && !isLandscape) return 1
        else if (!isVertical && !isLandscape) return 0.8
        else if (isVertical && isLandscape) return 0.9
        // Javlja se edge case radi sirenja trece kartice na ekranu
        // ukoliko igraju samo tri igraca, pa je zbog toga namjesteno
        // da u tom slucaju adaptira sirinu, jer u protivnom izlazi iz
        // granica svoje kartice
        if (screenCount === 3 && questionIndex === 2)
            return 0.8
        else return 0.7
    }

    // Prema podatku o vertikalnosti i orijentaciji, postavlja sirinu 
    // elemenata unutar kartice
    const cardWidth = () => {
        if (isVertical && !isLandscape) return "100%"
        else if (!isVertical && !isLandscape) return "100%"
        else if (isVertical && isLandscape) return "70%"
        // Javlja se edge case radi sirenja trece kartice na ekranu
        // ukoliko igraju samo tri igraca, pa je zbog toga namjesteno
        // da u tom slucaju adaptira sirinu, jer u protivnom izlazi iz
        // granica svoje kartice
        if (screenCount === 3 && questionIndex === 3)
            return "30%"
        else return "70%"
    }

    useEffect(() => {
        handleGradingMessage()
    }, [coeffCorrectAnswers])


    return (
        <View style={{
            transform: [
                { rotateZ: `${cardRotation.degrees}deg` },
                { scale: cardScale() }],
            width: cardWidth()
        }}>
            <View style={resultsCardStyle.header}>
                <Text style={{ ...resultsCardStyle.title, color: colorScheme.accent }}>
                    {
                        !areAllScreensCompleted ?
                            `${player.name}, završio si vježbu!` :
                            displaySolutions ? "Detalji" : "Vježba je gotova!"
                    }
                </Text>

                {areAllScreensCompleted && <>
                    {
                        displaySolutions ?
                            <Pressable style={resultsCardStyle.detailButton} onPress={handleDisplaySolutions}>
                                <Ionicons name='close-circle' size={24} color={colorScheme.dark} />
                            </Pressable> :

                            <Pressable style={resultsCardStyle.detailButton} onPress={handleDisplaySolutions}>
                                <Ionicons name='information-circle' size={24} color={colorScheme.dark} />
                            </Pressable>
                    }
                </>}
            </View>

            {
                areAllScreensCompleted &&
                <>

                    {
                        displaySolutions ?
                            <>
                                <SolutionPager answered={player.answers} colorScheme={colorScheme} />
                            </> :
                            <>
                                <SimpleRow title="Tvoje ime:" value={player.name} colorScheme={colorScheme} />
                                <SimpleRow title="Broj bodova:" value={`${player.score}/${totalQuestions}`} colorScheme={colorScheme} />
                                <SimpleRow title="Postotak:"                         value={`${(coeffCorrectAnswers * 100).toFixed(2)}%`}colorScheme={colorScheme} />
                                <View style={resultsCardStyle.gradeContainer}>
                                    <SimpleRow title="Vaša ocjena:" value={eduMessage + " Povratak na početak za 30 sekundi..."} colorScheme={colorScheme} numberOfLines={4} />
                                </View>
                            </>
                    }
                </>
            }

        </View>
    );
};

const resultsCardStyle = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    title: {
        fontFamily: 'Comfortaa_400Regular',
        fontSize: 17,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
    },

    gradeContainer: {
        marginTop: 5, marginBottom: 10, paddingBottom: 10
    },

    detailButton: {
        paddingVertical: 6,
        paddingHorizontal: 6,
        elevation: 2,
    }
})


export default ResultsCard;
