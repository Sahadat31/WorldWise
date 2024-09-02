import Map from "../components/Map";
import SideBar from "../components/SideBar";
import User from "../components/User";
import style from './AppLayout.module.css'
export default function AppLayout() {
    return <div className={style.app}>
        <SideBar/>
        <Map/>
        <User/>
    </div>
}