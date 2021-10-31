import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import storage from "./storage";

/*
    Hojas de stilo generales
*/
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import "@/css/MainStyle.css";
import "@/css/HeaderStyle.css";

import axios from "axios";
import VueAxios from "vue-axios";

axios.defaults.baseURL = "http://localhost:4000/api";

var token = localStorage.token;
if(token){
    axios.defaults.headers.common["Authorization"] = 'Bearer ' + token;
}

createApp(App)
    .use(router)
    .use(storage)
    .use(VueAxios, axios)
.mount("#app");
