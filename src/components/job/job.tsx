import React, {useEffect} from 'react';
import {NavLink, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import styles from "./job.module.css"
import {Button, Loader} from "@mantine/core";
import JobElementLink from "../jobsElements/jobElementLink/jobElementLink";
import {getChoseJobThunk} from "../store/jobs";

const Job = () => {
    const Loading = useAppSelector(state => state.jobs.isLoading)
    const {id: userId} = useParams();
    const dispatch =useAppDispatch()
    useEffect(()=>{
        if(userId){
            dispatch(getChoseJobThunk(userId))
        }

    },[])
    const job= useAppSelector(state => state.jobs.choseJob)
    useEffect(()=>{
    },[job])
    useEffect(()=>{},[Loading])
    return (<div>{Loading ? <Loader   className={styles.main} size="xl" />:
        <div className={styles.main}>
            {job?<JobElementLink isFavorite={job.isFavorite} link="title" key={job.id} id={job.id} profession={job.profession} type_of_work={job.type_of_work} address={job.address} currency={job.currency} payment_from={job.payment_from} payment_to={job.payment_to}/>:<div></div>}

            {job?<div className={styles.vacancyRichText} dangerouslySetInnerHTML={{__html:job.vacancyRichText}}></div>:<div></div>}
        </div>}
        </div>
    );
};

export default Job;