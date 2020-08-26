import React, { Component, useState } from "react";

import imgClosseEye from "../../assets/img/password_closse_eye.svg";
import imgOneEye from "../../assets/img/password_open_eye.svg";

function InputPassword() {
  const [ passwordShowed, setPasswordShowed ] = useState(false);

  return (
    <>
      <label htmlFor="input_password">Пароль:</label>
      <input
        type={passwordShowed ? "text" : "password"}
        id="input_password"
        autoComplete="current-password"
        title="Ведите код подтверждения телефона либо пароль. Вводить можно: a-z, A-Z, 0-9. Максимальное количество 6, минимальное 16"
        pattern="[0-9a-zA-Z]{6,16}"
        required
      />
      <span className="text_help">
        ⚠️
        <span>
          Обязательное поле. Ведите код подтверждения телефона либо пароль. Вводить можно символы латинского алфавита:
          "a-z" "A-Z" и цифры "0-9". Минимальное количество символов 6 максимальное 16.
        </span>
      </span>
      <label
        htmlFor="toggle_input_password"
        style={{
          fontSize: "1.5em",
          position: "relative",
          top: "-35px",
          left: "215px",
          width: "25px",
          height: "32px",
          margin: "0px",
          padding: "0px",
          cursor: "pointer",
          backgroundImage: `url(${passwordShowed ? imgClosseEye : imgOneEye})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></label>
      <input
        type="checkbox"
        onChange={() => setPasswordShowed(!passwordShowed)}
        value={passwordShowed}
        id="toggle_input_password"
        style={{ visibility: "hidden" }}
      />
    </>
  );
}


export default InputPassword;
