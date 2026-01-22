
// import fs from 'fs';

// const data = JSON.parse(
//   fs.readFileSync(new URL('../typing-speed-test-main/data.json', import.meta.url))
// );

function getRandomIndex() {
    let ceil = Math.ceil(9)
    let floor = Math.floor(0)

    let randomIndex = Math.floor(Math.random() * (floor - ceil + 1) + ceil)
    return randomIndex
}


export function chooseRandomText(data, difficulty) {
    let text = null
    if (difficulty === 'easy') {
        let arr = data.easy
        let randomIndex = getRandomIndex()
        text = arr[randomIndex].text
    } else if (difficulty === 'medium') {
        let arr = data.medium
        let randomIndex = getRandomIndex()
        text = arr[randomIndex].text
    }
    else if (difficulty === 'hard') {
        let arr = data.hard
        let randomIndex = getRandomIndex()
        text = arr[randomIndex].text
    }
    return text
}


// const text = chooseRandomText(data)

// console.log(text)