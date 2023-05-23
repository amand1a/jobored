import  axios from "axios" ;

const instanseAuth = axios.create(
    {headers:{
            "x-secret-key":"GEU4nvd3rej*jeh.eqp",
            "X-Api-App-Id":"v3.r.137562393.d2a31b2252ed43f7fd9fd11e9744b93b0008782d.5240cb5bf557b6a05953b1e079b127223a8bbd9e"
        }}
)

const instanseNotAuth =axios.create(
    {headers:{
        "x-secret-key":"GEU4nvd3rej*jeh.eqp",

        }}
)

const AuthInterceptor = (config:any)=>{
    config.headers.authorization = `Bearer ${localStorage.getItem("access_token")}`
    return config
}


instanseAuth.interceptors.request.use(AuthInterceptor)



export const notAuth={
    getToken(){
        return instanseNotAuth.get("https://startup-summer-2023-proxy.onrender.com/2.0/oauth2/password/?login=sergei.stralenia@gmail.com&password=paralect123&client_id=2356&client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948&hr=0",
            )
    }
}

export const AuthApi ={
    getIndustryDirectories(){
        return instanseAuth.get("https://startup-summer-2023-proxy.onrender.com/2.0/catalogues/")
    },
    getJobs(page:number,keyword:string,payment_from:string,payment_to:string,catalogues:string){

            return instanseAuth.get(`https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/?published=1&keyword=${keyword}&payment_from=${payment_from}&payment_to=${payment_to}:string=${payment_to}&catalogues=${catalogues}&page=${page-1}&count=5`)


    },
    getChoseJob(id:string){
        return instanseAuth.get(`https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/${id}/`)
    },
    getFavoritesJobs(idMassive:string[]){
        const strMassive = idMassive.map(elem => `&ids[]=${elem}`)
        const str = strMassive.toString()
        return instanseAuth.get(`https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/?ids[]=${str}`)
    }
}