import removeQuiz from '../../api/removeQuiz';
import './QuizListComp.scss'
import { useNavigate } from 'react-router';

interface Props {
    quiz: Quiz;
    own: boolean;
    updateQuizzes?: () => void;
}

interface Quiz {
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

function QuizListComp(props: Props) {
    const navigate = useNavigate()
    
    const quiz: Quiz = props.quiz

    function handleQuiz() {
        navigate('/quiz', { state: quiz })
    }

    function handleRemoveQuiz(props: Props) {
        removeQuiz(props.quiz)
        if (props.updateQuizzes) {
            props.updateQuizzes()
        }
    }
    
    return (
        <article>
            <h1>{ quiz.quizId }</h1>
            <p>Av: { quiz.username }</p>
            <button onClick={ handleQuiz }>Do the Quiz!</button>
            {props.own && <button onClick={ () => handleRemoveQuiz(props) }>Remove Quiz</button>}
        </article>
    )
}

export default QuizListComp