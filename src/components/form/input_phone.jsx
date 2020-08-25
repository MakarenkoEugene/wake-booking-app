import React, { Component } from "react";

class InputPhone extends Component {
  constructor(props) {
    super(props);
    this.state = { telValue: "+380" };
<<<<<<< HEAD
  }

=======

    this.telInputRef = null;
    this.setTelInputRef = (element) => (this.telInputRef = element);
  }

>>>>>>> fd73a7a4c780ac691b15ad0cea22a298f1b72905
  onInputValue(e) {
    e.preventDefault();
    if (
      !isNaN(+e.target.value) &&
      e.target.value.slice(-1) !== " " &&
      e.target.value.length < 14 &&
      e.target.value.length > 3
    ) {
<<<<<<< HEAD
      const { onChangeValue } = this.props;

      onChangeValue({ value: e.target.value, valid: e.target.validity.valid });
=======
      this.setState({ telValue: e.target.value });
>>>>>>> fd73a7a4c780ac691b15ad0cea22a298f1b72905
    }
  }

  render() {
    const { telValue } = this.state;
<<<<<<< HEAD
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
=======
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
>>>>>>> fd73a7a4c780ac691b15ad0cea22a298f1b72905
    );
  }
}

export default InputPhone;
