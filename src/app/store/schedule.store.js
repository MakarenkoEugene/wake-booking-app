import { makeAutoObservable } from 'mobx';
import moment from 'moment';
import { formatAndCompressSchedule, formatBeforePostRequest } from './schedule.helper'; // formatBeforeRemoveRequest

export default class ScheduleStore {
  option = [
    { idName: 'winchId', check: (v) => v !== this.rootStore.user.activePark._id, path: 'winch' },
    { idName: 'teacherId', check: () => false, path: 'teacher' },
    { idName: 'parkId', check: (v) => v === this.rootStore.user.activePark._id, path: 'park' },
  ];

  bufferDate = [];
  goal = {};
  calendarDate = '';
  daysInMonth = 0;
  dateArray = [];
  schedule = [];
  selected = [];

  constructor(rootStore) {
    this.rootStore = rootStore;

    this.formatSchedule = this.formatSchedule.bind(this);
    this.setSelected = this.setSelected.bind(this);

    makeAutoObservable(this);
  }

  setSelected(selected) {
    this.selected = selected;
  }

  formatSchedule() {
    const goalSchedule = (this.rootStore.user.activePark._id === this.goal.id
      ? this.rootStore.user.activePark?.schedule
      : this.rootStore.user.activePark.winches
        .find(({ _id }) => _id === this.goal.id)?.schedule) || [];

    this.schedule = formatAndCompressSchedule(goalSchedule, this.calendarDate);
  }

  setGoal({ name, id }) {
    this.setSelected([]);

    const { path, idName } = this.option.find(({ check }) => check(id));

    if (!idName) return new Error('Unhemdling goal');

    this.goal = { name, id, path, idName };

    this.getSchedule();

    return null;
  }

  setCalendarDate(date) {
    this.setSelected([]);

    this.calendarDate = date;

    this.daysInMonth = Number(moment(date).daysInMonth());

    this.dateArray = new Array(this.daysInMonth).fill('').map((v, i) => moment(date).date(i + 1));

    this.getSchedule();
  }

  async getSchedule() {
    if (!this.goal.id || !this.dateArray || !this.dateArray.length) return null;

    this.rootStore.ui.setLoading('root', true);

    const { idName, id, path } = this.goal;
    const res = await this.rootStore.ui.makeRequest('get', 'schedule', {
      [idName]: id,
      date: this.dateArray.map((d) => d.format('YYYY-MM-DD')),
    });

    if (!res) return this.rootStore.ui.setLoading('root', false);

    if (path === 'park') {
      const parkIndex = this.rootStore.user.parks.findIndex(({ _id }) => _id === id);

      this.rootStore.user.parks[parkIndex].schedule = res.data;
    }

    if (path === 'winch') {
      const winchIndex = this.rootStore.user.parks[this.rootStore.user.activeParkIndex]
        .winches.findIndex(({ _id }) => _id === id);

      this.rootStore.user.parks[this.rootStore.user.activeParkIndex]
        .winches[winchIndex].schedule = res.data;
    }

    this.formatSchedule();

    // console.log(JSON.parse(JSON.stringify(this.parks))[this.activeParkIndex].schedule);
    return this.rootStore.ui.setLoading('root', false);
  }

  async setSchedule(type) {
    this.rootStore.ui.setLoading('root', true);

    const data = formatBeforePostRequest(
      this.selected,
      this.calendarDate,
      this.rootStore.user.activePark.timeStep,
    );

    const { idName, id, path } = this.goal;

    const res = await Promise.all([...data]
      .map(([time, date]) => this.rootStore.ui
        .makeRequest('post', `schedule/${path}`, {
          type: type === 'remove' ? 'weekday' : type,
          date,
          time: type === 'remove' ? [] : JSON.parse(time),
          [idName]: id,
        })));

    console.log(res);

    await this.getSchedule();

    this.rootStore.ui.setLoading('root', false);
  }

  // TODO
  // async removeSchedule() {
  //   this.rootStore.ui.setLoading('root', true);

  //   const selectedDate = formatBeforeRemoveRequest(this.selected, this.calendarDate);

  //   const { path, id } = this.goal;
  //   const schedule = (() => {
  //     if (path === 'park') return this.rootStore.user.activePark.schedule;
  //     if (path === 'winch') return this.rootStore.user.activePark.winches
  // .find(({ _id }) => _id === id).schedule;
  //     // TODO
  //     if (path === 'teacher') return [];

  //     return [];
  //   })();

  //   const selectedSchedule = schedule.filter(({ date }) => selectedDate.includes(date));
  //   const selectedScheduleId = selectedSchedule.map(({ _id }) => _id);

  //   const res = await Promise.all(selectedScheduleId
  //     .map((scheduleId) => this.rootStore.ui.makeRequest('delete', 'schedule', { scheduleId })));

  //   console.log(res);

  //   await this.getSchedule();

  //   this.rootStore.ui.setLoading('root', false);
  // }
}
