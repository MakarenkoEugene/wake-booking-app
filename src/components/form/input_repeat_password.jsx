import React from "react";

export default function InputRepeatPassword({
  inputRepeatPasswordValue,
  inputPasswordValue,
  changeInputRepeatPasswordValue,
  inputPasswordValid,
}) {
  const inputPasswordRef = React.useRef(null);
  const passwordIsMath = inputPasswordValue === inputRepeatPasswordValue;

  return (
    <div>
      <div className={inputPasswordValid && !passwordIsMath ? "m_alert_WB" : ""}>
        <label htmlFor="input_repeat_password_WB">Repeat Password</label>
        <input
          type="password"
          id="input_repeat_password_WB"
          value={inputRepeatPasswordValue}
          pattern={inputPasswordValue}
          minLength="8"
          maxLength="16"
          onChange={(e) => changeInputRepeatPasswordValue(e.target.value)}
          ref={inputPasswordRef}
          title="You need repeat your password"
          required={true}
          placeholder="Repeat Password"
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
        {inputPasswordValid &&
          !passwordIsMath &&
          (inputRepeatPasswordValue ? (
            <span id="e_text_for_alert">Passwords not match</span>
          ) : (
            <span id="e_text_for_alert">Passwords must match</span>
          ))}
      </div>
    </div>
  );
}
