import './AddQuestionComp.scss'
import addQuestion from '../../api/addQuestion'
import { useState } from 'react'

function AddQuestionComp(props) {
    const [question, setQuestion] = useState<string>()
    const [anwser, setAnwser] = useState<string>()
    async function handleAddQuestion() {
        addQuestion()
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