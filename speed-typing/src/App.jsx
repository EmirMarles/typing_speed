import { useEffect, useState } from 'react'
import './App.css'
import { HomePage } from '../pages/HomePage'
import { TestComplete } from '../pages/TestComplete'
import { Routes, Route } from 'react-router'
import data from '../typing-speed-test-main/data.json'
import { chooseRandomText } from '../utils/chooseRandomText'
import { useNavigate } from 'react-router'
import { compareRecords } from '../utils/algorithms'

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
  const [record, setRecord] = useState(() => {
    const localRecord = localStorage.getItem('record')
    return localRecord !== null ? JSON.parse(localRecord) : 0
  })

  const [isNewRecord, setIsNewRecord] = useState(false)
  const [firstTest, setFirstTest] = useState(() => {
    const bool = localStorage.getItem('firstTimeBool')
    return bool !== null ? JSON.parse(bool) : true
  })
  const navigate = useNavigate()


  useEffect(() => {
    if (mode === null) return
    localStorage.setItem('mode', JSON.stringify(mode))
  }, [mode])

  useEffect(() => {
    if (difficulty === null) return
    localStorage.setItem('difficulty', JSON.stringify(difficulty))
  }, [difficulty])

  // RANDOM TEXT CHOOSING WHEN DIFF IS CHOSEN

  useEffect(() => {
    const setInitialText = () => {
      const text = chooseRandomText(data, difficulty)
      if (text !== null) {
        // let splitText = text.split("")
        setText(text)
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

  // CHANGING THE PAGE TO TEST-RESULTS WHEN THE TEST IS FINISHED //

  useEffect(() => {
    if (testIsFinished === false) return
    else {
      const setNewRec = (wpm) => {
        setRecord(wpm)
      }
      const isNewRec = compareRecords(record, wpm)
      if (isNewRec) {
        console.log('new record')
        localStorage.setItem('record', JSON.stringify(wpm))
        setNewRec(wpm)
        setIsNewRecord(true)
      }
      navigate('/test-results', {
        state: {
          wpm: wpm,
          accuracy: correctChars,
          res: personalResults,
          isNewRecord: isNewRecord,
          firstTest: firstTest
        }
      })
    }
  }, [record, testIsFinished, navigate, wpm, correctChars, personalResults])

  // memorizing that the test is not the first
  useEffect(()=>{
    localStorage.setItem('firstTimeBool', JSON.stringify(firstTest))
  }, [firstTest])

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
        record={record}
        setFirstTest={setFirstTest}
      ></ HomePage>}></Route>
      <Route path="/test-results" element={<TestComplete
        setTestIsFinished={setTestIsFinished}
        setIsStarted={setIsStarted}
      />}></Route>
    </Routes>
  )
}

export default App
