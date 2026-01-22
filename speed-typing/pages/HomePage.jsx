import { Header } from "../components/Header"
// import { data } from "../typing-speed-test-main/data.json"
import { Passage } from "../components/Passage"

export function HomePage(
    {
        difficulty,
        setDifficulty,
        mode, 
        setMode,
        personalResults,
        setPersonalResults,
        text,
        setText,
        testIsFinished,
        setTestIsFinished,
        isStarted,
        setIsStarted,
        wpm,
        setWpm,
        mainTimer,
        setMainTimer,
        correctChars,
        setCorrectChars
    }
) {

    return (

        <div>
            <Header
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                mode={mode}
                setMode={setMode}
                personalResults={personalResults}
                setPersonalResults={setPersonalResults}
                setText={setText}
                testIsFinished={testIsFinished}
                setTestIsFinished={setTestIsFinished}
                isStarted={isStarted}
                wpm={wpm}
                correctChars={correctChars}
                setMainTimer={setMainTimer}
            > </Header>

            <Passage
                text={text}
                setTestIsFinished={setTestIsFinished}
                setIsStarted={setIsStarted}
                setWpm={setWpm}
                mainTimer={mainTimer}
                setText={setText}
                setCorrectChars={setCorrectChars}
                setPersonalResults={setPersonalResults}
            ></Passage>
            

            <div>
                <div class="attribution">
                    Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
                    Coded by <a href="#">Your Name Here</a>.
                </div>
            </div>
        </div>
    )
}