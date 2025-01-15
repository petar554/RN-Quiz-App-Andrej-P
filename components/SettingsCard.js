/* GLAVNE REACT/REACT NATIVE BIBLIOTEKE */
import React from 'react';
import { View, StyleSheet } from 'react-native';

/* KOMPONENTE */
import PlayerSlider from './PlayerSlider';
import QuestionsSlider from './QuestionsSlider';

const SettingsCard = ({ screens, questionsPerQuiz, setScreens, setQuestionsPerQuiz, colorSchemeIndex }) => {
    return (
        <View style={settingsCardStyle.container}>
            <View style={settingsCardStyle.sliderContainer}>
                <PlayerSlider screens={screens} setScreens={setScreens} />
                <QuestionsSlider questionsPerQuiz={questionsPerQuiz} setQuestionsPerQuiz={setQuestionsPerQuiz} />
            </View>

        </View>
    );
};

const settingsCardStyle = StyleSheet.create({
    container: {
        zIndex: 1,
        backgroundColor: "white",
        position: "absolute",
        top: "5%",
        left: "20%",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        elevation: 5,
        borderRadius: 10,
        width: "70%"
    },

    sliderContainer: {
        flexDirection: "column",
    }
})

export default SettingsCard;
