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

## Day 17

`useEffect` 這個方法的參數中需要帶入一個函式，而這個函式會在「畫面渲染完成」後被呼叫

組件渲染完後才會呼叫 `useEffect` 內的 function
組件渲染完後才會呼叫 `useEffect` 內的 function
組件渲染完後才會呼叫 `useEffect` 內的 function

你可以看到當我們使用 `useState` 提供的 `setSomething` 讓觸發畫面重新渲染時，`console.log` 顯示的順序和剛剛第一次載入網頁時的順序是一樣的，因此，不管這個組件是第一次渲染還是重新渲染 `useEffect` 內的 function 一樣會在組件渲染完後被呼叫。

---

`useEffect(<didUpdate>, [dependencies])`

第二個參數稱作 `dependencies`，它是一個陣列，**只要每次重新渲染後 dependencies 內的元素沒有改變，任何 useEffect 裡面的函式就不會被**執行！

所以 `useEffect` 內的函式會在組件渲染完成後被呼叫，現在多了一個前提：「**組件渲染完後，如果 dependencies 有改變，才會呼叫 `useEffect` 內的 function**」。具體來說是什麼意思呢？

**組件渲染完後，如果 dependencies 有改變，才會呼叫 `useEffect` 內的 function**
**組件渲染完後，如果 dependencies 有改變，才會呼叫 `useEffect` 內的 function**
**組件渲染完後，如果 dependencies 有改變，才會呼叫 `useEffect` 內的 function**

---

## 補充：useEffect 的 effect 指的是什麼

這個 **effect** 指的是 **副作用（side-effect）** 的意思，在 React 中會把畫面渲染後和 React 本身無關而需要執行的動作稱做「副作用」，這些動作像是「發送 API 請求資料」、「手動更改 DOM 畫面」等等。

副作用（side-effect）又簡稱為 **effect**，所以就使用 `useEffect` 這個詞。因為 `useEffect` 內帶入的函式主要就是要用來處理這些副作用，因此這些帶入 `useEffect` 內的函式也會被稱作 `effect`。

> 「手動更改 DOM 畫面」指的是透過瀏覽器原生的 API 或其他第三方套件去操作 DOM，而不是透過讓React 組件內 `state` 改變而更新畫面呈現的方式。

---







