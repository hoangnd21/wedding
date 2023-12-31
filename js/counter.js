(function ($) {

  $.fn.downCount = function (options, callback) {
    const settings = $.extend({
      date: '12/03/2023 01:30:00',
      offset: 2
    }, options);

    // Throw error if date is not set
    if (!settings.date) {
      $.error('Date is not defined.');
    }

    // Throw error if date is set incorectly
    if (!Date.parse(settings.date)) {
      $.error('Incorrect date format, it should look like this, 12/24/2012 12:00:00.');
    }

    // Save container
    const container = this;
    /**
     * Change client's local date to match offset timezone
     * @return {Object} Fixed Date object.
     */
    const currentDate = function () {
      // get client's current date
      const date = new Date();

      // turn date to utc
      const utc = date.getTime() + (date.getTimezoneOffset() * 60000);

      // set new Date object
      const new_date = new Date(utc + (3600000 * settings.offset))
      return new_date;
    };

    /**
     * Main downCount function that calculates everything
     */
    function countdown() {
      const target_date = new Date(settings.date), // set target date
        current_date = currentDate(); // get fixed current date
      // difference of dates
      const difference = target_date - current_date;

      // if difference is negative than it's pass the target date
      if (difference < 0) {
        // stop timer
        clearInterval(interval);
        if (callback && typeof callback === 'function') callback();
        return;
      }
      // basic math variables
      const _second = 1000,
        _minute = _second * 60,
        _hour = _minute * 60,
        _day = _hour * 24;

      // calculate dates
      let days = Math.floor(difference / _day),
        hours = Math.floor((difference % _day) / _hour),
        minutes = Math.floor((difference % _hour) / _minute),
        seconds = Math.floor((difference % _minute) / _second);

      // fix dates so that it will show two digets
      days = (String(days).length >= 2) ? days : '0' + days;
      hours = (String(hours).length >= 2) ? hours : '0' + hours;
      minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
      seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;

      // based on the date change the refrence wording
      const ref_days = 'ngày',
        ref_hours = 'giờ',
        ref_minutes = 'phút',
        ref_seconds = 'giây';

      // set to DOM
      container.find('.days').text(days);
      container.find('.hours').text(hours);
      container.find('.minutes').text(minutes);
      container.find('.seconds').text(seconds);

      container.find('.days_ref').text(ref_days);
      container.find('.hours_ref').text(ref_hours);
      container.find('.minutes_ref').text(ref_minutes);
      container.find('.seconds_ref').text(ref_seconds);
    };

    // start
    const interval = setInterval(countdown, 1000);
  };

})(jQuery);
