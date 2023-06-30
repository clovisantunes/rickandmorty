import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import logoImg from '../../../assets/logo.png';
import pickle from '../../../assets/pickleRick.png';

export default function Navbar(){
    return(
        <nav className={styles.navbar}>
            <div className={styles.logoContainer}>
                <Image src={logoImg} alt='Logo Rick and Morty' />
            </div>
            <div className={styles.pickleRick}>
                <Image src={pickle} alt='Pickle Rick' />
            </div>
        </nav>
    )
}