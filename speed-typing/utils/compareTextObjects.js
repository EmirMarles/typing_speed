function getArrayOfChars(arrOfCharObj){
    if (arrOfCharObj === null) return null

    let newArr = []
    for (let i = 0; i < arrOfCharObj.length; i++){
        newArr[i] = arrOfCharObj[i].ch
    }

    return newArr
}


export function compareTextObjects(reference, input) {
    if (input.split("").length > reference.length) {
        return null
    }
    if (input === null) {
        return null
    }
    let arrOfChar = getArrayOfChars(reference)
    let arrOfCharMonkey = input.split("")
    let lastIndex = arrOfCharMonkey.length - 1

    let obj = {
        ch: input,
        correct: false | true
    }
    if (arrOfChar[lastIndex] !== arrOfCharMonkey[lastIndex]) {
        obj = {
            id: lastIndex,
            ch: arrOfCharMonkey[lastIndex],
            correct: false
        }
    } else {
        obj = {
            id: crypto.lastIndex,
            ch: arrOfCharMonkey[lastIndex],
            correct: true
        }
    }
    return obj
}

export function restoreReferenceText(damagedText, index, original){
    for (let i = index; i < original; i++){
        if(damagedText[i].ch !== original[i].ch){
            damagedText[i].ch = original[i].ch
        }
    }
    return damagedText
}


// export function restore

const twin = 'The sun rose over the quiet town. Birds sang in the trees as people woke up and started their day. It was going to be a warm and sunny morning.'
const twin2 = 'The sun rose over the quiet town. Birds sang in the trees as people woke'


console.log(compareTextObjects(twin, twin2))