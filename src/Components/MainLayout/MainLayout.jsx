import { Outlet } from 'react-router-dom';
import cls from './MainLayout.module.css';
import { Header } from '../Header/Header';
import { ToastContainer } from 'react-toastify';
import { Suspense } from 'react';
import { Loader } from '../Loader';

export const MainLayout = () => {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <div className={cls.mainLayout}>
                <Header />

                <main className={cls.main}>
                    <Suspense fallback={<Loader/>}>
                        <Outlet />
                    </Suspense>

                </main>

                <footer className={cls.mainFooter}>
                    React Question Cards Application &copy; {currentYear} <br />
                    by Firdavs
                </footer>
            </div>
            <ToastContainer />
        </>
    );
};

