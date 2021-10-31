import { createStore } from 'vuex';
import router from '@/router';

const storage = createStore({
    state: {
        rolId: null,
        statusId: null,
        userId: null,
        userName: "",
        isAuthenticated: false,
    },
    mutations: {
        setAuthenticated(state, value) {
            state.isAuthenticated = value;
        },
        setUserData(state, { rolid, statusid, userid, username }) {
            state.userName = username;
            state.userId = userid;
            state.statusId = statusid;
            state.rolId = rolid;
        },
        logout(state) {
            state.isAuthenticated = false;
            
            state.rolId = null;
            state.statusId = null;
            state.userId = null;
            state.userName = "";

            localStorage.removeItem('token');

            router.push("/login");
        }
    },
});

export default storage;