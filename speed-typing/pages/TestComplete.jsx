import './TestComplete.css'

import { useLocation } from "react-router"
import iconCompleted from '../typing-speed-test-main/assets/images/image.svg'
import iconRestart from '../typing-speed-test-main/assets/images/icon-restart.svg'
import { SubHeader } from '../components/SubHeader'
import patternStar from '../typing-speed-test-main/assets/images/pattern-star-2.svg'
import starYellow from '../typing-speed-test-main/assets/images/pattern-star-1.svg'
import { useNavigate } from 'react-router'
import newRecordLogo from '../typing-speed-test-main/assets/images/icon-new-pb.svg'
import confetti from '../typing-speed-test-main/assets/images/pattern-confetti.svg'
import { useState, useEffect } from 'react'

export function TestComplete() {

    const [playAnimation, setPlayAnimation] = useState(false)

    useEffect(() => {
        requestAnimationFrame(() => setPlayAnimation(true))
    }, [])
    const location = useLocation()

    const state = location.state

    let wpm = 0
    let accuracy = 0
    let resObj = 0
    let isNewRecord = false
    if (state !== null) {
        console.log('everything:', wpm, accuracy, resObj, isNewRecord)
        wpm = state.wpm
        accuracy = state.accuracy
        resObj = state.res
        isNewRecord = state.isNewRecord
    }
    const navigate = useNavigate();

    const handleGoAgain = () => {
        console.log('handle go again clicked')
        navigate('/')
    }

    if (isNewRecord) {
        return (
            <>
                <SubHeader> </SubHeader>
                <div className="resulsts-page-layout">
                    <div className='test-complete-container'>
                        <div className="new-rec">
                            <img src={newRecordLogo} className="image-icon" alt="icon-completed" draggable={false} />
                        </div>
                        <div className='test-complete-text'>
                            <h2 className='test-complete-h2'>Record Smashed!</h2>
                            <p style={{ color: 'rgb(148, 148, 151)' }}>You are getting faster. That was incredible typing</p>
                        </div>

                        <div className="results">
                            <div className="wpm-result">
                                <p className="results-headers" >WPM:</p>
                                <p>{wpm}</p>
                            </div>
                            <div className="accuracy-result">
                                <p className="results-headers">Accuracy:</p>
                                <p><span style={{ color: 'rgb(214, 77, 91)' }}>{accuracy} %</span></p>
                            </div>
                            <div className="chars-correct-inc">
                                <p className="results-headers" >Characters:</p>
                                <p>
                                    <span style={{ color: 'rgb(77, 214, 123)' }}>{resObj.corrChar}</span>/
                                    <span style={{ color: 'rgb(214, 77, 91)' }}>{resObj.incorrectChar || 3}</span></p>
                            </div>
                        </div>
                        <button className="beat-again-container">
                            <p className='go-again' onClick={handleGoAgain}>Beat This Score</p>
                            <img src={iconRestart} alt="icon-restart" className="again-icon" />
                        </button>
                    </div>
                    <div className={`confetti`}>
                        <img src={confetti} 
                        alt="confetti-image"
                        className={`confetti-animation ${playAnimation ? 'play' : ''}`}
                        />
                    </div>
                </div>
            </>
        )
    }

    else {
        return (
            <>
                <SubHeader> </SubHeader>
                <button className="remove-record" onClick={() => { localStorage.removeItem('record') }}>Remove record</button>
                <div className="resulsts-page-layout">
                    <div className='test-complete-container'>
                        <div className="images">
                            <img src={patternStar} alt="patter-star" className='pattern-star' />
                            <img src={iconCompleted} className="image-icon" alt="icon-completed" draggable={false} />
                        </div>
                        <div className='test-complete-text'>
                            <h2 className='test-complete-h2'>Test Complete!</h2>
                            <p style={{ color: 'rgb(148, 148, 151)' }}>Solid run. Keep pushing to beat your high score.</p>
                        </div>

                        <div className="results">
                            <div className="wpm-result">
                                <p className="results-headers" >WPM:</p>
                                <p>{wpm}</p>
                            </div>
                            <div className="accuracy-result">
                                <p className="results-headers">Accuracy:</p>
                                <p><span style={{ color: 'rgb(214, 77, 91)' }}>{accuracy} %</span></p>
                            </div>
                            <div className="chars-correct-inc">
                                <p className="results-headers" >Characters:</p>
                                <p>
                                    <span style={{ color: 'rgb(77, 214, 123)' }}>{resObj.corrChar}</span>/
                                    <span style={{ color: 'rgb(214, 77, 91)' }}>{resObj.incorrectChar || 3}</span></p>
                            </div>
                        </div>
                        <button className="go-again-container">
                            <p className='go-again' onClick={handleGoAgain}>Go Again</p>
                            <img src={iconRestart} alt="icon-restart" className="again-icon" />
                        </button>
                    </div>
                </div>
                <img src={starYellow} alt="yellow-star" className='yellow-star' />
            </>
        )
    }
}