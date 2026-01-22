import { Header } from "../components/Header"
// import { data } from "../typing-speed-test-main/data.json"
import { Passage } from "../components/Passage"
import { SubHeader } from "../components/SubHeader"

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
        setCorrectChars,
        record
    }
) {

    return (

        <div className="app-itself">
            <SubHeader
                testIsFinished={testIsFinished}
                setTestIsFinished={setTestIsFinished}
                record={record}
            ></SubHeader>
            {/* <Header
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
            > </Header> */}

            <Passage
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

                text={text}
                setTestIsFinished={setTestIsFinished}
                setIsStarted={setIsStarted}
                setWpm={setWpm}
                mainTimer={mainTimer}
                setCorrectChars={setCorrectChars}
            ></Passage>


            <div>
                <div class="attribution">
                    Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
                    Coded by <a href="#">Emir Marles</a>.
                </div>
            </div>
        </div>
    )
}