
/* GLAVNE REACT/REACT NATIVE BIBLIOTEKE */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SimpleRow = ({ title, value, colorScheme, numberOfLines }) => {
    return (
        <View style={styles.row}>
            <Text style={{ ...styles.titleText, color: colorScheme.accent }}>
                {title}
            </Text>
            <Text
                numberOfLines={numberOfLines}
                ellipsizeMode="tail"
                style={{ ...styles.valueText, color: colorScheme.dark }}>
                {value}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexWrap: "wrap",
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
    },
    titleText: {
        fontFamily: 'Comfortaa_700Bold',
        fontSize: 11,
    },
    valueText: {
        fontFamily: 'Comfortaa_400Regular',
        fontSize: 11,
    }
});

export default SimpleRow;
