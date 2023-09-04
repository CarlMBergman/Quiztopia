import './QuizListComp.scss'
import { useNavigate } from 'react-router';

interface Props {
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

function QuizListComp(props: any) {
    const navigate = useNavigate()
    
    const quiz: Props = props.quiz

    function handleQuiz() {
        navigate('/quiz', { state: quiz })
    }
    
    return (
        <article>
            <h1>{ quiz.quizId }</h1>
            <p>Av: { quiz.username }</p>
            <button onClick={ handleQuiz }>Do the Quiz!</button>
        </article>
    )
}

export default QuizListComp