import React, { Component } from "react";

class InputPhone extends Component {
  constructor(props) {
    super(props);
    this.state = { telValue: "+380" };
  }

  onInputValue(e) {
    e.preventDefault();
    if (
      !isNaN(+e.target.value) &&
      e.target.value.slice(-1) !== " " &&
      e.target.value.length < 14 &&
      e.target.value.length > 3
    ) {
      const { onChangeValue } = this.props;

      onChangeValue({ value: e.target.value, valid: e.target.validity.valid });
    }
  }

  render() {
    const { telValue } = this.state;
    const { autoFocus, label, required, inputRef, value } = this.props;

    return (
      <label style={{ marginRight: "20px" }}>
        {label && label}
        <input
          type="tel"
          autoFocus={autoFocus}
          value={value.value}
          onChange={(e) => this.onInputValue(e)}
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
}

export default InputPhone;
