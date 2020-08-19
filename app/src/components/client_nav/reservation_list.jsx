import React from "react";
import { connect } from "react-redux";

import TimesList from "./times_list";
import DateRow from "./date_row";

function ReservationList({ reservationList, recentlySaved, showedDate }) {
  if (!reservationList || !reservationList.length) return <h4>no reserved time...</h4>;

  const sortReservationList = reservationList && reservationList.sort((a, b) => {
    const ar = a.date.split("-");
    const br = b.date.split("-");
    if (+ar[0] > +br[0]) return 1;
    if (+ar[0] < +br[0]) return -1;
    if (+ar[1] > +br[1]) return 1;
    if (+ar[1] < +br[1]) return -1;
    if (+ar[2] > +br[2]) return 1;
    if (+ar[2] < +br[2]) return -1;
    return 0;
  });

  return (
    <table>
      <caption>The time you have already booked</caption>
      {sortReservationList.map((item) => {
        const dateRecentlySaved = recentlySaved && recentlySaved.date === item.date;
        const dateShowed = showedDate.includes(item.date);

        return (
          <tbody key={item.date}>
            <DateRow date={item.date} dateRecentlySaved={dateRecentlySaved} dateShowed={dateShowed} />
            {(dateRecentlySaved || dateShowed) && (
              <>
                <tr>
                  <td>PARK</td>
                  <td>WINCH</td>
                  <td>TIME</td>
                  <td>TEACHER</td>
                  <td>DELETE</td>
                </tr>
                <TimesList date={item.date} timesList={item.timesList} />
              </>
            )}
          </tbody>
        );
      })}
    </table>
  );
}

const mapStateToProps = (store) => ({
  showedDate: store.clientNav.showedDate,
  recentlySaved: store.clientNav.recentlySaved,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ReservationList);
