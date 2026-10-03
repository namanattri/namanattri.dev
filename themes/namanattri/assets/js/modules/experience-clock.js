const UNITS = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'];
const PADDED = new Set(['hours', 'minutes', 'seconds']);

/** Calendar difference between two dates, borrowing from the next larger unit. */
function elapsed(from, to) {
  const diff = {
    years: to.getFullYear() - from.getFullYear(),
    months: to.getMonth() - from.getMonth(),
    days: to.getDate() - from.getDate(),
    hours: to.getHours() - from.getHours(),
    minutes: to.getMinutes() - from.getMinutes(),
    seconds: to.getSeconds() - from.getSeconds(),
  };
  if (diff.seconds < 0) {
    diff.seconds += 60;
    diff.minutes -= 1;
  }
  if (diff.minutes < 0) {
    diff.minutes += 60;
    diff.hours -= 1;
  }
  if (diff.hours < 0) {
    diff.hours += 24;
    diff.days -= 1;
  }
  if (diff.days < 0) {
    diff.days += new Date(to.getFullYear(), to.getMonth(), 0).getDate();
    diff.months -= 1;
  }
  if (diff.months < 0) {
    diff.months += 12;
    diff.years -= 1;
  }
  return diff;
}

/** Ticks a clock showing the time elapsed since its `data-since` date. */
export function initExperienceClock(clock) {
  const since = new Date(clock.dataset.since);
  if (Number.isNaN(since.getTime())) {
    return;
  }
  const cells = Object.fromEntries(
    UNITS.map((unit) => [unit, clock.querySelector(`[data-unit="${unit}"]`)]),
  );

  function render() {
    const diff = elapsed(since, new Date());
    for (const unit of UNITS) {
      const value = String(diff[unit]);
      cells[unit].textContent = PADDED.has(unit) ? value.padStart(2, '0') : value;
    }
  }

  render();
  setInterval(render, 1000);
}
