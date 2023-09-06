import { QuizArray } from "../interfaces";


async function getAllQuiz() {
    const ALLQUIZ_URL = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz'

    const response = await fetch(ALLQUIZ_URL)
    const data: QuizArray = await response.json()
    return data
}

export default getAllQuiz