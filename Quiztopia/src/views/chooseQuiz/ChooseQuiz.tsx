import './ChooseQuiz.scss'
import newQuiz from '../../api/newQuiz'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import getAllQuiz from '../../api/getAllQuiz'

import QuizListComp from '../../components/QuizListComp/QuizListComp'

interface newQuizData {
    success: boolean;
    quizId?: string;
    message?: string;
}

interface QuizList {
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

function ChooseQuiz() {
    const navigate = useNavigate()
    const [quizName, setQuizName] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string | null>()
    const [showQuizes, setShowQuizes] = useState<boolean>(false)
    const [allQuizes, setAllQuizes] = useState<any>()

    async function handleNewQuiz() {
        const newQuizData: newQuizData = await newQuiz(quizName)
        console.log(newQuizData);
        if (newQuizData.success) {
            navigate('/createquiz', { state: newQuizData })
        } else {
            setErrorMsg(newQuizData.message)
        }
    }
    
    
    async function handleShowQuizes() {
        const quizes = await getAllQuiz()
        // 
        console.log(quizes);
        const anotherQuiz = quizes.quizzes.map((quiz: QuizList) => {
            return <QuizListComp quiz={ quiz } />
        })
        setShowQuizes(true)
        setAllQuizes(anotherQuiz)
    }
    
    
    
    return (
        <main className='choose-quiz'>
            <input type="text" placeholder='Name of your Quiz!' name='quizname' onChange={ e => setQuizName(e.target.value) } className='choose-quiz__input'/>
            <button onClick={ handleNewQuiz } className='choose-quiz__button'>+ Create new Quiz</button>
            {errorMsg && <p>{ errorMsg }</p>}
            <button className='choose-quiz__button' onClick={ handleShowQuizes }>Check out existing Quizes!</button>
            {showQuizes && <section>{ allQuizes }</section>}
        </main>
    )
}

export default ChooseQuiz