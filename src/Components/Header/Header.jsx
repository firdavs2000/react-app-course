import ReactLogo from "../../assets/react.svg"
import {Button} from '../Button/Button';
import cls from "./Header.module.css"

export const Header = () => {
    

    return (
        <header className={cls.header}>
            <p>
                <img src={ReactLogo} alt="react logo " />
                <span>ReactCards</span>
            </p>
            <div className={cls.headerButtons}>
                <button isActive>Add</button>
                <Button>Login</Button>
            </div>
        </header>
    )
};