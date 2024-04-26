// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Posts from './components/Posts';
import AddData from './components/posts/add_data';
import UpdateData from './components/posts/update_data';
import PreviewPost from './components/posts/preview_data';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div className="container-fluid">
      <br />
      {/* Menggunakan Link untuk membuat tautan */}
      <Link className="btn btn-primary" to="/posts">Go to Posts</Link>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rute untuk halaman beranda */}
        <Route path="/" element={<Home />} />
        
        {/* Rute untuk halaman artikel */}
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/add" element={<AddData />} />
        <Route path="/posts/update/:id" element={<UpdateData />} />
        <Route path="/posts/preview/:id" element={<PreviewPost />} />
      </Routes>
    </Router>
  );
};

export default App;
