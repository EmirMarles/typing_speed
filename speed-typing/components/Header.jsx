import './Header.css'
import { calculateWPM } from '../utils/algorithms'
import { SubHeader } from './SubHeader'
import { useEffect, useState } from 'react'

export function Header({
    difficulty,
    setDifficulty,
    mode,
    setMode,
    personalResults,
    setPersonalResults,
    testIsFinished,
    setTestIsFinished,
    isStarted,
    wpm,
    correctChars,
    setMainTimer,
    setFirstTest
}) {
    const [seconds, setSeconds] = useState(60)

    // TIMER
    useEffect(() => {
        if (mode === 'passage') return
        if (isStarted === false) return
        if (seconds <= 0) {
            setFirstTest(false)
            setTestIsFinished(true)
            return
        }
        const intervalId = setInterval(() => {
            setSeconds(seconds - 1)
            setMainTimer(seconds - 1)
        }, 1000)

        return () => clearInterval(intervalId)
    }, [seconds, isStarted, setFirstTest, setMainTimer, setTestIsFinished, mode])

    const handleSetEasy = () => {
        if (isStarted) return
        if (difficulty === 'easy') {
            setDifficulty(null)
        }
        else {
            setDifficulty('easy')
        }
        return
    }

    const handleSetMedium = () => {
        if (isStarted) return
        if (difficulty === 'medium') {
            setDifficulty(null)
        } else {
            setDifficulty('medium')
        }
        return
    }

    const handleSetHard = () => {
        if (isStarted) return
        if (difficulty === 'hard') {
            setDifficulty(null)
        } else {
            setDifficulty('hard')
        }
        return
    }

    const setTimedMode = () => {
        if (isStarted) return
        if (mode === 'timed') {
            setMode(null)
        } else {
            setMode('timed')
        }
        return
    }

    const setPassageMode = () => {
        if (isStarted) return
        if (mode === 'passage') {
            setMode(null)
        } else {
            setMode('passage')
        }
        return
    }

    return (
        <div className='header-main'>
            <div className="second-component">
                <div className="stats">
                    {/* if infinity - do something */}
                    <p className='wpm'>
                        <span>WPM:</span>
                        <span className="wpm-header">
                            {wpm === Infinity
                                ? 0
                                : wpm}
                        </span>
                    </p>
                    <p className='acc'>
                        <span> Accuracy:</span>
                        <span className='acc-header'>
                            {correctChars === -Infinity || correctChars === Infinity || correctChars < 0 || isNaN(correctChars)
                                ? 0
                                : correctChars}
                        </span>
                    </p>
                    <p className='tim'>
                        <span> Time:</span>
                        <span className='tim-header'>{seconds}</span>
                    </p>
                </div>
                <div className="diff">
                    <p style={{ color: 'rgb(148, 148, 151)' }}>Difficulty:</p>
                    {difficulty === 'easy'
                        ? <p className='chosen-button'
                            onClick={handleSetEasy}
                        >Easy</p>
                        : <p className='diff-button'
                            onClick={handleSetEasy}
                        >Easy</p>
                    }
                    {difficulty === 'medium'
                        ? <p className='chosen-button'
                            onClick={handleSetMedium}
                        >Medium</p>
                        : <p className='diff-button'
                            onClick={handleSetMedium}
                        >Medium</p>
                    }
                    {difficulty === 'hard'
                        ? <p className='chosen-button'
                            onClick={handleSetHard}
                        >Hard</p>
                        : <p className='diff-button'
                            onClick={handleSetHard}
                        >Hard</p>
                    }

                    <p style={{ color: 'rgb(148, 148, 151)' }}>Mode:</p>

                    {mode === 'timed'
                        ? <p className='diff-button-mode'
                            onClick={setTimedMode}
                        >Timed (60s)</p>
                        : <p className='diff-button'
                            onClick={setTimedMode}
                        >Timed (60s)</p>
                    }

                    {mode === 'passage'
                        ? <p className='diff-button-mode'
                            onClick={setPassageMode}
                        >Passage</p>
                        : <p className='diff-button'
                            onClick={setPassageMode}
                        >Passage</p>
                    }
                </div>
            </div>
        </div>
    )
}