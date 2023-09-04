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
    async function handleAddQuestion() {
        addQuestion(props.quizName, question, answer, props.lat, props.lng)
        setQuestion('')
        setAnswer('')
    }

    return (
        <article className="add-question">
            <input type="text" value={ question } placeholder="Question" onChange={ e => setQuestion(e.target.value)}/>
            <input type="text" value={ answer } placeholder="Answer" onChange={ e => setAnswer(e.target.value)}/>
            <button onClick={ handleAddQuestion }>Add Question!</button>
        </article>
    )
}

export default AddQuestionComp