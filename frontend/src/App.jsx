import React from "react";
import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import useTelegram from "./hooks/useTelegram";

const App = () => {
  const { tg, onToggleButton } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div className='App'>
      <Header />
      <button onClick={onToggleButton}>toggle</button>
    </div>
  );
};

export default App;
