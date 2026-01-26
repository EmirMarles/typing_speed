# Frontend Mentor - Typing Speed Test solution

This is a solution to the [Typing Speed Test challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/typing-speed-test). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page


### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- React
- CSS custom properties
- Flexbox
- [React](https://reactjs.org/) - JS library


### What I learned

It is my first serious project that I've done from start to finish. Proud of it, although it might not be perfect.
-Debounced Calculation of WPM and Accuracy using a custom hook that I created - useDebounce
-CSS properties like 'backdrop-filter' for blur
-CSS animations like blinking line for input and confetti
-CSS flexbox 

To see how you can add code snippets, see below:

```html
<h1>Some HTML code I'm proud of</h1>
```
```css
.proud-of-this-css {
  backdrop-filter: blur(4px);
}

```
```js
function useDebounceWPM(value) {
    const [localWpm, setLocalWpm] = useState(value);
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setLocalWpm(value)
        }, 300)

        return ()=> clearTimeout(timeOutId)
    }, [value])
    return localWpm
}
```

### Continued development

-CSS grid/flexbox
-CSS variables and its usage
-React concepts useEffect, useState
-React rendering and mounting flow


## Author

- Frontend Mentor - [@EmirMarles](https://www.frontendmentor.io/profile/EmirMarles)