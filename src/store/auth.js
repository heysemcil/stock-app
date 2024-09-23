import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { toast } from 'react-toastify';

const URL = process.env.REACT_APP_API_URL;
console.log(URL);

const initialState = {
  currentUser: sessionStorage.getItem('username') || null,
  token:
    sessionStorage.getItem('token') && atob(sessionStorage.getItem('token')),
  first_name: '',
  last_name: '',
  email: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    auth(state, action) {
      state.currentUser = action.payload.username;
      state.token = action.payload.token;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.email = action.payload.email;
    },
  },
});

// Async actions
export const register = (userInfo, navigate) => {
  return async (dispatch) => {
    try {
      // make request to API
      console.log(userInfo);
      const res = await axios.post(`${URL}/account/register/`, userInfo);
      // if no token
      if (!res?.data?.token) throw new Error('Something went wrong');
      // Update my global auth slice / state once recive the token
      const { token, username, last_name, email, first_name } = res?.data;
      const payload = { token, username, last_name, email, first_name };
      dispatch(authSlice.actions.auth(payload));
      // store the user information in session storange
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('first_name', first_name);
      sessionStorage.setItem('last_name', last_name);
      sessionStorage.setItem('email', email);
      // show a sucess notification that account was created
      toast.success('User registered Successfully !');
      // navigate the user
      navigate('/stock/profile');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
};

export const login = (userInfo, navigate) => {
  return async (dispatch) => {
    try {
      // make request to API
      const res = await axios.post(`${URL}/account/auth/login/`, userInfo);
      // if no token
      if (!res?.data?.key) throw new Error('Something went wrong');
      const {
        key,
        user: { username, is_superuser, first_name, last_name, email },
      } = res.data;
      // Update my global auth slice / state once recive the token
      const payload = {
        token: key,
        currentUser: username,
        first_name,
        last_name,
        email,
      };
      dispatch(authSlice.actions.auth(payload));
      // store the user information in session storange
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('token', key);
      sessionStorage.setItem('first_name', first_name);
      sessionStorage.setItem('last_name', last_name);
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('admin', is_superuser);
      // show a sucess notification that account was created
      toast.success('User Loggedin Successfully !');
      // navigate the user
      navigate('/stock/dashboard');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
};

export const logout = (navigate) => {
  return async (dispatch) => {
    try {
      const token = atob(sessionStorage.getItem('token'));
      const res = await axios.post(`${URL}/account/auth/logout/`, {
        headers: { Authorization: `Token ${token}` },
      });
      if (res.status === 200) {
        dispatch(
          authSlice.actions.auth({
            token: null,
            currentUser: null,
            first_name: '',
            last_name: '',
            email: '',
          })
        );
        sessionStorage.clear();
        toast.success('User successfully logged out !');
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
};

export const changePassword = (newPass) => {
  return async (dispatch) => {
    try {
      const token = sessionStorage.getItem('token');

      const res = await axios(`${URL}/account/auth/password/change/`, {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        data: newPass,
      });

      if (res.status === 200) {
        toast.success('Password Changed');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
};

export const authReducer = authSlice.reducer;
