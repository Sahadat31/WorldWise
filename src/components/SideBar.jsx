import style from './SideBar.module.css'
import Logo from './Logo'
import AppNav from './AppNav'
import { Outlet } from 'react-router-dom'
export default function SideBar () {
    return <div className={style.sidebar}>
        <Logo/>
        <AppNav/>
        <Outlet/>
        <footer className={style.footer}>
            <p className={style.copyright}>
                &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
            </p>
        </footer>
    </div>
}