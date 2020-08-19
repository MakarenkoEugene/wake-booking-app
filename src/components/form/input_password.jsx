import React, { Component } from "react";

import closseEye from "../../images/eye.svg";
import openEye from "../../images/openEye.svg";

class InputPassword extends Component {
  constructor(props) {
    super(props);
    this.state = { passwordShowed: false };
  }
  togglePasswordShowed() {
    const { passwordShowed } = this.state;

    this.setState({ passwordShowed: !passwordShowed });
  }
  render() {
    const { passwordShowed } = this.state;
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
            backgroundImage: `url(${passwordShowed ? closseEye : openEye})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        ></label>
        <input
          type="checkbox"
          onChange={() => this.togglePasswordShowed()}
          value={passwordShowed}
          id="toggle_input_password"
          style={{ visibility: "hidden" }}
        />
      </>
    );
  }
}

export default InputPassword;
