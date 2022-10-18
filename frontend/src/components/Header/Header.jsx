import React from "react";
import Button from "../Button/Button";
import "./Header.css";

const tg = window.Telegram.WebApp;

const Header = () => {
  const handleClick = () => tg.close();

  return (
    <div className={"header"}>
      <Button onClick={handleClick}>Закрыть</Button>
      <span className={"username"}>{tg.initDataUnsafe?.user?.username}</span>
    </div>
  );
};
export default Header;
