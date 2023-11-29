import React, { ChangeEvent } from "react";
import classes from "./LoginInput.module.css";

interface LoginInputProps {
  className?: string;
  type?: string;
  placeholder?: string;
  label: string;
  value: string;
  id: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LoginInput: React.FC<LoginInputProps> = ({
  className,
  type,
  placeholder,
  value,
  onChange,
  id,
  label,
}) => {
  return (
    <div className={classes.loginInputContainer}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={className}
        type={type || "text"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default LoginInput;
