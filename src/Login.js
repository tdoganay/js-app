import { useState, useEffect } from 'react';
import { Navigate, useLocation, redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from "axios";
 
export default function Login({setLogin}) {
 
    const location = useLocation();

    const ghCode = new URLSearchParams(location.search).get('code');

    async function getGhAccessToken() {
        const ghClientService = axios.create({baseURL: "http://localhost:3500", timeout: 5000,});
        const { data } = await ghClientService.post('/auth-user', { ghCode: ghCode, ghAccessToken: Cookies.get('ghAccessToken') ? Cookies.get('ghAccessToken') : null });
        if (data.error) {
            console.log(data.error);
            setLogin(false);
        } else {
            Cookies.set('ghAccessToken', JSON.stringify(data.accessToken));
            Cookies.set('ghUsername', data.ghUser.login);
            Cookies.set('ghPfp', data.ghUser.avatar_url);
            Cookies.set('ghUserUrl', data.ghUser.html_url);
            Cookies.set('ghUsername', data.ghUser.login);
            Cookies.set('ghUserReposUrl', data.ghUser.repos_url);
            setLogin(true);
        }
    }
    useEffect(() => {
        if ((Cookies.get('ghAccessToken') == 'error' || !(Cookies.get('ghAccessToken')) || !(Cookies.get('ghUsername'))) && ghCode){
            getGhAccessToken();
        }
    }, []);
}