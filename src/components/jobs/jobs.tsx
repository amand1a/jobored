import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './jobs.module.css';
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {getJobsThunk, IindustryDirectories} from "../store/jobs";
import {TextInput, ActionIcon, useMantineTheme, Select, Button, Loader, NumberInput, Pagination} from "@mantine/core";
import { IconSearch ,IconArrowLeft,IconArrowRight} from '@tabler/icons-react';
import {ButtonGroup} from "@mantine/core/lib/Button/ButtonGroup/ButtonGroup";
import JobElementLink from "../jobsElements/jobElementLink/jobElementLink";
import ReactPaginate from 'react-paginate';

const Jobs = () => {
    const total  = useAppSelector(state => state.jobs.total)
    const Loading = useAppSelector(state => state.jobs.isLoading)
    const industryDirectories = useAppSelector(state => state.jobs.industryDirectories)
    const jobs = useAppSelector(state => state.jobs.jobs)
    const theme = useMantineTheme();
    const dispatch = useAppDispatch()
    const [searchValue,setSearchValue]=useState<string>("")
    const [industryDirectori, setIndustryDirectori] = useState<string | null>(null);
    const [paymentFromValue,setPaymentFrom]=useState<number|"">("")
    const [paymentToValue,setPaymentTo] =useState<number|"">("")
    const [paginationValue,setPaginationValue] = useState<number>(1)
    const submit =()=>{
        setPaginationValue(1)
        if(industryDirectori){
        dispatch(getJobsThunk(1,searchValue,paymentFromValue+"",paymentToValue+"",industryDirectori))}
        else {
            dispatch(getJobsThunk(1,searchValue,paymentFromValue+"",paymentToValue+"",""))
        }
    }
    const onPaginationChange=(value:number)=>{
        setPaginationValue(value)
        if(industryDirectori){
            dispatch(getJobsThunk(value,searchValue,paymentFromValue+"",paymentToValue+"",industryDirectori))}
        else {

            dispatch(getJobsThunk(value,searchValue,paymentFromValue+"",paymentToValue+"",""))

        }
    }
    const defaultSearch=()=>{
        setIndustryDirectori(null)
        setPaymentFrom("")
        setPaymentTo("")
    }

    useEffect(()=>{
        dispatch(getJobsThunk(1,"","","",""))
    },[])
    useEffect(()=>{
    },[jobs,Loading])

    const jobsElement = jobs.map(elem=>{return<JobElementLink isFavorite={elem.isFavorite} link="link" key={elem.id} id={elem.id} profession={elem.profession} type_of_work={elem.type_of_work} address={elem.address} currency={elem.currency} payment_from={elem.payment_from} payment_to={elem.payment_to}/>})

    return (
        <div className={styles.body} >

            <div className={styles.filter}>
                <div className={styles.headerInFilter}><h2>Фильтры</h2>
                    <Button onClick={defaultSearch} variant="subtle" color="gray" size="xs" radius="xs">
                        Сбросить все x
                    </Button></div>


                <Select
                    data-elem="industry-select"
                    size="sm"
                    withinPortal
                    data={industryDirectories}
                    placeholder="Pick one"
                    label="отрасль"
                    clearable={false}
                    value={industryDirectori}
                    onChange={setIndustryDirectori}
                />
                <NumberInput data-elem="salary-from-input"
                    label="оклад"
                           size="md"
                             hideControls
                           placeholder="от"
                           value ={paymentFromValue}
                           onChange={(value:number|"")=>setPaymentFrom(value
                           )}>
                </NumberInput>
                <NumberInput
                    data-elem="salary-to-input"
                    mt="xs"
                    hideControls
                            value ={paymentToValue}
                           onChange={(value:number|"")=>setPaymentTo(value)}
                           size="md"
                           placeholder="до">
                </NumberInput>
                <Button data-elem="search-button" mt="md" radius="xl" size="md" compact onClick={submit}>Применить</Button>
            </div>

            <div className={styles.search}>
            <TextInput data-elem="search-input"
                       value={searchValue}
                       onChange={(event: ChangeEvent<HTMLInputElement>)=>setSearchValue(event.target.value)}
                icon={<IconSearch size="1.1rem" stroke={1.5} />}
                radius="xl"
                size="md"

                rightSection={
                <Button  data-elem="search-button" radius="xl" onClick={submit} size="xs">поиск</Button>
                }
                placeholder="искать вакансию"
                rightSectionWidth={80}/>
                {Loading ? <Loader  className={styles.Loader}  size="xl" />:jobsElement}
                {total <5?<></>:<div className={styles.Paginator}><Pagination value={paginationValue} onChange={onPaginationChange} total={total/5} /></div>}

            </div>

        </div>
    );
};

export default Jobs;