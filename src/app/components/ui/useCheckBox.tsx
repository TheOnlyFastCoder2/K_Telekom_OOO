import { useState } from "react";

interface IUseCheckboxProps {
  checked?: boolean;
  onlyRead?: boolean,
}

interface ICheckboxProps {
  label?: string|React.ReactNode;
  className?: string;
}

export default function useCheckbox ({
  onlyRead = false, 
  checked = false 
}: IUseCheckboxProps) {
  
  const [isChecked, setIsChecked] = useState(checked);

  const toToggle = () => {
    setIsChecked((isChecked) => {
      return !isChecked;
    });
  };

  return {
    toToggle,
    isChecked,
    Checkbox: ({label, className}: ICheckboxProps) =>  (
      <label className={`Checkbox ${className}`} onClick={!onlyRead ? toToggle : undefined}>
        <div className={`Checkbox__box ${isChecked ? 'checked' : ''}`}></div>
        {label}
      </label>
    )
  };
};

