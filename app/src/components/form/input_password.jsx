import React from "react";

export default function InputPassword({ inputPasswordValue, inputPasswordValid, changeInputPasswordValue }) {
  const inputPasswordRef = React.useRef(null);

  return (
    <div>
      <div className={!inputPasswordValid ? "m_alert_WB" : ""}>
        <label htmlFor="input_password_WB">Password</label>
        <input
          type="password"
          id="input_password_WB"
          value={inputPasswordValue}
          onChange={(e) => changeInputPasswordValue(e.target.value, e.target.validity.valid)}
          ref={inputPasswordRef}
          title="You need set your password. You can enter numbers, Latin alphabet in lower and upper case. 0-9 a-z A-Z"
          pattern="[a-zA-Z0-9]*"
          minLength="8"
          maxLength="16"
          required={true}
          placeholder="Password"
        />

        <button
          className="show_hide_password"
          onClick={(e) => {
            e.preventDefault();
            inputPasswordRef.current.type === "password"
              ? (inputPasswordRef.current.type = "text")
              : (inputPasswordRef.current.type = "password");
          }}
        >
          👁
        </button>

        {inputPasswordValid ? null : inputPasswordValue ? (
          <span id="e_text_for_alert">Incorrect password</span>
        ) : (
          <span id="e_text_for_alert">Enter password</span>
        )}
      </div>
    </div>
  );
}
