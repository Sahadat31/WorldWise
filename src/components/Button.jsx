/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import style from './Button.module.css'
export default function Button ({children, onClick, type}) {
    return <button onClick={onClick} className={`${style.btn} ${style[type]}`}>
        {children}
    </button>
}