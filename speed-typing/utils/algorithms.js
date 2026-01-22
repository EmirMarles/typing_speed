export function calculateWPM(input, timeLeft) {
    if (input === null) return 0
    let leng = input.length
    const totalTime = 60

    let elapsedTimeSeconds = totalTime - timeLeft
    let elapsedTimeMinutes = elapsedTimeSeconds / 60
    let numWords = Math.floor((leng / 5) / elapsedTimeMinutes)
    return numWords
}

export function calculateAccuracy(userInput, incorrectChars) {
    let arr = userInput.split("")
    let leng = arr.length
    let correctChars = leng - Number(incorrectChars)
    let accuracyPerc = Math.floor((correctChars / leng) * 100)
    return accuracyPerc
}

export function compareRecords(oldRecord, newAttempt) {
    let newRecord = false
    if (newAttempt > oldRecord) {
        newRecord = true
    }
    return newRecord
}