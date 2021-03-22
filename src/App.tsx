import logo from './logo.svg';
import './App.css';

import "./styles/plugins/index.module.scss";

import {
  Counter,
  NetworkSpeedConverter,
  WeatherApp,
} from "./components";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          從 Hooks 開始，讓網頁 React 起來
        </p>
        <a
          className="App-link"
          href="https://github.com/wjprogramer/learn-react-from-hook-realtimelearn-react-from-hook-realtime"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </header>

      {/* DEMO */}
      <Counter startingValue={5} />
      <NetworkSpeedConverter />
      <WeatherApp />
    </div>
  );
}

export default App;
