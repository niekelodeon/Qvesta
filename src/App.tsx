import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import QuizPage from './pages/QuizPage'
import QuizMakerPage from './pages/QuizMakerPage'

import './index.css'

function App() {
    return (
        <>
            <Router>
                <div>
                    <nav>
                        <Link to="/Quiz">Quiz</Link>
                        <Link to="/QuizMaker">Quiz Maker</Link>
                    </nav>

                    <Routes>
                        <Route path="/Quiz" element={<QuizPage />} />
                        <Route path="/QuizMaker" element={<QuizMakerPage />} />
                    </Routes>
                </div>
            </Router>
        </>
    )
}

export default App
