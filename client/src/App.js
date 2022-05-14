import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; //allows dom to be multipage

import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';

const App = () => {

    return(
        <BrowserRouter>
            <Container maxWidth='lg'>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/auth' element={<Auth />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;