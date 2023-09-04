import './AddQuestionComp.scss'
import addQuestion from '../../api/addQuestion'
import { useState } from 'react'

interface Props {
    quizName: string,
    lat: number,
    lng: number
}

function AddQuestionComp(props: Props) {
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string | null>()
    async function handleAddQuestion() {
        if (props.lat === 0) {
            setErrorMsg('Set out the position for your question!')
        } else if (question === '') {
            setErrorMsg('Write a question!')
        } else if (answer === '') {
            setErrorMsg('Give us an answer!')
        } else {
            addQuestion(props.quizName, question, answer, props.lat, props.lng)
            setQuestion('')
            setAnswer('')
            setErrorMsg(null)
        }
        
    }

    return (
        <article className="add-question">
            <input
             type="text"
             className="add-question__input"
             value={ question }
             placeholder="Question"
             onChange={ e => setQuestion(e.target.value)}/>
            <input 
             type="text" 
             className="add-question__input" 
             value={ answer } 
             placeholder="Answer" 
             onChange={ e => setAnswer(e.target.value)}/>
            <button className="add-question__button" onClick={ handleAddQuestion }>Add Question!</button>
            {errorMsg && <p className='add-question__error'>{errorMsg}</p>}
        </article>
    )
}

export default AddQuestionComp