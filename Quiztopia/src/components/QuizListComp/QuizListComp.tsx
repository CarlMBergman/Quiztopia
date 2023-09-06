import removeQuiz from '../../api/removeQuiz';
import './QuizListComp.scss'
import { useNavigate } from 'react-router';
import { Quiz } from '../../interfaces';

interface Props {
    quiz: Quiz;
    own: boolean;
    updateQuizzes?: () => void;
}



function QuizListComp(props: Props) {
    const navigate = useNavigate()
    const quiz: Quiz = props.quiz
    const isItANum = +quiz.questions[0].location.latitude

    function handleQuiz() {
        if (isNaN(isItANum)) {
            window.alert('nej!!')
        } else {
            navigate('/quiz', { state: quiz })
        }
        
    }

    async function handleRemoveQuiz(props: Props) {
        await removeQuiz(props.quiz)
        if (props.updateQuizzes) {
            props.updateQuizzes()
        }
    }
    
    return (
        <article className='quiz-list'>
            <h1>{ quiz.quizId }</h1>
            <p>Av: { quiz.username }</p>
            <button onClick={ handleQuiz } className='quiz-list__button'>Do the Quiz!</button>
            {props.own && <button onClick={ () => handleRemoveQuiz(props) } className='quiz-list__button'>Remove Quiz</button>}
        </article>
    )
}

export default QuizListComp