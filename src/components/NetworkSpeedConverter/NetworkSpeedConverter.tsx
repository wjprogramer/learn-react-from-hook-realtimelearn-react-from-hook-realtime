import React, {
  useState,
} from "react";

import Desinger from "../Designer";
import styles from './style.module.scss';

const UnitControl = () => {
  return <div className={styles["unit-control"]}>
    <div className={styles["unit"]}>Mbps</div>
    <span className={`${styles["exchange-icon"]} fa-fw fa-stack`}>
      <i className={`far fa-circle fa-stack-2x`} ></i>
      <i className={`fas fa-exchange-alt fa-stack-1x`}></i>
    </span>
    <div className={styles["unit"]}>Mb/s</div>
  </div>;
}

interface CardFooterProps {
  inputValue: number,
}

const CardFooter = (props: CardFooterProps) => {
  let { inputValue } = props;
  let criteria = {
    title: "",
    backgroundColor: "",
  };

  if (!inputValue) {
    criteria = {
      title: '---',
      backgroundColor: '#d3d8e2',
    };
  } else if (inputValue < 15) {
    criteria = {
      title: 'SLOW',
      backgroundColor: '#ee362d',
    };
  } else if (inputValue < 40) {
    criteria = {
      title: 'GOOD',
      backgroundColor: '#1b82f1',
    };
  } else if (inputValue >= 40) {
    criteria = {
      title: 'FAST',
      backgroundColor: '#13d569',
    };
  }

  return <div 
    className={styles["card-footer"]}
    style={{
      backgroundColor: criteria.backgroundColor
    }}
  >
    {criteria.title}
  </div>;
}

const NetworkSpeedConverter = () => {
  const [inputValue, setInputValue] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let number = parseInt(value);
    setInputValue(isNaN(number) ? 0 : number);
  };

  return <div className={styles.background}>
    <div className={styles.container}>
      <div className={styles["card-header"]}>
        Network Speed Converter
      </div>
      <div className={styles["card-body"]}>
        <div className={styles["card-body"]}>
          <UnitControl />
          <div className={styles["converter"]}>
            <div className={styles["flex-1"]}>
              <div className={styles["converter-title"]}>Set</div>
              <input 
                type="number"
                onChange={handleInputChange}
                value={inputValue}
                className={styles["input-number"]}
                min="0"
              />
            </div>

            <span className={`${styles["angle-icon"]} fa-2x`} style={{ marginTop: "30px" }}>
              <i className={`fas fa-angle-right`}></i>
            </span>

            <div className={`${styles["text-right"]} ${styles["flex-1"]}`}>
              <div className={styles["converter-title"]}>Show</div>
              <input 
                type="text" 
                className={`${styles["input-number"]} ${styles["text-right"]}`} 
                value={inputValue / 8}
                disabled 
              />
            </div>
          </div>
        </div>
      </div>
      <CardFooter inputValue={inputValue} />
    </div>
    <Desinger 
      name="Rizky" 
      link="https://dribbble.com/Rizkyedriansyah"
      workLink="https://dribbble.com/shots/4241423-Exchanger-landing-page"
    />
  </div>
}

export default NetworkSpeedConverter;