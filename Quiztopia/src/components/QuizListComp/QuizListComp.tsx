import './QuizListComp.scss'

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
    const quiz: Props = props
    return (
        <article>
            <h1>{ quiz.quizId }</h1>
            <p>Av: { quiz.username }</p>
            <button>Do the Quiz!</button>
        </article>
    )
}

export default QuizListComp