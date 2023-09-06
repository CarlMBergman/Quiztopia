
async function newQuiz(name: string) {
    const NEWQUIZ_URL = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz'
    const token: string | null = localStorage.getItem('token')
    
    const response = await fetch(NEWQUIZ_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: name
        })
    })
    const data = await response.json()
    return data
}

export default newQuiz