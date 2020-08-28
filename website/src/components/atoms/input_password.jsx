import React, { Component, useState } from "react";

export default function InputPassword({
  title,
  label,
  value,
  valid,
  onChangeValue,
  onChangeValid,
  required,
  pattern,
  placeholder,
}) {
  const [passwordShowed, setPasswordShowed] = useState(false);

  return (
    <div className={`input_password${valid ? "" : " m_alert"}`}>
      {label && <label htmlFor={label}>{label}</label>}
      <input
        type={passwordShowed ? "text" : "password"}
        id={label}
        value={value}
        onChange={(e) => {
          onChangeValue(e.target.value);
          if (onChangeValid) onChangeValid(e.target.validity.valid);
        }}
        title={
          title ||
          "You need set your password. You can enter numbers, Latin alphabet in lower and upper case. 0-9 a-z A-Z"
        }
        pattern={pattern || "[a-zA-Z0-9]*"}
        minLength="8"
        maxLength="16"
        required={required}
        placeholder={placeholder || ""}
      />

      <button
        onClick={(e) => {
          e.preventDefault();
          setPasswordShowed(!passwordShowed);
        }}
      >
        👁
      </button>
    </div>
  );
}
