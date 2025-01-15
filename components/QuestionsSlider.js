/* GLAVNE REACT/REACT NATIVE BIBLIOTEKE */
import { View, Text, StyleSheet } from 'react-native';

/* REACT NATIVE COMMUNITY BIBLIOTEKE */
import Slider from '@react-native-community/slider';

/* GLOBALNI STILOVI */
import { cardColors } from '../styles';

const QuestionsSlider = ({ questionsPerQuiz, setQuestionsPerQuiz }) => {
    return (
        <View style={questionsSliderStyle.container}>
            <Text style={questionsSliderStyle.text}>{questionsPerQuiz} pitanja</Text>

            {/* https://docs.expo.dev/versions/latest/sdk/slider/ */}
            <Slider
                value={questionsPerQuiz}
                style={questionsSliderStyle.slider}
                minimumValue={2}
                maximumValue={8}
                minimumTrackTintColor={cardColors[0].accent}
                maximumTrackTintColor={cardColors[1].accent}
                thumbTintColor={cardColors[0].accent}
                step={1}
                onValueChange={setQuestionsPerQuiz}
            />
        </View>
    );
}

const questionsSliderStyle = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10
    },

    slider: {
        width: "80%",
        height: 40,
    },

    text: {
        color: "black",
        fontFamily: "Comfortaa_400Regular",
        fontSize: 10,
    }
})

export default QuestionsSlider;
