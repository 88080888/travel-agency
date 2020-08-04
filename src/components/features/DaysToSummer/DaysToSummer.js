import React from 'react';
import styles from './DaysToSummer.scss';
import {formatDays} from '../../../utils/formatDays';

class DaysToSummer extends React.Component {

  constructor(){
    super();

    /* run this.forceUpdate() every day */
    setInterval(() => this.forceUpdate(), 24 * 60 * 60 * 1000);
  }

  getCountdownDays() {
    const currentTime = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const nextHoliday = new Date(Date.UTC(currentTime.getUTCFullYear(), 5, 21, 0, 0, 0));

    //console.log(currentTime.getUTCDate());
    if ((currentTime.getUTCMonth() == 5 && currentTime.getUTCDate() >= 21) || currentTime.getUTCMonth() > 5) {
      nextHoliday.setFullYear(currentTime.getUTCFullYear() + 1);
    }

    if ((currentTime.getUTCMonth() == 5 && currentTime.getUTCDate() >= 21) || currentTime.getUTCMonth() == 6 || currentTime.getUTCMonth() == 7 || (currentTime.getUTCMonth() == 8 && currentTime.getUTCDate() < 23)) {
      return '';
    } else {
      return Math.round(Math.abs(nextHoliday.getTime() - currentTime.getTime())/oneDay);
    }
  }

  render() {
    return (
      <div className={styles.component}>
        <h3 className={styles.daysDescription}>{formatDays(this.getCountdownDays())}</h3>
      </div>
    );
  }

}

export default DaysToSummer;