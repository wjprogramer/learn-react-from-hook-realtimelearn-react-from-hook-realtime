# Hello Hook Notes

## Day 06

### React 畫面的重新渲染

兩個條件

1. 改變值的方法被呼叫
2. 被監聽的值有改變

## Day 09

`<React.Fragment>` 還可以縮寫成 `<>`

## Day 11

**⚠️ 重要補充：千萬不能在條件式（conditions）、迴圈（loops）或嵌套函式（nested functions）中呼叫 Hook 方法**

```jsx
// ❌ 錯誤使用，把 React Hooks 放到 if 內
const Counter = () => {
  if (isValidCounter <= 10) {
    const [count, setCount] = useState();
  }

  return {
    /* ... */
  };
};
```

之所以會有這樣的規定是因 React 組件（例如，`<Counter />`）每次在渲染或更新畫面時，都會呼叫產生這個組件的函式（`Counter()`），而**在 React Hooks 中會去記錄這些 Hooks 在函式中被呼叫的順序，以確保資料能夠被相互對應**，但若當我們將 Hooks 放到條件式或迴圈時，就會破壞了這些 Hooks 被呼叫到的順序，如此會造成錯誤。


## Day 12

[快速了解各組件的資料狀態 - React DevTools](https://ithelp.ithome.com.tw/articles/10222217)






