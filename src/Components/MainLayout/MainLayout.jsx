import { Outlet } from 'react-router-dom';
import cls from './MainLayout.module.css';
import { Header } from '../Header/Header';

export const MainLayout = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className={cls.mainLayout}>
            <Header/>

            <main className={cls.main}>
                <Outlet />
            </main>

            <footer className={cls.footer}>
                React Question Cards Application &copy; {currentYear} <br />
                by Firdavs
            </footer>
        </div>
    );
};

