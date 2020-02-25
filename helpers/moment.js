const moment = require('moment');


moment.updateLocale('en', {
    relativeTime : {
      s  : '%ds',
      ss : '%ds',
      m:  "%dm",
      mm: "%dm",
      h:  "%dh",
      hh: "%dh",
      d:  "%dd",
      dd: "%dd",
      M:  "%dM",
      MM: "%dM",
      y:  "%dy",
      yy: "%dy"
    }
});

const shortenedFromNow = (ts) => {
  return moment(ts).fromNow(true);
};

module.exports = shortenedFromNow;
