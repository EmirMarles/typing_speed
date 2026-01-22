import './Passage.css'
import { useState, useEffect } from 'react'
import { calculateWPM } from '../utils/algorithms'
import { useRef } from 'react'
import { compareTextObjects } from '../utils/compareTextObjects'
import { calculateAccuracy } from '../utils/algorithms'
import { Header } from './Header'

// RANDOMIZER FOR TEXT SELECTION

export function Passage({
    text,
    setTestIsFinished,
    setIsStarted,
    setWpm,
    mainTimer,
    setText,
    setCorrectChars,
    setPersonalResults,
    difficulty,
    setDifficulty,
    mode,
    setMode,
    personalResults,
    testIsFinished,
    isStarted,
    wpm,
    correctChars,
    setMainTimer,
}) {

    const [userInput, setUserInput] = useState(null)
    const [arrOfInput, setArrOfInput] = useState([])
    const [incorrectChars, setIncorrectChars] = useState(0)
    const inputRef = useRef(null)
    const blurRef = useRef(null)
    // COMPARING THE INPUT WITH REFERENCE TEXT// 

    useEffect(() => {
        if (userInput === null) return
        console.log(userInput)
        let userInputArr = userInput.split("")

        const deleteText = () => {
            let index = userInputArr.length
            let newArr = arrOfInput
            newArr.splice(index, Infinity)
            setArrOfInput(newArr)
        }
        // DELETION LOGIC // 
        if (userInputArr.length < arrOfInput.length) {
            deleteText();
        }
        let newArr = [...arrOfInput]
        let index = newArr.length
        let obj = compareTextObjects(text, userInput)
        if (obj.correct === false) {
            setIncorrectChars(incorrectChars + 1)
        }
        newArr[index] = obj
        setArrOfInput(newArr)
    }, [userInput, text])

    useEffect(() => {
        if (userInput === null) return
        setIsStarted(true)
    }, [userInput, setIsStarted])


    // EFFECT TO CHECK IF THE TEXT IS FINISHED

    useEffect(() => {
        if (arrOfInput.length < 0) return
        // const arr = text.split("")
        if (arrOfInput.length === text.length) {
            console.log('finished the test!')
            setTestIsFinished(true)
        }
    }, [arrOfInput, setTestIsFinished, text.length])

    // EFFECT TO CALCULATE THE WPM //

    useEffect(() => {
        if (userInput === null) return
        setTimeout(() => {
            const wpm = calculateWPM(userInput, mainTimer)
            console.log('wpm:', wpm)
            setWpm(wpm)
        }, 2000)
        console.log('')
    }, [userInput, setWpm])

    // CALCULATE ACCURACY

    useEffect(() => {
        if (userInput === null) return
        console.log('userInput, incorrectChars:', userInput, incorrectChars)
        console.log('length', userInput.split("").length)
        let percentage = calculateAccuracy(userInput, incorrectChars)
        console.log('accuracy percentage:', percentage)
        setCorrectChars(percentage)

    }, [userInput, setCorrectChars, incorrectChars])

    // SETTTING THE RESULTS FOR THE RESULTS PAGE
    useEffect(() => {
        if (userInput === null) return;
        let totalChar = userInput.split("").length
        let corrChar = totalChar - incorrectChars
        let res = {
            corrChar: corrChar,
            incorrectChars: incorrectChars,
        }
        setPersonalResults(res)
    }, [incorrectChars, setPersonalResults, userInput])

    const handleInput = (e) => {
        setUserInput(e.target.value)
    }

    const handleInputFocus = () => {
        inputRef.current.focus()
    }

    const handleStartTest = () => {
        if (blurRef.current) {
            blurRef.current.style.display='none'
            setIsStarted(true)
        }
        // change the display to none..
    }
    return (
        <div className="parent">

            <Header
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                mode={mode}
                setMode={setMode}
                personalResults={personalResults}
                setPersonalResults={setPersonalResults}
                setText={setText}
                testIsFinished={testIsFinished}
                isStarted={isStarted}
                wpm={wpm}
                correctChars={correctChars}
                setMainTimer={setMainTimer}
                setTestIsFinished={setTestIsFinished}
            ></Header>

            <div className='passage-component' onClick={handleInputFocus}>
                {/* <Header
                    difficulty={difficulty}
                    setDifficulty={setDifficulty}
                    mode={mode}
                    setMode={setMode}
                    personalResults={personalResults}
                    setPersonalResults={setPersonalResults}
                    setText={setText}
                    testIsFinished={testIsFinished}
                    isStarted={isStarted}
                    wpm={wpm}
                    correctChars={correctChars}
                    setMainTimer={setMainTimer}
                ></Header> */}

                {/* blur effect over the text with the button */}

                <div className="passage-text">

                    <div className="text-reference">
                        <p className='text-original'>
                            {text && text.length > 0 &&
                                text.map((char, index) => {
                                    return <span key={index}>{char}</span>
                                })
                            }
                        </p>
                    </div>
                    <div className="monkey-type" onChange={handleInput}>
                        <p>
                            {arrOfInput.length > 0 &&
                                arrOfInput.map((elem) => {
                                    if (elem.correct === true) {
                                        return (<span className="correct-input" key={elem.id}>{elem.ch}</span>)
                                    }
                                    else {
                                        return (<span className="false-text" key={elem.id} >{elem.ch}</span>)
                                    }
                                })
                            }
                        </p>
                    </div>
                    <div ref={blurRef} className="blur" onClick={handleStartTest}>
                        <div className="blur-element">
                            <button className="start-typing" onClick={handleStartTest}>Start Typing Test</button>
                            <p className="instruction">Or click text and start typing</p>
                        </div>
                    </div>
                    <input type="text" className='hidden-input'
                        onChange={handleInput}
                        autoFocus
                        ref={inputRef}
                    />
                </div>
            </div>
        </div>
    )
}