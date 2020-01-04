// State object
import Axios from 'axios';
import AuthEndPoints from './../../helpers/AuthEndpoints';

const state = {
    token: localStorage.getItem('token') || '',
    user: {},
    status: '',
};

// Getter functions
const getters = {
    isLoggedIn: function (state){

        return state.token;
    },
    authSuccess: state => state.status
};

// Actions
const actions = {
    login( {commit} ,user){
        return new Promise((resolve, reject) => {
            commit('auth_request');
            Axios({
                    url: AuthEndPoints.tokenRequestEndpoint.url,
                    data: user,
                    method: AuthEndPoints.tokenRequestEndpoint.method
                }).then(r => {
                    let token = r.data.access_token;
                    localStorage.setItem('token', token);
                    Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                    commit('auth_success', token, user);
                    resolve(r);
                }).catch(error => {
                    commit('auth_error');
                    localStorage.removeItem('token');
                    reject(error);
                })
        })
    },
    register ({commit}, user){
        console.log(user);
        return new Promise((resolve, reject) => {
            Axios({
                url: AuthEndPoints.registerEndPoint.url,
                method: AuthEndPoints.registerEndPoint.method,
                data: user
            }).then(r => {
                resolve(r);
            }).catch(error => {
                reject(error)
            });
        })
    },
    logout({commit, getters}){
        if(getters.isLoggedIn){
            return new Promise((resolve, reject) => {
                Axios({
                    url: AuthEndPoints.logoutEndpoint.url,
                    method: AuthEndPoints.tokenRequestEndpoint.method,
                    headers: AuthEndPoints.logoutEndpoint.headers
                }).then(r => {
                    localStorage.removeItem('token');
                    delete Axios.defaults.headers.common['Authorization'];
                    commit('logout_success');
                    resolve(r);
                }).catch(error => {
                    commit('logout_success');
                    localStorage.removeItem('token');
                    delete Axios.defaults.headers.common['Authorization'];
                    reject(error)
                });

            })
        }
    }
};
// Mutations
const mutations = {
    auth_request(state){
        state.status = 'loading'
    },
    auth_success(state, token, user){
        state.status = 'success';
        state.token = token;
        state.user = user;

    },
    auth_error(state){
        state.status = 'error'
    },
    logout_request(state){
        state.status = 'loading'
    },
    logout_success(state){
        state.status = '';
        state.token = '';
    }
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}