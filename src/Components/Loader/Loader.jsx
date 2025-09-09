import cls from "./Loader.module.css";

export const Loader = () => {
    return <div className={cls.backdrop}>
        <span className={cls.loader}>Loader</span>
    </div>
}
export const SmallLoader = () => {
    return <div>
        <span className={cls.smallLoader}></span>
    </div>
}