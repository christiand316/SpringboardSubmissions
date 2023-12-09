import { useState } from "react";

export default function useToggle(initialVal = false) {
  const [value, setValue] = useState(initialVal)
  
  const toggle = () => {
    setValue(oldValue => !oldValue)
  }

  return [value, toggle]
}