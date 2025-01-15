/* GLAVNE REACT/REACT NATIVE BIBLIOTEKE */
import React, { useState } from "react";
import { View } from "react-native";

/* GLOBALNI STILOVI */
import { styles, cardColors } from "../styles";

/* CUSTOM REACT HOOKOVI */
import useTimer from "../hooks/useTimer"

/* KOMPONENTE */
import QuizCard from "../components/QuizCard"
import ResultsCard from "../components/ResultsCard";

const Quiz = ({
  screens,
  players,
  questions,
  currentQuestions,
  questionsPerQuiz,
  handleChoiceSelect,
  handlePlayerChoiceSelect,
  completedScreens,
  allScreensCompleted,
  onTimerCompleted
}) => {
  const rows = [0, 2]

  const [cardRotations, setCardRotations] = useState(Array(screens)
    .fill({ screenIndex: 0, degrees: 0 })
    .map((degree, index) => ({ ...degree, screenIndex: index })))

  const rememberCardRotation = (index, degrees) => {
    setCardRotations(cardRotations.map(rotation => rotation.screenIndex === index ? { ...rotation, degrees: degrees } : rotation))
  }

  // Za pokretanje countdown timera, gdje je inicijalno vrijeme
  // 1000 milisekundi, pomnozeno sa 60 (1 minuta), pomnozeno sa 10 (10 minuta),
  // te se poziva handlerska funkcija iz Main ekrana
  const timeLeft = useTimer({
    initialTime: Date.now() + 1000  * 60 * 10,
    onComplete: onTimerCompleted
  })

  return (
    <>
      {rows.map((row) => {
        return (
          screens > row && (
            <View key={row} style={styles.row}>
              {[row, row + 1].map((col) => (
                screens >= col + 1 && (
                  <View
                    key={col}
                    style={{
                      ...styles.screen,
                      backgroundColor: cardColors[col % cardColors.length].light,
                      borderBottomWidth: 3,
                      borderRightWidth: 3,
                      borderLeftWidth: 1,
                      borderBottomColor: cardColors[col % cardColors.length].accent,
                      borderRightColor: cardColors[col % cardColors.length].accent,
                      borderLeftColor: cardColors[col % cardColors.length].accent
                    }}>

                    {!completedScreens[col] ? (
                      <QuizCard
                        screenCount={screens}
                        player={players[col]}
                        questionIndex={col}
                        question={questions[currentQuestions[col]]}
                        handleChoiceSelect={() => handleChoiceSelect(col)}
                        handlePlayerChoiceSelect={(question, choice, playerId) => handlePlayerChoiceSelect(choice, playerId, question)}
                        cardColor={cardColors[col % cardColors.length]}
                        rememberCardRotation={(index, rotation) => rememberCardRotation(index, rotation)}
                        timeLeft={timeLeft}
                      />
                    ) : (<>
                      <ResultsCard
                        questionIndex={col}
                        screenCount={screens}
                        totalQuestions={questionsPerQuiz}
                        player={players[col]}
                        colorScheme={cardColors[col % cardColors.length]}
                        cardRotation={cardRotations[col]}
                        areAllScreensCompleted={allScreensCompleted} />
                    </>)

                    }
                  </View>
                )
              ))}
            </View>
          )
        );
      })}
    </>
  );
};

export default Quiz;


