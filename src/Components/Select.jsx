import { useId } from "react"
import React from 'react'

function Select( {
    options = [],
    label,
    className = '',
    ...props
} , ref) {
    const id = useId();
  return (
    <div>
        {label && <label htmlFor={id} className= ''>
                {label}
            </label>} 

        <select 
        {...props}
        id={id}
        ref={ref}
        className={` px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}>

            {/* options can be empty so berfore looping we check if it is empty or not */}

            {options?.map((option)=> (
                <option key={option}  value = {option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default  React.forwardRef(Select);
