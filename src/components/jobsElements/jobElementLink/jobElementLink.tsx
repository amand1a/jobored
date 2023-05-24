import React, {FC, MouseEventHandler} from 'react';
import styles from './jobElementLink.module.css';
import {NavLink, useNavigate} from "react-router-dom";
import { Button } from '@mantine/core';
import {useAppDispatch} from "../../hooks/hooks";
import {addFavoriteJobs, deleteFavoriteJobs} from "../../store/jobs";

interface IJobElementLink{
    id:string,
    profession : string,
    link:"link"|"title"
    address :string
    type_of_work : string
    payment_to : string
    payment_from : string
    currency : string
    isFavorite:boolean

}

const JobElementLink: FC<IJobElementLink> = ({isFavorite, link,id,profession,address,type_of_work,payment_from,payment_to,currency}:IJobElementLink) => {
    const navigate = useNavigate()
    const dispatch  = useAppDispatch()
    let currencyString ="";
    if(payment_from){
        currencyString+=` от ${payment_from}`
    }
    if(payment_to){
        currencyString += ` до ${payment_to}`
    }
    const like =(event:any)=>{
        dispatch(addFavoriteJobs(id))
        event.stopPropagation()
    }
    const unLike =(event:any)=>{
        dispatch(deleteFavoriteJobs(id))
        event.stopPropagation()
    }
    return (
        <div onClick={(event)=>{
            navigate(`/${id}`)}
        } data-elem={`vacancy-${id}`}  className={styles.body}>
            {isFavorite?<Button data-elem={`vacancy-${id}-shortlist-button`} className={styles.star} onClick={unLike} variant="subtle" ><span >&#9733;</span>  </Button>:
                <Button data-elem={`vacancy-${id}-shortlist-button`} className={styles.star} onClick={like} variant="subtle" color="gray"><span >&#9733;</span>  </Button>}

        <div className={styles.title}>
            <div className={styles.linkW}>
                {link === "link"?<NavLink onClick={(event)=>{event.stopPropagation()}} className={styles.link} to={`/${id}`}>{profession}</NavLink>:<p className={styles.profession}>{profession}</p>}
            </div>
            <div className={styles.currencyTitle}>
                <p className={styles.currency}>
                 з/п{currencyString?currencyString+" "+currency:" не указано"}
                </p>
                |
                <p className={styles.typeOfWork}>
                    {type_of_work}
                </p>
            </div>
            <div className={styles.location}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-map-pin" width="24"
                     height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                      strokeLinecap="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                    <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                </svg>

                {"  "+address}

            </div>

        </div>
        </div>
    );
};

export default JobElementLink;