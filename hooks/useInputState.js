import {useState} from 'react'

export default function useInputState(initial) {
    const [value, changeValue] = useState(initial)
    const handleChange = input => {
        !!input && changeValue(input.target.value)
    }
    return [value, handleChange]
}