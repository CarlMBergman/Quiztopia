

async function addQuestion(quizName: string, question: string, anwser: string, lat: string, lng: string) {
    const NEWQUESTION_URL = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/question'
    const token: string | null = localStorage.getItem('token')

    const response = await fetch(NEWQUESTION_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            quizId: quizName,
            question: question,
            anwser: anwser,
            location: {
                longitude: lng,
                latitude: lat
            }
        })
    })
    const data = await response.json()
    console.log(data);
    return data
}

export default addQuestion