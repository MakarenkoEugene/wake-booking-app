import React from "react";

function InputToggle({ label, checked, onChangeChecked }) {
  const id = label + Math.random();

  return (
    <div>
      <label style={{ lineHeight: "30px" }} htmlFor={id}>
        {label}
        <span
          style={{
            transition: "0.2s",
            cursor: "pointer",
            display: "inline-block",
            width: "50px",
            position: "relative",
            marginBottom: "-6px",
            height: "24px",
            borderRadius: "12px",
            backgroundColor: checked ? "var(--blue)" : "lightGray",
          }}
        >
          <span
            style={{
              display: "block",
              width: "24px",
              position: "absolute",
              right: checked ? "0px" : "auto",
              left: !checked ? "0px" : "auto",
              height: "24px",
              borderRadius: "12px",
              backgroundColor: "white",
              boxShadow: "0 1px 2px 0 rgba(34,36,38,.15), 0 0 0 1px rgba(34,36,38,.15) inset",
            }}
          ></span>
        </span>
      </label>
      <input
        onChange={() => onChangeChecked(!checked)}
        style={{ display: "none" }}
        type="checkbox"
        checked={checked}
        id={id}
      />
    </div>
  );
}

export default InputToggle;
