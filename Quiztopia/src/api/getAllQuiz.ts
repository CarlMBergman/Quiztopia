
async function getAllQuiz() {
    const ALLQUIZ_URL = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz'

    const response = await fetch(ALLQUIZ_URL)
    const data = await response.json()
    console.log(data);
    return data
}

export default getAllQuiz