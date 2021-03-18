import React, {
  useState, MouseEventHandler 
} from "react";

import styles from './style.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faCircle, } from '@fortawesome/free-solid-svg-icons'

const NetworkSpeedConverter = () => {

  console.log(faCircle);

  return <div className={styles.background}>
    <div className={styles.container}>
      <div className={styles["card-header"]}>
        Network Speed Converter
      </div>
      <div className={styles["card-body"]}>
        <div className={styles["card-body"]}>
          <div className={styles["unit-control"]}>
          <div className={styles["unit"]}>Mbps</div>
            <span className={`${styles["exchange-icon"]} fa-fw fa-stack`}>
              <i className={`far fa-circle fa-stack-2x`} ></i>
              <i className={`fas fa-exchange-alt fa-stack-1x`}></i>
            </span>

            <div className={styles["unit"]}>Mb/s</div>
          </div>
          <div className={styles["converter"]}>
            <div className={styles["flex-1"]}>
              <div className={styles["converter-title"]}>Set</div>
              <input type="number" className={styles["input-number"]} min="0" />
            </div>

            <span className={`${styles["angle-icon"]} fa-2x`} style={{ marginTop: "30px" }}>
              <i className={`fas fa-angle-right`}></i>
            </span>

            <div className={`${styles["text-right"]} ${styles["flex-1"]}`}>
              <div className={styles["converter-title"]}>Show</div>
              <input type="text" className={`${styles["input-number"]} ${styles["text-right"]}`} value="125" disabled />
            </div>
          </div>
        </div>
      </div>
      <div className={styles["card-footer"]}>
        Fast
      </div>
    </div>
  </div>
}

export default NetworkSpeedConverter;