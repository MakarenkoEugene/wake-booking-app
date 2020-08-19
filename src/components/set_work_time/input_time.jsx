import React from "react";

function SelectColumn({ listValues, selectedValue, onChangeValue }) {
  return (
    <ul style={{ width: "50px" }}>
      {listValues.map((value) => (
        <li
          key={value}
          style={{
            cursor: "pointer",
            padding: "6px",
            margin: "1px",
            border: "1px solid #e3e3e3",
            borderRadius: "3px",
            backgroundColor: value === selectedValue ? "#0074ff" : "#fff",
          }}
          onClickCapture={() => onChangeValue(value)}
          onMouseOver={(e) => {
            e.preventDefault();
            value !== selectedValue && (e.target.style.backgroundColor = "#e3e3e3");
          }}
          onMouseOut={(e) => {
            e.preventDefault();
            value !== selectedValue && (e.target.style.backgroundColor = "#fff");
          }}
        >
          {value < 10 ? `0${value}` : value}
        </li>
      ))}
    </ul>
  );
}

class InputTime extends React.Component {
  static getHoursList({ min, max }) {
    const arrLenght =
      typeof min === "number" ? 24 - Math.floor(min / 60) - 1 : typeof max === "number" ? Math.floor(max / 60) : 24;
    return Array(arrLenght)
      .fill(null)
      .map((elem, i) =>
        typeof min === "number"
          ? Math.floor(min / 60) + i + 1
          : typeof max === "number"
          ? Math.floor(max / 60) - i - 1
          : i
      )
      .sort((a, b) => a - b);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.step !== state.step || props.max !== state.max || props.min !== state.min) {
      return {
        step: props.step,
        min: props.min,
        max: props.max,
        hoursList: InputTime.getHoursList({ min: props.min, max: props.max }),
        minutesList: Array(60 / props.step)
          .fill(null)
          .map((elem, i) => props.step * i),
      };
    }
    return null;
  }

  // step, min, max
  constructor(props) {
    super();
    this.state = {
      step: props.step,
      min: props.min,
      max: props.max,
      showTimeList: false,
      hoursList: InputTime.getHoursList({ min: props.min, max: props.max }),
      minutesList: Array(60 / props.step)
        .fill(null)
        .map((elem, i) => props.step * i),
    };
    this.ref = null;
  }

  render() {
    const { value, onChangeValue } = this.props;
    const { showTimeList, hoursList, minutesList } = this.state;

    const hour = value ? Math.floor(value / 60) : 0;
    const minute = value ? value % 60 : 0;

    return (
      <div
        ref={(elem) => (this.ref = elem)}
        style={{ position: "relative", width: "100px", fontSize: "18px", fontSize: "0.9em" }}
        onFocus={() => this.setState({ showTimeList: true })}
      >
        <label style={{ padding: 0, margin: 0 }}>
          <input
            type="text"
            style={{ width: "80px", fontSize: "20px", letterSpacing: "2px", fontSize: "1em" }}
            readOnly={true}
            value={`${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`}
          />
          <svg
            viewBox="64 64 896 896"
            data-icon="clock-circle"
            width="1em"
            style={{ position: "absolute", right: "5px", top: "8px" }}
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
            <path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path>
          </svg>
        </label>
        {showTimeList && (
          <>
            <div
              onClick={() => this.setState({ showTimeList: false })}
              style={{ position: "fixed", height: "100%", width: "100%", top: "0px", left: "0px", zIndex: 1 }}
            ></div>
            <div
              style={{
                position: "absolute",
                top: 34,
                left: 0,
                zIndex: 2,
                width: "112px",
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#fff",
                border: "1px solid #000",
                textAlign: "center",
                overflow: "scroll",
                height: "200px",
                boxShadow: "0px 5px 10px -4px #000",
                borderRadius: "3px",
              }}
            >
              <SelectColumn
                listValues={hoursList}
                selectedValue={hour}
                onChangeValue={(hour) => onChangeValue(hour * 60 + minute)}
              />

              <SelectColumn
                listValues={minutesList}
                selectedValue={minute}
                onChangeValue={(minute) => onChangeValue(hour * 60 + minute)}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}

export default InputTime;
