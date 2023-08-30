import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './views/login/Login'
import ChooseQuiz from './views/chooseQuiz/ChooseQuiz'
import Quiz from './views/quiz/Quiz'
import CreateQuiz from './views/createQuiz/CreateQuiz'
import Header from './components/header/Header'
import './App.scss'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login/>
    },
    {
      path: '/choosequiz',
      element: <ChooseQuiz/>
    },
    {
      path: '/quiz',
      element: <Quiz/>
    },
    {
      path: '/createquiz',
      element: <CreateQuiz/>
    }
  ])

  return (
    <div className='App'>
      <Header/>
      <RouterProvider router={ router } />
    </div>
  )
}

export default App
