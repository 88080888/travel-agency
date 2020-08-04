import React from 'react';
import styles from './HappyHourAd.scss';
import { formatTime } from '../../../utils/formatTime';

class HappyHourAd extends React.Component {
  constructor(){
    super();
  
    /* run this.forceUpdate() every second */
    setInterval(() => this.forceUpdate(), 1000);
  }

  getCountdownTime(){
    const currentTime = new Date();
    const nextNoon = new Date(Date.UTC(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), currentTime.getUTCDate(), 12, 0, 0, 0));
  
    if(currentTime.getUTCHours() >= 12){
      nextNoon.setUTCDate(currentTime.getUTCDate()+1);
    }
  
    return Math.round((nextNoon.getTime() - currentTime.getTime())/1000);
  }

  render(){
    let countDown = this.getCountdownTime();
    let formattedTime;
    if (countDown > 82800) {
      formattedTime = 'lorem ipsum';
    }
    else {
      formattedTime = formatTime(countDown);
    }

    return(
      <div className={styles.component}>
        <h3 className={styles.title}>Happy Hour</h3>
        <div className={styles.promoDescription}>{formattedTime}</div>
      </div>
    );
  }  
}  

export default HappyHourAd;