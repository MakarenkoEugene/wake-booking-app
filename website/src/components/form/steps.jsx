import React from "react";
import "./steps.scss";

export default function name({ activeStep = 1, steps }) {
  const listSteps = steps.map((step, i) => {
    return (
      <li key={step.text} className={i + 1 === activeStep ? "active_step" : ""}>
        <span>Шаг {i + 1}</span> <button>{step.text}</button>
      </li>
    );
  });

  return <ul id="steps">{listSteps}</ul>;
}
