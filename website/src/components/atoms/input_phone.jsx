import React from "react";

function InputPhone({ autoFocus, label, required, inputRef, value, onChangeValue }) {
  const onInputValue = (e) => {
    e.preventDefault();
    if (
      !isNaN(+e.target.value) &&
      e.target.value.slice(-1) !== " " &&
      e.target.value.length < 14 &&
      e.target.value.length > 3
    ) {
      onChangeValue({ value: e.target.value, valid: e.target.validity.valid });
    }
  };

  return (
    <label style={{ marginRight: "20px", position: "relative" }}>
      {label && <p style={{ marginBottom: "10px" }}>{label}</p>}
      <input
        type="tel"
        autoFocus={autoFocus}
        value={value.value}
        onChange={(e) => onInputValue(e)}
        ref={inputRef}
        pattern="^\+380[0-9]{9}$"
        title="+380995693132"
        required={required}
      />

      {required && (
        <span className="text_help">
          ⚠️<span>Обязательное поле.</span>
        </span>
      )}
    </label>
  );
}

export default InputPhone;
