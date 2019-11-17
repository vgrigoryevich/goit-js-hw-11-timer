const DAYS = 1000 * 60 * 60 * 24;
const HOURS = 1000 * 60 * 60;
const MINUTES = 1000 * 60;
const SECONDS = 1000;

export class CountdownTimer {
  constructor({
    selector,
    targetDate
  }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.time = this.targetDate - Date.now();
  }
  getDays() {
    const days = Math.floor(this.time / DAYS);
    return days >= 1 ? Math.floor(days) : 0;
  }
  getHours() {
    const hours = Math.floor((this.time % DAYS) / HOURS);
    return hours >= 1 ? Math.floor(hours) : 0;
  }
  getMinutes() {
    const minutes = Math.floor((this.time % HOURS) / MINUTES);
    return minutes >= 1 ? Math.floor(minutes) : 0;
  }
  getSeconds() {
    const seconds = Math.floor((this.time % MINUTES) / SECONDS);
    return seconds >= 1 ? Math.floor(seconds) : 0;
  }
  transformToTwoDigits(value) {
    return value >= 10 ? value : `0${value}`;
  }
  startTimer() {
    const timer = setInterval(() => {
      this.time = this.targetDate - Date.now();
      if (this.time < 0) {
        clearInterval(timer);
        return
      };
      this.renderTimer();
    }, 1000);
  }
  renderTimer() {
    this.refs.days.innerHTML = this.transformToTwoDigits(this.getDays());
    this.refs.hours.innerHTML = this.transformToTwoDigits(this.getHours());
    this.refs.minutes.innerHTML = this.transformToTwoDigits(this.getMinutes());
    this.refs.seconds.innerHTML = this.transformToTwoDigits(this.getSeconds());
  }
  initTimer(pasteElement) {
    const createTimer = () => {
      return `<div class="timer" id="${this.selector.slice(1)}">
            <div class="field">
                <span class="value" data-value="days">${this.transformToTwoDigits(
                  this.getDays(),
                )}</span>
                <span class="label">Days</span>
            </div>
    
            <div class="field">
                <span class="value" data-value="hours">${this.transformToTwoDigits(
                  this.getHours(),
                )}</span>
                <span class="label">Hours</span>
            </div>
    
            <div class="field">
                <span class="value" data-value="mins">${this.transformToTwoDigits(
                  this.getMinutes(),
                )}</span>
                <span class="label">Minutes</span>
            </div>
    
            <div class="field">
                <span class="value" data-value="secs">${this.transformToTwoDigits(
                  this.getSeconds(),
                )}</span>
                <span class="label">Seconds</span>
            </div>
        </div>`;
    };
    pasteElement.insertAdjacentHTML('beforeend', createTimer());
    this.refs = {
      timer: document.querySelector(`${this.selector}`),
      days: document.querySelector('span[data-value="days"]'),
      hours: document.querySelector('span[data-value="hours"]'),
      minutes: document.querySelector('span[data-value="mins"]'),
      seconds: document.querySelector('span[data-value="secs"]'),
    };
    this.startTimer();
  }
}