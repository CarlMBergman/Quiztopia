import './ChooseQuiz.scss'
import newQuiz from '../../api/newQuiz'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface newQuizData {
    success: boolean;
    quizId?: string;
    message?: string;
}

function ChooseQuiz() {
    const navigate = useNavigate()
    const [quizName, setQuizName] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string | null>()

    async function handleNewQuiz() {
        const newQuizData: newQuizData = await newQuiz(quizName)
        console.log(newQuizData);
        if (newQuizData.success) {
            navigate('/createquiz', { state: newQuizData })
        } else {
            setErrorMsg(newQuizData.message)
        }
    }

    return (
        <main className='choose-quiz'>
            <input type="text" placeholder='Name of your Quiz!' name='quizname' onChange={ e => setQuizName(e.target.value) } className='choose-quiz__input'/>
            <button onClick={ handleNewQuiz } className='choose-quiz__button'>+ Create new Quiz</button>
            {errorMsg ? <p>{ errorMsg }</p> : null}
            <button className='choose-quiz__button'>Check out existing Quizes!</button>
        </main>
    )
}

export default ChooseQuiz