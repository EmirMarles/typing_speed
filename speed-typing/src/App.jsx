import { useEffect, useState } from 'react'
import './App.css'
import { HomePage } from '../pages/HomePage'
import { TestComplete } from '../pages/TestComplete'
import { Routes, Route } from 'react-router'
import data from '../typing-speed-test-main/data.json'
import { chooseRandomText } from '../utils/chooseRandomText'
import { useNavigate } from 'react-router'

function App() {
  const [difficulty, setDifficulty] = useState(() => {
    const localDiff = JSON.parse(localStorage.getItem('difficulty'))
    return localDiff !== null ? localDiff : null
  })
  const [mode, setMode] = useState(() => {
    const localMode = JSON.parse(localStorage.getItem('mode'))
    return localMode !== null ? localMode : null
  })
  const [personalResults, setPersonalResults] = useState(() => {
    const localRes = JSON.parse(localStorage.getItem('personal-results'))
    return localRes !== null ? localRes : null
  })
  const firstText = data.easy[0].text
  const [text, setText] = useState(() => {
    const localText = localStorage.getItem('text')
    return localText !== null ? JSON.parse(localText) : firstText
  })
  const [testIsFinished, setTestIsFinished] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [wpm, setWpm] = useState(0)

  const [mainTimer, setMainTimer] = useState(60)

  const [correctChars, setCorrectChars] = useState(0)

  const navigate = useNavigate()

  // saving data to local storage for future access //

  // when chaning difficulty - the text on the screen should change

  useEffect(() => {
    if (mode === null) return
    localStorage.setItem('mode', JSON.stringify(mode))
  }, [mode])

  useEffect(() => {
    if (difficulty === null) return
    localStorage.setItem('difficulty', JSON.stringify(difficulty))
  }, [difficulty])

  // choosing random text when difficulty is chosen

  useEffect(() => {
    // every rerender - the text is being chosen again and again
    const setInitialText = () => {
      const text = chooseRandomText(data, difficulty)
      if (text !== null) {
        let splitText = text.split("")
        setText(splitText)
      }
      else {
        let splitText = firstText.split("")
        setText(splitText)
      }
    }
    if (difficulty !== null) {
      setInitialText();
    }
  }, [difficulty, firstText])

  useEffect(() => {
    localStorage.setItem('text', JSON.stringify(text))
  }, [text])

  useEffect(() => {
    if (testIsFinished === false) return
    else navigate('/test-results', {
      state: {
        wpm: wpm,
        accuracy : correctChars,
        res : personalResults
      }
    })
  }, [testIsFinished, navigate, wpm, correctChars, personalResults])

  return (
    <Routes>
      <Route path="/" element={<HomePage
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        mode={mode}
        setMode={setMode}
        personalResults={personalResults}
        setPersonalResults={setPersonalResults}
        text={text}
        setText={setText}
        testIsFinished={testIsFinished}
        setTestIsFinished={setTestIsFinished}
        isStarted={isStarted}
        setIsStarted={setIsStarted}
        wpm={wpm}
        setWpm={setWpm}
        mainTimer={mainTimer}
        setMainTimer={setMainTimer}
        correctChars={correctChars}
        setCorrectChars={setCorrectChars}
      ></ HomePage>}></Route>
      <Route path="/test-results" element={<TestComplete />}></Route>
    </Routes>
  )
}

export default App
