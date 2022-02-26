import React from 'react';
import styles from './styles/Footer.module.scss';
import { logo } from '../../images';

const Index = () => {
    return (
        <footer className={styles.footer}>
            <div className={`${styles.container_x_md} ${styles.container_y_3}`}>
                <div className={styles.flex_content}>
                    <div className={styles.logo_content}>
                        <img className={styles.logo} src={logo} alt="cine logo" />

                        <p>Live cinematic information</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Index;
