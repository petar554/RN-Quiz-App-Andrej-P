import { database } from './firebaseConfig.js';
import { ref, set } from 'firebase/database';

const questions = [
    {
        text: "Koji je točan oblik pridjeva u rečenici: 'Ona je kupila ___ haljinu.'?",
        choices: ["ljep", "lijepa", "lijepu", "lijepo"],
        correct: "lijepu",
    },
    // TODO: add more data
];

const uploadQuestions = async () => {
    try {
        const questionsRef = ref(database, 'questions');
        await set(questionsRef, questions);
        console.log("Questions uploaded successfully!");
    } catch (error) {
        console.error("Error uploading questions:", error);
    }
};

uploadQuestions();
