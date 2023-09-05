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
    const [showMyQuizes, setShowMyQuizes] = useState<boolean>(false)
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
            return <QuizListComp quiz={ quiz } own={ false }/>
        })
        setShowMyQuizes(false)
        setShowQuizes(true)
        setAllQuizes(anotherQuiz)
    }

    async function handleShowMyQuizes() {
        const quizes = await getAllQuiz()
        // 
        console.log(quizes);
        const username = localStorage.getItem('username')
        const myQuizes = quizes.quizzes.filter((quiz: QuizList) => {
            console.log(quiz);
            
            if (quiz.username === username) {
                return quiz
            }
        })
        
        const myQuizesShow = myQuizes.map((quiz: QuizList) => {
            return <QuizListComp quiz={ quiz } own={ true } updateQuizzes={ handleShowMyQuizes }/>
        })
        setShowQuizes(false)
        setShowMyQuizes(true)
        setAllQuizes(myQuizesShow)
    }
    
    
    
    return (
        <div>
        <main className='choose-quiz'>
            <input type="text" placeholder='Name of your Quiz!' name='quizname' onChange={ e => setQuizName(e.target.value) } className='choose-quiz__input'/>
            <button onClick={ handleNewQuiz } className='choose-quiz__button'>+ Create new Quiz</button>
            {errorMsg && <p>{ errorMsg }</p>}
            <button className='choose-quiz__button' onClick={ handleShowQuizes }>Check out existing Quizes!</button>
            <button className='choose-quiz__button' onClick={ handleShowMyQuizes }>Check out my Quizes!</button>
            
            
        </main>
        {showQuizes && <section>{ allQuizes }</section>}
            {showMyQuizes && <section>{ allQuizes }</section>}
        </div>
    )
}

export default ChooseQuiz