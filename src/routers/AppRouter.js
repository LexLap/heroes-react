import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import LoginContextProvider from '../context/LoginContext';
import PrivateRoute from './PrivateRoute';
import App from '../components/App';
import LoginForm from '../components/login/LoginForm';
import SubscribeForm from '../components/login/SubscribeForm';

const AppRouter = () => (
    <BrowserRouter>
        <LoginContextProvider>

            <Header />

            <Routes>

                <Route path="*" element={<Navigate replace to="/heroes" />} />

                <Route exact path='/heroes' element={<PrivateRoute />}>
                    <Route exact path='/heroes' element={<App />} />
                </Route>

                <Route exact path='/login' element={<LoginForm />} />
                <Route exact path='/register' element={<SubscribeForm />} />

            </Routes>

        </LoginContextProvider>
    </BrowserRouter>
)

export default AppRouter;