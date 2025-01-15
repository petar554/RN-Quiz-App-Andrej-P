
/* GLAVNE REACT/REACT NATIVE BIBLIOTEKE */
import { useEffect, useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";

/* GLOBALNI STILOVI I PODACI */
import { styles } from "./styles";
import { questions } from "./data/questions";

/* EXPO-SPECIFIC BIBLIOTEKE */
import { StatusBar } from "expo-status-bar";
import Ionicons from '@expo/vector-icons/Ionicons';

/* EKRANI */
import Lobby from "./screens/Lobby";
import Quiz from "./screens/Quiz";

/* KOMPONENTE */
import SettingsCard from "./components/SettingsCard";

const Main = () => {
    /* STANJA ZA GLAVNI EKRAN */
    const [startGame, setStartGame] = useState(false);                      // Glavni flag za pocetak/kraj igre
    const [players, setPlayers] = useState([])                              // Stanje za sve igrace
    const [playerSettings, setPlayerSettings] = useState(false)             // Za otvaranje igracih postavki

    const [screens, setScreens] = useState(1);                              // Broj ekrana/igraca za generiranje UI-ja
    const [roundEndMs, setRoundEndMs] = useState(30000)                     // Broj sekundi za zavrsetak pregleda rezultata (ostavlja mogucnost prosirenja u postavke)

    const [questionsPerQuiz, setQuestionsPerQuiz] = useState(4)
    const [currentQuestions, setCurrentQuestions] = useState(Array(4).fill(0));         // Trenutna pitanja za svaki od cetiri moguca ekrana
    const [answeredCount, setAnsweredCount] = useState(Array(4).fill(0));               // Koliko je pitanja odgovoreno po svakom mogucem ekranu
    const [completedScreens, setCompletedScreens] = useState(Array(4).fill(false));     // Koliko je ekrana zavrsilo svoju rundu
    const [allScreensCompleted, setAllScreensCompleted] = useState(false);              // Jesu li svi ekrani zavrsili

    /* FUNKCIJE GLAVNOG EKRANA */

    /**
     * Služi za resetiranje glavnih postavki na zadane vrijednosti.
     */
    const resetValues = () => {
        setAnsweredCount(Array(4).fill(0));         // Postavlja broj odgovorenih pitanja za svaki ekran
        setCompletedScreens(Array(4).fill(false));  // Postavlja ekrane koji su zavrsili kviz
        setAllScreensCompleted(false);              // Postavi flag da su svi ekrani zavrsili na
        setPlayerSettings(false)                    // Postavlja izbornik sa postavkama na stanje "zatvoreno"
        setPlayers(initializePlayers())             // Inicijalizira objekt igraca 
        setStartGame(false)                         // Postavlja pocetno stanje/odredjuje zavrsetak igre
        setCurrentQuestions(Array.from({ length: 4 }, () => Math.floor(Math.random() * questions.length))) // Inicijalizacija nasumičnih pitanja za svaki ekran
    }

    /**
     * Callback funkcija koja definira sto ce se desiti jednom kad countdown timer dosegne 00:00.
     */
    const onTimerCompleted = () => {
        // Ako je vrijeme isteklo, a postoji jos igraca koji nisu zavrsili sva svoja pitanja,
        // tada svakako postavlja sve ekrane na zavrseno stanje - nakon kratkog timeout perioda
        // za pregled ocjena i statistike, resetira sve vrijednosti na zadano stanje
        if (!allScreensCompleted) {
            setCompletedScreens(Array(4).fill(true))
            setAllScreensCompleted(true)
        }
    }

    /**
     * Callback funkcija za dugme povratka koja resetira sve vrijednosti na zadano.
     */
    const onBackButtonPressed = () => {
        resetValues()
    }

    useEffect(() => {
        setAnsweredCount(Array(4).fill(0));
        setCompletedScreens(Array(4).fill(false));
        setAllScreensCompleted(false);
        setPlayers(initializePlayers())

        setCurrentQuestions(Array.from({ length: 4 }, () => Math.floor(Math.random() * questions.length)))
    }, [screens]);

    /**
     * Postavlja inicijalno stanje polja igraca. Svaki igrac ima svoj ID, 
     * ime (name), odgovore na pitanja (answers) te broj bodova (score).
     */
    const initializePlayers = () => {
        return Array(screens)
            .fill({ id: 0, name: "", score: 0, answers: [] })
            .map((player, index) => ({ ...player, id: index + 1 }))
    }

    /**
     * Handler funkcija za azuriranje imena igraca.
     * @param playerId ID igraca.
     * @param newName Novo ime za igrača.
     */
    const handlePlayerNameUpdate = (playerId, newName) => {
        setPlayers(players.map(player => player.id === playerId ? { ...player, name: newName } : player))
    }

    /**
     * Handler funkcija za azuriranje odabira igraca, koja azurira rezultat za tog igraca ukoliko se njegov odabir podudara s tocnim odgovorom.
     * @param choice Igracev odgovor.
     * @param playerId Igracev ID.
     * @param question Pitanje na koje je igrac odgovorio.
     */
    const handlePlayerChoiceSelect = (choice, playerId, question) => {
        let shouldUpdateScore = (choice === question.correct)

        setPlayers(players.map(player => player.id === playerId ?
            {
                ...player,
                score: shouldUpdateScore ? player.score + 1 : player.score,
                // Ovim se postavljaju informacije na sto je tocno igrac  
                // odgovorio, koji je bio njegov odgovor i je li taj odgovor tocan
                answers: [...player.answers, {
                    question: question.text,
                    correctAnswer: question.correct,
                    playerAnswer: choice,
                    isCorrect: choice === question.correct
                }]
            } : player))
    }

    /**
     * Sluzi za otvaranje i zatvaranje postavki za igru.
     */
    const openPlayerSettings = () => {
        setPlayerSettings(prev => !prev)
    }

    /**
     * Generira nova pitanja za svaki ekran koji odgovori na prethodno.
     * @param previousState Prethodna vrijednost polja.
     * @param screenIndex Na kojem ekranu se dogodio odabir na pitanje.
     */
    const generateNewQuestions = (previousState, screenIndex) => {
        const newQuestions = [...previousState];
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * questions.length);
        } while (newIndex === previousState[screenIndex]); // Osigurava da svako iduce pitanje bude razlicito od prethodnog
        newQuestions[screenIndex] = newIndex;
        return newQuestions;
    }

    /**
     * Azurira stanja odgovorenih pitanja za svaki postojeci ekran.
     * @param previousState Prethodna vrijednost polja.
     * @param screenIndex Na kojem ekranu se dogodio odabir na pitanje.
     * @param questionsPerQuiz Broj pitanja koji je definiran po igri.
     */
    const updateAnsweredQuestions = (previousState, screenIndex, questionsPerQuiz) => {
        const newAnsweredCount = [...previousState];
        newAnsweredCount[screenIndex] += 1;

        // Ako su sva pitanja za jedan ekran rijesena, oznaci ekran
        // tog igraca kao zavrsen ekran
        if (newAnsweredCount[screenIndex] >= questionsPerQuiz) {
            setCompletedScreens((previousState) => {
                const newCompletedScreens = [...previousState];
                newCompletedScreens[screenIndex] = true;
                return newCompletedScreens;
            });

            // Ukoliko su svi igraci dosli do kraja (odgovorili su na sva pitanja sa svojih ekrana),
            // oznaci sve ekrane kao zavrsene ekrane (i prikazuj prikladan UI)
            const activeScreens = newAnsweredCount.slice(0, screens);
            if (activeScreens.every((count) => count >= questionsPerQuiz)) {
                setAllScreensCompleted(true);
                setTimeout(() => {
                    // Definira odredjeni vremenski period u kojem se moze pregledati statistika,
                    // a potom zavrsava igru/kviz
                    resetValues()
                }, roundEndMs);
            }
        }
        return newAnsweredCount;
    }

    /**
     * Handler funkcija za pracenje odabira na ekranu.
     * @param screenIndex Na kojem ekranu se dogodio odabir.
     */
    const handleChoiceSelect = (screenIndex) => {
        setAnsweredCount((prev) => updateAnsweredQuestions(prev, screenIndex, questionsPerQuiz));
        setCurrentQuestions((prev) => generateNewQuestions(prev, screenIndex));
    };


    return (
        <View style={mainStyle.mainContainer}>

            {!startGame ?
                <>
                    {playerSettings && <SettingsCard
                        screens={screens}
                        questionsPerQuiz={questionsPerQuiz}
                        setScreens={setScreens}
                        setQuestionsPerQuiz={setQuestionsPerQuiz} />}

                    <Lobby
                        players={players}
                        canContinueToQuiz={players.filter(player => player.name === "").length === 0}
                        handlePlayerNameUpdate={(id, name) => handlePlayerNameUpdate(id, name)}
                        setStartGame={() => setStartGame(true)}
                    />

                    <Pressable
                        style={{ ...styles.button, ...mainStyle.settingsButton, backgroundColor: "white" }}
                        onPress={() => {
                            openPlayerSettings()
                        }}>
                        <Ionicons name='settings-outline' size={28} color={"black"} />
                    </Pressable>
                </>

                : <>
                    <Quiz
                        screens={screens}
                        questions={questions}
                        players={players}
                        questionsPerQuiz={questionsPerQuiz}
                        currentQuestions={currentQuestions}
                        handleChoiceSelect={handleChoiceSelect}
                        handlePlayerChoiceSelect={handlePlayerChoiceSelect}
                        answeredCount={answeredCount}
                        completedScreens={completedScreens}
                        allScreensCompleted={allScreensCompleted}
                        roundEndMs={roundEndMs}
                        onTimerCompleted={onTimerCompleted}
                    />

                    {allScreensCompleted && <Pressable
                        style={{ ...styles.button, ...styles.hover, backgroundColor: "white" }}
                        onPress={onBackButtonPressed}>
                        <Ionicons name='return-up-back' size={28} color={"black"} />
                    </Pressable>}
                </>
            }

            <StatusBar hidden />
        </View>
    );
};

export const mainStyle = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center"
    },

    settingsButton: {
        position: "absolute",
        top: "6%",
        left: "4%",
        paddingVertical: 12,
        paddingHorizontal: 12,
    },
})

export default Main;




