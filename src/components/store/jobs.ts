import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {AppDispatch} from "./store";
import {AuthApi} from "../api/api";
import {json} from "react-router-dom";

// Define a type for the slice state
export interface IindustryDirectories{
    label: string,
    value: string,
}
export interface Ijob {
    profession:string,
    id:string,
    address:string,
    payment_from: string,
    payment_to: string,
    currency:string,
    firm_name:string
    type_of_work:string
    vacancyRichText:string
    isFavorite:boolean
}
interface CounterState {
    industryDirectories:IindustryDirectories[],
    jobs: Ijob[],
    favoriteJobs:string[],
    choseJob:Ijob|null,
    isLoading:boolean,
    total:number,

}

// Define the initial state using that type
const initialState: CounterState = {
    industryDirectories:[{label:"раз",
        value: "1",},{label: "два",
    value: "2",}],
    jobs:[],
    favoriteJobs:[],
    choseJob:null,
    isLoading:false,
    total:0,

}

export const jobsSlice = createSlice({
    name: 'jobs',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setTotal: (state,action:PayloadAction<number> ) => {
            state.total = action.payload
        },
        dataIsReceived: (state, ) => {
            state.isLoading = true
        },
        dataReceived: (state,) => {
            state.isLoading = false
        },
        setIndustryDirectories: (state, action: PayloadAction<IindustryDirectories[]>) => {
            state.industryDirectories = action.payload
        },
        setJobs: (state, action: PayloadAction<Ijob[]>) => {
            state.jobs = action.payload.map(elem=>state.favoriteJobs.includes(elem.id)?{...elem,isFavorite:true}:elem)
        },
        addFavoriteJobs: (state, action: PayloadAction<string>) => {
            state.favoriteJobs.push(action.payload)
            state.jobs = state.jobs.map(elem => elem.id == action.payload ?{...elem,isFavorite:true}:elem)
            if(state.choseJob){
                state.choseJob = state.choseJob.id == action.payload ?{...state.choseJob,isFavorite:true}:state.choseJob
            }
            const str = JSON.stringify(state.favoriteJobs)
            localStorage.setItem("favoriteJobs",str)

        },
        deleteFavoriteJobs: (state, action: PayloadAction<string>) => {
            state.favoriteJobs = state.favoriteJobs.filter(elem => elem !== action.payload)
            state.jobs = state.jobs.map(elem => elem.id == action.payload ?{...elem,isFavorite:false}:elem)
            if(state.choseJob){
                state.choseJob = state.choseJob.id == action.payload ?{...state.choseJob,isFavorite:false}:state.choseJob
            }
            const str = JSON.stringify(state.favoriteJobs)
            localStorage.setItem("favoriteJobs",str)
        },
        setChoseJob: (state, action: PayloadAction<Ijob>) => {
            state.choseJob = state.favoriteJobs.includes(action.payload.id)?{...action.payload,isFavorite:true}:action.payload
        },

    },
})

export const {setTotal, setIndustryDirectories,setJobs ,setChoseJob,addFavoriteJobs,deleteFavoriteJobs,dataReceived,dataIsReceived} = jobsSlice.actions

export const getJobsThunk=(count:number,keyword:string,payment_from:string,payment_to:string,catalogues:string)=>async (dispatch:AppDispatch)=>{
    dispatch(dataIsReceived())
    const  res = await AuthApi.getJobs(count,keyword,payment_from,payment_to,catalogues)
     const data = res.data.objects.map((elem:any)=>{return {id:elem.id,address:elem.town.title,
         profession:elem.profession,
         payment_from: elem.payment_from,
         payment_to: elem.payment_to,
         currency:elem.currency,
         firm_name:elem.firm_name,
         type_of_work:elem.type_of_work.title,
         vacancyRichText:elem.vacancyRichText,
         isFavorite:false}})
     dispatch(setJobs(data))
     dispatch(setTotal(res.data.total))

     dispatch(dataReceived())


}
export const getChoseJobThunk =(id:string)=> async (dispatch:AppDispatch)=>{
    dispatch(dataIsReceived())
    const res  = await AuthApi.getChoseJob(id)
    const data  = {id:res.data.id,
        address:res.data.town.title,
        profession:res.data.profession,
        payment_from: res.data.payment_from,
        payment_to: res.data.payment_to,
        currency:res.data.currency,
        firm_name:res.data.firm_name,
        type_of_work:res.data.type_of_work.title,
        vacancyRichText:res.data.vacancyRichText,
        isFavorite:false}
    dispatch(setChoseJob(data))
    dispatch(dataReceived())

}



export const getFavoriteJobsThunk =(idMassive:string[])=> async(dispatch:AppDispatch)=>{
    dispatch(dataIsReceived())
    const res = await AuthApi.getFavoritesJobs(idMassive)
    const data = res.data.objects.map((elem:any)=>{return {id:elem.id,address:elem.town.title,
        profession:elem.profession,
        payment_from: elem.payment_from,
        payment_to: elem.payment_to,
        currency:elem.currency,
        firm_name:elem.firm_name,
        type_of_work:elem.type_of_work.title,
        vacancyRichText:elem.vacancyRichText,
        isFavorite:true}})
    dispatch(setJobs(data))
    dispatch(setTotal(res.data.total))
    dispatch(dataReceived())
}

export const getIndustryDirectoriesThunk=()=> async (dispatch:AppDispatch)=>{
    dispatch(dataIsReceived())
    const res = await AuthApi.getIndustryDirectories()
    const data  = res.data.map((elem:any) =>{return {
        value:elem.key ,
        label:elem.title,
    }})
    dispatch(setIndustryDirectories(data))
    dispatch(dataReceived())
}


export default jobsSlice.reducer