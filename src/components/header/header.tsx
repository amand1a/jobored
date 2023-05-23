import React from 'react';
import styles from './header.module.css';
import {NavLink} from "react-router-dom";
import { Anchor,Header } from '@mantine/core';


const HeaderComp = () => {
    return (
        <div >
            <Header className={styles.header} height={{ base: 50, md: 70 }} p="md">
                <div className={styles.logo}><h2>Jobored</h2></div>
            <NavLink className={styles.links} to={"/"}>
                Поиск вакансий
            </NavLink>
            <NavLink className={styles.links} to={"/favorites"}>
                избранное
            </NavLink>
        </Header>
        </div>
    );
};

export  default HeaderComp;