import React from 'react'

type Props = {
    value: string
    onCkick: () => void;
    disabled?: boolean
}
const Button = ({ value, disabled, onCkick }: Props) => {
    return (
        <button onClick={onCkick}
        disabled={disabled}
        className='w-full my-3 p-3 rounded text-center bg-gray-700 text-white uppercase font-bold hover:bg-gray-600 border-b-4 border-white/10'
        >
            {value}
        </button>
    )
}

export default Button