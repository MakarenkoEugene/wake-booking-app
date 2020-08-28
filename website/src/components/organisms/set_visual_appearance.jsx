import React from "react";
import { connect } from "react-redux";

import InputToggle from "../atoms/input_toggle";
import debounce from "../../assets/functions/debounce";

import { setShowIconsReserved, setValueForColor, discardSettingsColor } from "../../actions/app_settings";

const mapStateToProps = (store) => ({
  showIconsReserved: store.appSettings.config.showIconsReserved,
  colors: store.appSettings.config.color,
});

const mapDispatchToProps = (dispatch) => ({
  discardSettingsColor: () => dispatch(discardSettingsColor()),
  setValueForColor: (color, value) => dispatch(setValueForColor(color, value)),
  setShowIconsReserved: (showIconsReserved) => dispatch(setShowIconsReserved(showIconsReserved)),
});

function SetVisualAppearance({
  showIconsReserved,
  setShowIconsReserved,
  setValueForColor,
  discardSettingsColor,
  colors,
}) {
  const eColorLost = [];
  eColorLost.push(
    <tr key="headLine">
      <th>Name</th>
      <th>Value</th>
      <th>Set Value</th>
    </tr>
  );

  for (const color in colors) {
    const onChangeColor = debounce(([color, value]) => setValueForColor(color, value.slice(1)), 100);

    eColorLost.push(
      <tr key={color}>
        <td>{color}</td>
        <td>{colors[color]}</td>
        <td>
          <input
            type="color"
            name=""
            pattern={"#[0-9a-f]{6}"}
            onChange={(e) => onChangeColor(color, e.target.value)}
            value={`#${colors[color]}`}
          />
        </td>
      </tr>
    );
  }

  return (
    <div id="set_visual_appearance">
      <h3>Visual Appearance</h3>
      <InputToggle
        label={"Show Icons Reserved for teachers, winches and client: "}
        checked={showIconsReserved}
        onChangeChecked={setShowIconsReserved}
      />

      <br/>
      <h4>Настройка цвета для вашего приложения:</h4>

      <table>
        <tbody>{eColorLost}</tbody>
      </table>

      <button
        onClick={(e) => {
          e.preventDefault();
          discardSettingsColor();
        }}
      >
        Set Default Colors
      </button>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SetVisualAppearance);
