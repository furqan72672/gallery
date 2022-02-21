import axios from 'axios'

const axiosHandler = axios.create({
    // baseURL: 'http://192.168.88.90:3000',
    baseURL: 'http://192.168.100.212:4000',
    timeout: 10000,
    params: {} // do not remove this, its added to add params later in the config
});

axiosHandler.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    // console.log(token)
    if (token) {
        config.headers.common["Authorization"] = 'bearer ' + token;
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
});

axiosHandler.interceptors.response.use(
    res=>{
        if(res.status===200||res.status===201){
            return Promise.resolve(res);
        }
        else{
            return Promise.reject(res);
        }
    },
    error=>{
        if(error.response.status){
            switch(error.response.status){
                case 401:
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    // this.$router.push('/auth/sign-in')
            }
        }
    }
)

export default axiosHandler;
