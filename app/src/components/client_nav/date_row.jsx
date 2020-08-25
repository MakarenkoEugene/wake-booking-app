import React from "react";
import { connect } from "react-redux";

import { toggleShowedDate, setRecentlySaved } from "../../action";

function DateRow({
  dateRecentlySaved,
  dateShowed,
  date,

  locale,
  timeZone,
  setRecentlySaved,
  toggleShowedDate,
}) {
  const localeStringDate = new Date(date).toLocaleString(locale, {
    day: "numeric",
    weekday: "short",
    month: "long",
    year: "numeric",
    timeZone,
  });

  const activeToggleShowedDate = () => {
    if (dateRecentlySaved) {
      setRecentlySaved(null);
    } else {
      toggleShowedDate(date);
    }
  };

  const onScrollToRef = (ref) => {
    if (dateRecentlySaved && ref)
      window.scrollTo({
        top: ref.getBoundingClientRect().top + pageYOffset - 250,
        behavior: "smooth",
      });
  };

  return (
    <tr>
      <th colSpan={5}>
        <button onClick={activeToggleShowedDate}>{dateRecentlySaved || dateShowed ? "▼" : "▶︎"}</button>
        <a ref={(ref) => onScrollToRef(ref)} onClick={activeToggleShowedDate}>
          {localeStringDate}
        </a>
      </th>
    </tr>
  );
}

const mapStateToProps = (store) => ({
  locale: store.config.config.locale,
  timeZone: store.config.config.timeZone,
});

const mapDispatchToProps = (dispatch) => ({
  setRecentlySaved: (recentlySaved) => dispatch(setRecentlySaved(recentlySaved)),
  toggleShowedDate: (date) => dispatch(toggleShowedDate(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DateRow);
