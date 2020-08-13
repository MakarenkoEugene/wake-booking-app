import * as C from "../constants/";
import * as A from "../action/";

import moment from "moment";
import * as ServerW from "./server_workers";

export default (store) => (next) => async (action) => {
  switch (action.type) {
    case C.SET_DELAY_SEND_NEXT_SMS:
      let { needToWait } = action;

      if (needToWait) {
        const interval = setInterval(() => {
          needToWait -= 1000;
          if (needToWait <= 0) {
            next(A.setDelaySendNextSMS(0));
            clearInterval(interval);
          }

          next(A.setDelaySendNextSMS(needToWait));
        }, 1000);
      } else {
        next(action);
      }

      break;

    case C.SET_SELECTED_DATA_TO_BUFFER:
      try {
        const {
          selectedDate,
          selectedWinch: winchId,
          selectedTeacher: teacherId,
          selectedTimes,
          buffer: { winchTurn, teacherTurn },
        } = store.getState();

        const date = moment(selectedDate).format("YYYY-M-D");
        const dateTurn = selectedTimes.map((item) => ({ time: item }));

        const winchDateSaved = winchTurn.find((item) => item.date === date && item.winchId === winchId);

        if (winchDateSaved) {
          next(A.pushToBufferWinchTurn({ date, winchId, dateTurn: [dateTurn, winchDateSaved.dateTurn] }));
        } else {
          next(A.pushToBufferWinchTurn({ date, winchId, dateTurn }));
        }

        const teacherDateSaved = teacherTurn.find((item) => item.date === date && item.teacherId === teacherId);

        if (teacherDateSaved) {
          next(A.pushToBufferTeacherTurn({ date, teacherId, dateTurn: [dateTurn, teacherDateSaved.dateTurn] }));
        } else {
          next(A.pushToBufferTeacherTurn({ date, teacherId, dateTurn }));
        }
      } catch (error) {
        console.log(error);
      }

      break;

    case C.GET_WINCH_DATE_TURN:
      try {
        const { winchTurn } = store.getState().buffer;
        const { winchId, date } = action;

        const winchDateSaved = winchTurn.find((item) => item.date === date && item.winchId === winchId);

        if (!winchDateSaved) {
          next(A.setLoading(true));
          const { winchTurnDate } = await ServerW.getWinchTurnDate(winchId, date);
          const dateTurn = winchTurnDate ? winchTurnDate.dateTurn : [];

          next(A.pushToBufferWinchTurn({ date, winchId, dateTurn }));
        }
      } catch (error) {
        console.log(error);
      } finally {
        next(A.setLoading(false));
      }
      break;

    case C.GET_TEACHER_DATE_TURN:
      try {
        const { teacherTurn } = store.getState().buffer;
        const { teacherId, date } = action;

        const teacherDateSaved = teacherTurn.find((item) => item.date === date && item.teacherId === teacherId);

        if (!teacherDateSaved) {
          if (teacherId.length === 24) {
            next(A.setLoading(true));
            const { teacherTurnDate } = await ServerW.getTeacherTurnDate(teacherId, date);
            const dateTurn = teacherTurnDate ? teacherTurnDate.dateTurn : [];

            next(A.pushToBufferTeacherTurn({ date, teacherId, dateTurn }));

            next(A.setTeacherDateTurn(dateTurn));
          } else if (teacherId === "auto") {
            console.log("auto");
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        next(A.setLoading(false));
      }
      break;

    case C.SET_DATE_CONFIG:
      const loc = moment().locale(action.locale).utcOffset(action.utcOffset);

      next(A.setNowDate(loc.format()));
      next(A.setCalendarDate(loc.format()));
      next(A.setNowTime(loc.format("LTS")));

      setInterval(() => {
        const { locale, utcOffset } = store.getState().date;
        const nowTime = moment().locale(locale).utcOffset(utcOffset);
        next(A.setNowTime(nowTime.format("LTS")));
        if (!nowTime.second()) {
          next(A.setNowDate(nowTime.format()));
          if (!(nowTime.minute() % 30)) next(A.updateClientReservation());
        }
      }, 1000);

      next(action);
      break;

    case C.DECREASE_CALENDAR_DATE:
      try {
        const { calendarDate } = store.getState().date;
        const month = calendarDate.split("-")[1];

        next(
          A.setCalendarDate(
            moment(calendarDate)
              .month(Number(month) - 2)
              .format()
          )
        );
      } catch (error) {}
      break;

    case C.INCREASE_CALENDAR_DATE:
      try {
        const { calendarDate } = store.getState().date;
        const month = calendarDate.split("-")[1];

        next(A.setCalendarDate(moment(calendarDate).month(month).format()));
      } catch (error) {}
      break;

    case C.SET_CLIENT:
      next(action);
      if (action.client) next(A.updateClientReservation());
      break;

    default:
      next(action);
  }
};
