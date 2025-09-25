import React from "react";
import { useNavigate } from "react-router-dom";
import cls from "./Header.module.css"; // CSS Module
import { Button } from "../Button/Button"; // MUI dan Button
import ReactLogo from "../../assets/react.svg"; // Rasmni moslashtiring
import { useAuth } from "../../hooks/useAuth";
import { AUTH_STORAGE } from "../../constans";
import { ThemeToggler } from "../../features/ThemeToggler/ThemeToggler";

export const Header = () => {
    const navigate = useNavigate();
    const { isAuth, setIsAuth } = useAuth();

    const loginHandler = () => {
        localStorage.setItem(AUTH_STORAGE, !isAuth);
        setIsAuth(!isAuth);
    }
    return (
    <header className={cls.header}>
      <p onClick={() => navigate("/")}>
        <img src={ReactLogo} alt="react logo" />
        <span>ReactCards</span>
      </p>

      <div className={cls.headerButtons}>
        <ThemeToggler/>
        {isAuth && (
          <Button onClick={() => navigate("/addquestion")}>Add</Button>
        )}

        <Button onClick={loginHandler} isActive={!isAuth}>
          {!isAuth ? "Login" : "Logout"}
        </Button>
      </div>
    </header>
  );
};