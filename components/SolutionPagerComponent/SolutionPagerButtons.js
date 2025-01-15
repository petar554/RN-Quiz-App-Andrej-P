/* GLAVNE REACT/REACT NATIVE BIBLIOTEKE */
import { View, Pressable, StyleSheet, Text } from 'react-native';

/* EXPO-SPECIFIC BIBLIOTEKE */
import Ionicons from '@expo/vector-icons/Ionicons';

const SolutionPagerButtons = ({
    currentPage,
    totalPages,
    onPageChange,
    colorScheme
}) => {
    // Provjerava moze li se ici nazad ili naprijed, 
    // ovisno o stranici na kojoj se korisnik nalazi
    const isForwardDisabled = currentPage === totalPages - 1
    const isBackDisabled = currentPage === 0

    // Handlerske funkcije za kretanje izmedju stranica
    const goForward = () => {
        onPageChange(currentPage + 1)
    }

    const goBack = () => {
        onPageChange(currentPage - 1)
    }

    return (
        <View style={styles.container}>
            <Pressable
                onPress={goBack}
                disabled={isBackDisabled}>
                    <Ionicons name="chevron-back" size={24} color={isBackDisabled ? colorScheme.disabled : colorScheme.dark} />
            </Pressable>

            <Text style={{ color: colorScheme.dark }}>{`${currentPage + 1} / ${totalPages}`}</Text>

            <Pressable
                onPress={goForward}
                disabled={isForwardDisabled}>
                    <Ionicons name="chevron-forward" size={24} color={isForwardDisabled ? colorScheme.disabled : colorScheme.dark}
                />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
});

export default SolutionPagerButtons;
