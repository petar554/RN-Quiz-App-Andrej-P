/* GLAVNE REACT/REACT NATIVE BIBLIOTEKE */
import { View, Text, StyleSheet } from 'react-native';

/* REACT NATIVE COMMUNITY BIBLIOTEKE */
import Slider from '@react-native-community/slider';

/* GLOBALNI STILOVI */
import { cardColors } from '../styles';

const PlayerSlider = ({ screens, setScreens }) => {
    return (
        <View style={playerSliderStyle.container}>
            <Text style={playerSliderStyle.text}>{screens} igrač/a</Text>

             {/* https://docs.expo.dev/versions/latest/sdk/slider/ */}
            <Slider
                value={screens}
                style={playerSliderStyle.slider}
                minimumValue={1}
                maximumValue={4}
                minimumTrackTintColor={cardColors[0].accent}
                maximumTrackTintColor={cardColors[1].accent}
                thumbTintColor={cardColors[0].accent}
                step={1}
                onValueChange={setScreens}
            />
        </View>
    );
}

const playerSliderStyle = StyleSheet.create({
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

export default PlayerSlider;
