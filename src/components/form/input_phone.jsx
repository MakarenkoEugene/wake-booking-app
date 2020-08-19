import React, { Component } from "react";

class InputPhone extends Component {
  constructor(props) {
    super(props);
    this.state = { telValue: "+380" };

    this.telInputRef = null;
    this.setTelInputRef = (element) => (this.telInputRef = element);
  }

  onInputValue(e) {
    e.preventDefault();
    if (
      !isNaN(+e.target.value) &&
      e.target.value.slice(-1) !== " " &&
      e.target.value.length < 14 &&
      e.target.value.length > 3
    ) {
      this.setState({ telValue: e.target.value });
    }
  }

  render() {
    const { telValue } = this.state;
    const { autoFocus } = this.props;
    return (
      <>
        <label htmlFor="input_phone">Номер телефона:</label>
        <input
          type="tel"
          autoFocus={autoFocus}
          value={telValue}
          onChange={(e) => this.onInputValue(e)}
          ref={this.setTelInputRef}
          id="input_phone"
          pattern="^\+380[0-9]{9}$"
          title="+380995693132"
          required
        />

        <span className="text_help">
          ⚠️<span>Обязательное поле.</span>
        </span>
      </>
    );
  }
}

export default InputPhone;
