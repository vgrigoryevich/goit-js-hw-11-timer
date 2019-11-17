import {
  CountdownTimer
} from './timer.js'
import refs from './refs.js'
const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('12 31, 2019 00:00:00'),
});
timer.initTimer(refs.body)