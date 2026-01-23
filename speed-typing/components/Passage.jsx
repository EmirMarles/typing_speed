import './Passage.css'
import { useState, useEffect, use } from 'react'
import { calculateWPM } from '../utils/algorithms'
import { useRef } from 'react'
import { compareTextObjects } from '../utils/compareTextObjects'
import { calculateAccuracy } from '../utils/algorithms'
import { Header } from './Header'
import { restoreReferenceText } from '../utils/compareTextObjects'
import { useDebounceWPM, useDebounceAcc } from '../customHooks/useDebounce'

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
    const [originalText, setOriginalText] = useState(null)

    const inputRef = useRef(null)
    const blurRef = useRef(null)


    // SAVING THE ORIGINAL FOR FUTURE REFERENCE

    useEffect(() => {
        if (!text) return
        const setOriginal = () => {
            setOriginalText(text)
        }
        setOriginal();
    }, [text])

    // COMPARING TEXT AND INPUT LOGIC// 

    useEffect(() => {
        if (userInput === null) return
        let newArr = [...arrOfInput]
        let index = newArr.length
        let obj = compareTextObjects(text, userInput)
        // FOR ACCURACY CALCULATION
        if (obj.correct === false) {
            let newText = [...text]
            // newText[obj.id].ch = obj.ch
            // setText(newText)
            // we change the value of the reference text?
            setIncorrectChars(incorrectChars + 1)
        }
        newArr[index] = obj
        setArrOfInput(newArr)
    }, [userInput, text])

    // DELETING LOGIC 

    useEffect(() => {
        if (userInput === null) return
        let userInputArr = userInput.split("")
        const deleteText = () => {
            let index = userInputArr.length
            let newArr = arrOfInput
            newArr.splice(index, Infinity)
            setArrOfInput(newArr)
        }
        // when deletin - previous char should be put again into the array
        if (userInputArr.length < arrOfInput.length) {
            deleteText();
        }

    }, [userInput, arrOfInput])

    // TEXT RESTORATION LOGIC //

    useEffect(() => {
        if (userInput === null) return
        let userInputArr = userInput.split("")
        let index = userInputArr.length
        const restore = () => {
            let damagedText = [...text]
            let original = originalText
            const restoredText = restoreReferenceText(damagedText, index, original)
            setText(restoredText)
        }

        if (userInputArr.length < arrOfInput.length) {
            restore()
        }
    }, [setText, text, originalText, userInput, arrOfInput])

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

    const debouncedWPM = useDebounceWPM(userInput)

    useEffect(() => {
        let wpmDebounced = calculateWPM(userInput, mainTimer)
        setWpm(wpmDebounced)
    }, [debouncedWPM])

    // useEffect(() => {
    //     if (userInput === null) return
    //     setTimeout(() => {
    //         const wpm = calculateWPM(userInput, mainTimer)
    //         console.log('wpm:', wpm)
    //         setWpm(wpm)
    //     }, 2000)
    //     console.log('')
    // }, [userInput, setWpm])

    // CALCULATE ACCURACY

    const debouncedAccuracy = useDebounceAcc(userInput)

    useEffect(()=>{
        if (debouncedAccuracy){
            let percentage = calculateAccuracy(debouncedAccuracy, incorrectChars)
            setCorrectChars(percentage)
        }
    },[debouncedAccuracy])
    // useEffect(() => {
    //     if (userInput === null) return
    //     let percentage = calculateAccuracy(userInput, incorrectChars)
    //     console.log('accuracy percentage:', percentage)
    //     setCorrectChars(percentage)

    // }, [userInput, setCorrectChars, incorrectChars])

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
            blurRef.current.style.display = 'none'
            setIsStarted(true)
        }
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
                <div className="passage-text">
                    <div className="text-reference">
                        <p className='text-original'>
                            {/* let char objet ={
                                id : 1
                                char : "T"
                            } */}
                            {text && text.length > 0 &&
                                text.map((obj) => {
                                    return <span key={obj.id}>{obj.ch}</span>
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