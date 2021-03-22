import React, {
  useState, MouseEventHandler 
} from "react";

import Desinger from "../Designer";
import styles from './style.module.scss';

enum Action {
  increment,
  decrement,
}

interface CounterProps {
  startingValue: number
}

const Counter = (props: CounterProps) => {
  const { startingValue } = props;

  const [count, setCount] = useState(startingValue);

  const handleClick = (type: Action): MouseEventHandler => {
    return () => setCount(type === Action.increment ? count + 1 : count - 1);
  };

  return (<div className={styles.background}>
    <div className={styles.container}>
      {count < 10 && <div
        className={`${styles['chevron']} ${styles["chevron-up"]}`}
        onClick={handleClick(Action.increment)}
      />}
      <div className={styles.number}>{count}</div>
      <div
        className={`${styles['chevron']} ${styles["chevron-down"]}`}
        style={{
          visibility: count <= 0 ? "hidden" : "visible",
        }}
        onClick={handleClick(Action.decrement)}
      />
    </div>

    <Desinger 
      name="Oleg Frolov" 
      link="https://dribbble.com/Volorf"
      workLink="https://dribbble.com/shots/5539678-Stepper-VI"
    />
  </div>);
}

export default Counter;