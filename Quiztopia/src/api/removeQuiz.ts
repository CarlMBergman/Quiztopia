interface Quiz {
    questions: Question[];
    quizId: string;
    userId: string;
    username: string;
}

interface Question {
    question: string;
    anwser: string;
    location: Location;
}

interface Location {
    latitude: string;
    longitude: string;
}

async function removeQuiz(quiz: Quiz) {
    const REMOVE_URL = `https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/${quiz.quizId}`

    const token = localStorage.getItem('token')

    const response = await fetch(REMOVE_URL, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await response.json()
    console.log(data);
    

}

export default removeQuiz