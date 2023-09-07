import './ChooseQuiz.scss'
import newQuiz from '../../api/newQuiz'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import getAllQuiz from '../../api/getAllQuiz'
import LogOut from '../../components/logOut/LogOut'

import QuizListComp from '../../components/QuizListComp/QuizListComp'
import { Quiz } from '../../interfaces'

interface newQuizData {
    success: boolean;
    quizId?: string;
    message?: string;
}



function ChooseQuiz() {
    const navigate = useNavigate()
    const location = useLocation()
    const [quizName, setQuizName] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string | null>()
    const [showQuizes, setShowQuizes] = useState<boolean>(false)
    const [showMyQuizes, setShowMyQuizes] = useState<boolean>(false)
    const [allQuizes, setAllQuizes] = useState<JSX.Element[]>()
    let showLoginElems: boolean = location.state
    const token = localStorage.getItem('token')

    if (token === '') {
        showLoginElems = false
    }

    async function handleNewQuiz() {
        const newQuizData: newQuizData = await newQuiz(quizName)
        console.log(newQuizData);
        if (newQuizData.success) {
            navigate('/createquiz', { state: newQuizData.quizId })
        } else {
            setErrorMsg(newQuizData.message)
        }
    }
    
    
    async function handleShowQuizes() {
        const quizes = await getAllQuiz()
        // 
        console.log(quizes);
        const quizComponent = quizes.quizzes.map((quiz: Quiz) => {
            const key = quiz.questions[0].location.latitude + quiz.questions[0].location.longitude + quiz.quizId + quiz.userId
            return <QuizListComp quiz={ quiz } own={ false } key={key}/>
        })
        console.log(quizes);
        
        setShowMyQuizes(false)
        setShowQuizes(true)
        setAllQuizes(quizComponent)
    }

    async function handleShowMyQuizes() {
        const quizes = await getAllQuiz()
        
        console.log(quizes);
        const username = localStorage.getItem('username')
        const myQuizes = quizes.quizzes.filter((quiz: Quiz) => {
            if (quiz.username === username) {
                return quiz
            }
        })
        
        const myQuizesShow = myQuizes.map((quiz: Quiz) => {
            const key = quiz.questions[0].location.latitude + quiz.questions[0].location.longitude + quiz.quizId + quiz.userId
            return <QuizListComp quiz={ quiz } own={ true } updateQuizzes={ handleShowMyQuizes } key={ key }/>
        })
        setShowQuizes(false)
        setShowMyQuizes(true)
        setAllQuizes(myQuizesShow)
    }
    
    
    
    return (
        <>
        <LogOut/>
        <div className='to-center'>
        <main className='choose-quiz'>
            { showLoginElems && <input type="text" placeholder='Name of your Quiz!' name='quizname' onChange={ e => setQuizName(e.target.value) } className='choose-quiz__input'/> }
            { showLoginElems && <button onClick={ handleNewQuiz } className='choose-quiz__button'>+ Create new Quiz</button> }
            {errorMsg && <p>{ errorMsg }</p>}
            <button className='choose-quiz__button' onClick={ handleShowQuizes }>Check out existing Quizes!</button>
            { showLoginElems && <button className='choose-quiz__button' onClick={ handleShowMyQuizes }>Check out my Quizes!</button> }
            {showQuizes && <section className='choose-quiz__quiz-box'>{ allQuizes }</section>}
            {showMyQuizes && <section className='choose-quiz__quiz-box'>{ allQuizes }</section>}
            
        </main>
        
        </div>
        </>
    )
}

export default ChooseQuiz