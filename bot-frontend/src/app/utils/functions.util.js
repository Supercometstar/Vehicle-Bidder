import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios'

import { baseURL } from './constants.util'

export const privateRoute = (Component) => {

  const _ = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    
    if (isAuthenticated) {
      return <Component />
    }else {
      return <Navigate to='/sign-in' />
    }
  }

  return <_ />

};

export const authHeader = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return { Authorization: 'Bearer ' + token };
  } else {
    return {};
  }
}

export const cometAPI = async (method, url, data={}) => {

  const api = axios.create({
      baseURL
  });

  try {
    let response
    if ([ 'get', 'delete' ].includes(method)) {
      response = await api[method](url, { headers: authHeader() });
    }else {
      response = await api[method](url, data, { headers: authHeader() })
    }
    return response.data;
  } catch (error) {
    
  }
};