import React from "react";
import { SelectProps } from "./index";

const Select: React.FC<SelectProps> = ({ options, className, ariaLabel, placeholder, ...props }) => {
  return (
    <select className={className} aria-label={ariaLabel} {...props}>
      {placeholder !== undefined && <option value="">{placeholder}</option>}
      {options.map((option, index) => (
        <option key={`${option.value}-${index}`} value={option.value} disabled={option.disabled || option.hidden}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
