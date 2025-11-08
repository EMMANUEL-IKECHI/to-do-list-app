import React, { useState } from 'react'

const useInput = (initialValue = '') => {
    const [value, setValue] = useState(initialValue);

    //update state as input value changes
    const handleChange = (e) => {
        setValue(e.target.value);
    }

    //reset the state
    const reset = () => {
        setValue('');
    }
  return {value, handleChange, reset};
}

export default useInput