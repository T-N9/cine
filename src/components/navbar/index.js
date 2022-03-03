import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { activeNavItem, toggleNavSM } from '../../redux/navActiveSlice';
import { MenuRounded, CloseRounded } from '@mui/icons-material';
import { logo } from '../../images';
import styles from './styles/NavBar.module.scss';

const navList = ["home", "movies", "series", "people", "browse"]

const NavBar = () => {
    // const [ toggle, setToggle ] = useState(false);
    const {current , logo_sm , nav_sm} = useSelector((state) => state.navActivate);
    const dispatch = useDispatch();

    function toggleHandler () {
        // setToggle(prev => !prev);
        dispatch(toggleNavSM());
    }

    const navItems = navList.map(item => {
        let path;
        if (item === "home") {
            path= "/";
        }else {
            path= `/${item}`;
        }
        return (
            <li onClick={() => {
                dispatch(activeNavItem(item));
                toggleHandler();
            }
            } key={navList.indexOf(item)} className={current === item ? `${styles.nav_item} ${styles.active}` : `${styles.nav_item}` }>
                <Link to={path}>
                    {item}
                </Link>
            </li>
        )
    });

    

    return (
        <nav className={logo_sm ? `${styles.nav_bar} ${styles.nav_small}` : `${styles.nav_bar}`}>
            <div className={`${styles.container_x_sm} ${styles.container_y_1}`}>
                <div className={styles.flex_box}>
                    <Link to="/" onClick={() => dispatch(activeNavItem("home"))}>
                        <img className={logo_sm ? `${styles.logo} ${styles.logo_small}` : `${styles.logo}`} src={logo} alt="CINE logo" />
                    </Link>

                    <div className={styles.nav_list}>
                        <ul className={nav_sm ? `${styles.nav_items} ${styles.active}` : `${styles.nav_items}`}>
                            {navItems}
                        </ul>

                        <button onClick={toggleHandler} className={`${styles.hide_on_desktop} ${styles.menu_btn}`}>
                            {
                                nav_sm ? <CloseRounded fontSize='large'/> :
                                <MenuRounded fontSize='large'/> 
                            }
                        </button>                       
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
