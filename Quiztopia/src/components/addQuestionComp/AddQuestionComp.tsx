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
    const [anwser, setAnwser] = useState<string>('')
    async function handleAddQuestion() {
        addQuestion(props.quizName, question, anwser, props.lat, props.lng)
    }

    return (
        <article className="add-question">
            <input type="text" placeholder="Question" onChange={ e => setQuestion(e.target.value)}/>
            <input type="text" placeholder="Anwser" onChange={ e => setAnwser(e.target.value)}/>
            <button onClick={ handleAddQuestion }>Add Question!</button>
        </article>
    )
}

export default AddQuestionComp