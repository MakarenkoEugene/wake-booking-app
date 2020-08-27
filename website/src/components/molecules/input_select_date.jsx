import React, { useEffect, useRef, useState } from "react";

export default function InputSelectDate({ date, valid, onChangeDate, onChangeValid }) {
  const yearRef = useRef(null);
  const monthRef = useRef(null);
  const dayRef = useRef(null);
  const [massage, setMassage] = useState(null);

  const nowDate = new Date();
  const yearRange = 2;

  useEffect(() => {
    if (!date) {
      onChangeValid(null);
      setMassage(null);
      return;
    }

    if (!date.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
      onChangeValid(false);
      setMassage("Incorrect Date");
      return;
    }

    const year = +date.split("-")[0];

    if (!year || year > nowDate.getFullYear() + yearRange || year < nowDate.getFullYear()) {
      onChangeValid(false);
      setMassage("Incorrect Year In Date");
      return;
    }

    const month = +date.split("-")[1];

    if (!month || month > 12 || month < 1) {
      onChangeValid(false);
      setMassage("Incorrect Month In Date");
      return;
    }

    const isNowYear = nowDate.getFullYear() == year;

    if (isNowYear && month < nowDate.getMonth() + 1) {
      onChangeValid(false);
      setMassage("Month Is Passed");
      return;
    }

    const day = +date.split("-")[2];
    const dayInMonth = new Date(year, month, 0).getDate();

    if (!day || day > dayInMonth || day < 1) {
      onChangeValid(false);
      setMassage("Incorrect Day In Date");
      return;
    }

    const isNowMonth = isNowYear && nowDate.getMonth() + 1 == month;

    if (isNowMonth && day < nowDate.getDate()) {
      onChangeValid(false);
      setMassage("Day Is Passed");
      return;
    }

    setMassage(null);
    onChangeValid(true);
  }, [date]);

  const year = +date.split("-")[0] || "";
  const month = date.split("-")[1] || "";
  const day = +date.split("-")[2] || "";

  return (
    <div
      style={{
        margin: "20px 10px 40px 0px",
        borderRadius: "5px",
        border: `2px solid var(--${typeof valid === "boolean" ? (valid ? "blue" : "red") : "black"})`,
        padding: "1px",
        width: "216px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        display: "inline-block",
        position: "relative",
      }}
    >
      <span style={{ position: "absolute", top: "-23px", left: "0px" }}>
        <small style={{ fontSize: "0.7em" }}>Формат:</small> YYYY-M-D
      </span>

      <input
        style={{ border: "3px solid transparent", borderRadius: "5px", width: "56px" }}
        type="number"
        name=""
        ref={yearRef}
        min={nowDate.getFullYear()}
        max={nowDate.getFullYear() + yearRange}
        value={year}
        onChange={(e) => {
          e.preventDefault();

          if (e.target.value.length === 4) monthRef.current.focus();

          onChangeDate(`${e.target.value}-${date.split("-")[1] || ""}-${date.split("-")[2] || ""}`);
        }}
      />

      <input
        style={{ border: "3px solid transparent", borderRadius: "5px", width: "40px" }}
        type="number"
        min={nowDate.getFullYear() == year ? nowDate.getMonth() + 1 : 1}
        max="12"
        name=""
        ref={monthRef}
        value={month}
        onKeyDown={(e) => {
          if (e.key === "Backspace" && !month) {
            yearRef.current.focus();
          }
        }}
        onChange={(e) => {
          e.preventDefault();

          const value = e.target.value > 12 ? e.target.value.slice(-1) : e.target.value;

          if (value != 1 && value != "") dayRef.current.focus();

          onChangeDate(`${date.split("-")[0] || ""}-${value}-${date.split("-")[2] || ""}`);
        }}
      />

      <input
        style={{ border: "3px solid transparent", borderRadius: "5px", width: "42px" }}
        type="number"
        min="1"
        max="31"
        name=""
        ref={dayRef}
        value={day}
        onKeyDown={(e) => {
          if (e.key === "Backspace" && !day) {
            monthRef.current.focus();
          }
        }}
        onChange={(e) => {
          e.preventDefault();

          const dayInMonth = new Date(year, month, 0).getDate();

          const value = e.target.value > dayInMonth ? e.target.value.slice(-1) : e.target.value;

          onChangeDate(`${date.split("-")[0] || ""}-${date.split("-")[1] || ""}-${value}`);
        }}
      />

      {massage && (
        <span
          style={{
            position: "absolute",
            bottom: "-40px",
            padding: "5px 10px",
            left: "0px",
            backgroundColor: "var(--red)",
          }}
        >
          {massage}
        </span>
      )}
    </div>
  );
}
