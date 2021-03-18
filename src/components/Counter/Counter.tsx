import React, {
  useState, MouseEventHandler 
} from "react";

import styles from './style.module.scss';

enum Action {
  increment,
  decrement,
}

const Counter = () => {
  const [count, setCount] = useState(5);

  const handleClick = (type: Action): MouseEventHandler => {
    return () => setCount(type === Action.increment ? count + 1 : count - 1);
  };

  return (<div className={styles.background}>
    <div className={styles.container}>
      {count > 0 && <div
        className={`${styles['chevron']} ${styles["chevron-up"]}`}
        onClick={handleClick(Action.increment)}
      />}
      <div className={styles.number}>{count}</div>
      <div
        className={`${styles['chevron']} ${styles["chevron-down"]}`}
        style={{
          visibility: count >= 10 ? "hidden" : "visible",
        }}
        onClick={handleClick(Action.decrement)}
      />
    </div>
  </div>);
}

export default Counter;