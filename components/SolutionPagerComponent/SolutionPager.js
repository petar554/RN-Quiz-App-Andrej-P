import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';

/* KOMPONENTE */
import SolutionPagerButtons from './SolutionPagerButtons';
import SimpleRow from '../SimpleRow';

const SolutionPager = ({ answered, colorScheme }) => {
    const [solutions, setSolutions] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 1;

    useEffect(() => {
        setSolutions([answered[currentPage]]);
        setTotalPages(answered.length / itemsPerPage);
    }, [currentPage]);

    const handlePageClick = (p) => setCurrentPage(p);

    const renderItem = ({ item }) => {
        const answerColorScheme = {
            accent: item.isCorrect ? "green" : "red",
            dark: item.isCorrect ? "green" : "red",
        };

        return (
            <View>
                <SimpleRow
                    title="Pitanje: "
                    value={item.question}
                    colorScheme={colorScheme}
                    numberOfLines={2}
                />
                <SimpleRow
                    title="Točan odgovor: "
                    value={item.correctAnswer}
                    colorScheme={colorScheme}
                    numberOfLines={1}
                />
                <SimpleRow
                    title="Igračev odgovor: "
                    value={item.playerAnswer}
                    colorScheme={answerColorScheme} // Boja odgovora
                    numberOfLines={1}
                />
                <SimpleRow
                    title="Točno: "
                    value={item.isCorrect ? "Da" : "Ne"}
                    colorScheme={answerColorScheme} // Ista boja kao odgovor
                    numberOfLines={1}
                />
            </View>
        );
    };

    return (
        <View>
            <FlatList
                data={solutions}
                renderItem={renderItem}
                windowSize={10}
            />
            <SolutionPagerButtons
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageClick}
                colorScheme={colorScheme}
            />
        </View>
    );
};

export default SolutionPager;
