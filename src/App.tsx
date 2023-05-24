import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Header from "./components/header/header";
import Jobs from "./components/jobs/jobs";
import Job from "./components/job/job";
import HeaderComp from "./components/header/header";
import {useAppDispatch} from "./components/hooks/hooks";
import {addFavoriteJobs, getIndustryDirectoriesThunk} from "./components/store/jobs";
import Favorites from "./components/favorites/favorites";
import {notAuth} from "./components/api/api";

function App(){
    const dispatch = useAppDispatch()
    useEffect(()=>{
        const fetchData = async () => {

            const response = await notAuth.getToken();
            debugger
            const {access_token , refresh_token} = response.data
            localStorage.setItem("access_token",access_token)
            localStorage.setItem("refresh_token",refresh_token);
        }


        fetchData().catch(console.error);
        dispatch(getIndustryDirectoriesThunk())
        const str = localStorage.getItem("favoriteJobs")
        if(str){
            const massive = JSON.parse(str)
            massive.map((elem:any)=>{
                dispatch(addFavoriteJobs(elem))
            })
        }
        },[])
    /*useEffect(()=>{
        dispatch(getIndustryDirectoriesThunk())
        const str = localStorage.getItem("favoriteJobs")
        if(str){
            const massive = JSON.parse(str)
            massive.map((elem:any)=>{
                dispatch(addFavoriteJobs(elem))
            })
        }
    },[])*/



  return (
    <div className="App">
      <HeaderComp />
        <Routes>
            <Route path="/" element={ <Jobs/>}/>
            <Route path="/:id" element={ <Job/>}/>
            <Route path="/favorites" element={<Favorites/>}/>
        </Routes>
    </div>
  );
}

export default App;
