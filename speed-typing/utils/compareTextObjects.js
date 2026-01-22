export function compareTextObjects(reference, input) {
    if (input.length > reference.length) {
        return null
    }
    if (input === null) {
        return null
    }
    let arrOfChar = reference
    let arrOfCharMonkey = input.split("")
    let lastIndex = arrOfCharMonkey.length - 1

    let obj = {
        ch: input,
        correct: false | true
    }
    if (arrOfChar[lastIndex] !== arrOfCharMonkey[lastIndex]) {
        obj = {
            id: crypto.randomUUID(),
            ch: arrOfCharMonkey[lastIndex],
            correct: false
        }
    } else {
        obj = {
            id: crypto.randomUUID(),
            ch: arrOfCharMonkey[lastIndex],
            correct: true
        }
    }
    return obj
}

const twin = 'The sun rose over the quiet town. Birds sang in the trees as people woke up and started their day. It was going to be a warm and sunny morning.'
const twin2 = 'The sun rose over the quiet town. Birds sang in the trees as people woke'


console.log(compareTextObjects(twin, twin2))