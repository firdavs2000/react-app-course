import React from "react";
import { useNavigate } from "react-router-dom";
import cls from "./Header.module.css"; // CSS Module
import { Button } from "../Button/Button"; // MUI dan Button
import ReactLogo from "../../assets/react.svg"; // Rasmni moslashtiring

export const Header = () => {
    const navigate = useNavigate();

    return (
        <header className={cls.header}>
            <p onClick={() => navigate("/")}>
                <img src={ReactLogo} alt="react logo" />
                <span>ReactCards</span>
            </p>

            <div className={cls.headerButtons}>
                <Button onClick={() => navigate("/addquestion")}>Add</Button>
                <Button onClick={() => navigate("/login")}>Login</Button>
            </div>
        </header>
    );
};
