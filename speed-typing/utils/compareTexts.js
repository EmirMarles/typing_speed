
// import fs from 'fs';

// const data = JSON.parse(
//   fs.readFileSync(new URL('../typing-speed-test-main/data.json', import.meta.url))
// );

// const text = data.easy[0].text

export function compareTexts (original, monkey){
    if (monkey.length > original.length){
        return null
    }
    if (monkey === null){
        return null
    }
    let arrOfChar = original.split("")
    let arrOfCharMonkey = monkey.split("")
    let lastIndex = arrOfCharMonkey.length - 1

    if (arrOfChar[lastIndex] !== arrOfCharMonkey[lastIndex]){
        return false 
    }else{
        return true
    }
}


const twin = 'The sun rose over the quiet town. Birds sang in the trees as people woke up and started their day. It was going to be a warm and sunny morning.'
const twin2 = 'The sun rose over the quiet town. Birds sang in the trees as peoplll '
console.log(compareTexts(twin, twin2))
// console.log('text:',text)
// console.log('twin', twin.split(""))
