import React, { useId } from 'react';

// forward ref let us take acces of the state using the ref

// we created this seprate Input Component but when this will be used in forms or pages we will be needing acess of the state
// so we use forward ref that lets get the ref of the state where the component has been used


// Creating the Input component with forwardRef

const Input = React.forwardRef(function Input(
  {
    label,   
    type = 'text',  
    className = '', 
    ...props  // Other props spread into the <input> element
  }, 
  ref // The ref is passed from the parent to this component
) {
    const id = useId(); // Generate a unique ID
  return (
    <div>
      {label && (
        <label 
          className='inline-block mb-1 pl-1 text-right flex ml-2' 
          htmlFor={id}
        >
          {label}
        </label>
      )}
      
      <input 
        type={type} 
        id={id}  // Unique ID for the input field
        className={` block text-sm font-medium text-gray-700 mb-2  px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-100 duration-200 border border-gray-200 w-full ${className}`}
        {...props} // Spread the rest of the props into the input
        ref={ref}  // Forward the ref to the input
      />
    </div>
  );
});

export default Input;
