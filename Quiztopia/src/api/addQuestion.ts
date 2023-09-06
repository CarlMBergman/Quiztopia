

async function addQuestion(quizName: string, question: string, answer: string, lat: number, lng: number) {
    const NEWQUESTION_URL = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/question'
    const token: string | null = localStorage.getItem('token')


    const latString: string = lat.toString()
    const lngString: string = lng.toString()

    const response = await fetch(NEWQUESTION_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: quizName,
            question: question,
            answer: answer,
            location: {
                longitude: lngString,
                latitude: latString
            }
        })
    })
    const data = await response.json()
    return data
}

export default addQuestion