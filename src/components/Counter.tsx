import React, { useState } from "react";

import { css, jsx } from "@emotion/react";

const Counter = () => {
  const [count, setCount] = useState(5);

  return (<div>
    {count > 0 && <div
      onClick={() => {
        setCount(count - 1);
      }}
    >
      -
    </div>}
    <div>{count}</div>
    <div
      onClick={() => {
        setCount(count + 1);
      }}
      style={{
        visibility: count >= 10 ? "hidden" : "visible",
      }}
    >
      +
    </div>
  </div>);
}

export default Counter;