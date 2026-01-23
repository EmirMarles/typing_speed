import { useEffect, useState } from "react";

export function useDebounceWPM(value) {

    const [localWpm, setLocalWpm] = useState(value);

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setLocalWpm(value)
        }, 300)

        return ()=> clearTimeout(timeOutId)
    }, [value])

    return localWpm
}

export function useDebounceAcc(value){

    const [localAcc, setLocalAcc] = useState(value)

    useEffect(()=>{

        const timeOutId = setTimeout(()=>{
            setLocalAcc(value)
        }, 300)

        return ()=> clearTimeout(timeOutId)
    },[value])
    return localAcc
}