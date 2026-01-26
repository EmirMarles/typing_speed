function getRandomIndex() {
    let ceil = Math.ceil(9)
    let floor = Math.floor(0)

    let randomIndex = Math.floor(Math.random() * (floor - ceil + 1) + ceil)
    return randomIndex
}

function createArrOfCharObject(text) {
    if (!text){
        return null
    }
    const splitText = text.split("");
    let arrOfObjects = []
    let index = 0

    for (let i = 0; i < splitText.length; i++) {
        let newObj = {
            id: i,
            ch: splitText[i]
        }
        arrOfObjects[index] = newObj
        index++
    }

    return arrOfObjects
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
    let arr = null 
    if (text) {
        arr = createArrOfCharObject(text)
    }
    return arr
}