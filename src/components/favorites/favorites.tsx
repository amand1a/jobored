import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {getFavoriteJobsThunk} from "../store/jobs";
import styles from "./favorites.module.css"
import JobElementLink from "../jobsElements/jobElementLink/jobElementLink";
import {Loader} from "@mantine/core";

const Favorites = () => {
    const Loading = useAppSelector(state => state.jobs.isLoading)
    const idFavoriteJobs = useAppSelector(state => state.jobs.favoriteJobs)
    const jobs = useAppSelector(state => state.jobs.jobs)
    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(getFavoriteJobsThunk(idFavoriteJobs))
    },[idFavoriteJobs])
    useEffect(()=>{},[jobs])
    useEffect(()=>{},[Loading])
    const jobsElement = jobs.map(elem=>{return<JobElementLink isFavorite={elem.isFavorite} link="link" key={elem.id} id={elem.id} profession={elem.profession} type_of_work={elem.type_of_work} address={elem.address} currency={elem.currency} payment_from={elem.payment_from} payment_to={elem.payment_to}/>})

    return (
        <div className={styles.body}>
            {Loading ? <Loader    size="xl" />:jobsElement.length === 0?<h2>Пусто)</h2>:jobsElement}
        </div>
    );
};

export default Favorites;