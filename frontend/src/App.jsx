import React from 'react';
import Layout from './Layout';
import Home from './pages/Home';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Posts from './pages/posts';
import Postdetail from './pages/PostDetail';
import PostRegister from './pages/PostRegister';
import Login from './pages/login';
import Signup from './pages/signup';
import Profile from './pages/Profile';

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path='/posts' element={<Posts />}/>
        <Route path='/posts/register' element={<PostRegister />}/>
        <Route path="/posts/:id" element={<Postdetail />} />
        <Route path='/login' element={<Login></Login>}/>
        <Route path='/signup' element={<Signup></Signup>}/>
         <Route path='/profile' element={<Profile></Profile>}/>
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App
