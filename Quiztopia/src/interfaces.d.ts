interface QuizArray {
    success: boolean;
    quizzes: Quiz[];
    message?: string;
}

interface Quiz {
    questions: Question[];
    quizId: string;
    userId: string;
    username: string;
}

interface Question {
    answer: string;
    question: string;
    location: Coords;
}

interface Coords {
    latitude: string;
    longitude: string;
}

interface PropsAddQuestionComp {
    quizName: string;
    lat: number;
    lng: number;
    setCurrentQuestions: (question: Question[]) => void;
}

interface PropsForMapbox {
    lat: number;
    lng: number;
    setLat: (lat: number) => void;
    setLng: (lng: number) => void;
    quizName: string;
}

interface PropsForMapboxQuiz {
    quiz: Quiz;
    lat: number;
    lng: number;
    setLat: (lat: number) => void;
    setLng: (lng: number) => void;
}

interface Login {
    success: boolean;
    token?: string;
    message?: string;
}

interface AddQuestionData {
    success: boolean;
    quiz?: AddQuestionDataQuiz;
    message?: string;
}

interface AddQuestionDataQuiz {
    Attributes: AttributesAdd
}

interface AttributesAdd {
    questions: Question[];
    quizId: string;
    userId: string;
    username: string;
}

interface signupData {
    success: boolean;
    message?: string
}

interface loginData {
    success: boolean;
    token?: string;
    message?: string;
}

interface QuizListProps {
    quiz: Quiz;
    own: boolean;
    updateQuizzes?: () => void;
}

export { Quiz, PropsAddQuestionComp, PropsForMapbox, PropsForMapboxQuiz, QuizArray, Question, AddQuestionData, signupData, loginData, QuizListProps }