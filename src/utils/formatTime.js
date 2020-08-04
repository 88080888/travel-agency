export const formatTime = (countdown) => {
  if (countdown == undefined) {
    return null;
  }

  else if (isNaN(countdown)) {
    return null;
  }

  else if (countdown < 0) {
    return null;
  }

  else {
    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    seconds = (seconds + Math.floor(countdown % 60) + '').padStart(2, '0');
    // console.log(seconds);
    minutes = (minutes + Math.floor((countdown / 60) % 60) + '').padStart(2, '0');
    // console.log(minutes);
    hours = (hours + Math.floor(countdown / 3600 ) + '').padStart(2, '0');
    // console.log(hours);

    return hours + ':' + minutes + ':' + seconds;
  }
};