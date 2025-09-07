import React from 'react';
import './Path.css';

const Path: React.FC = () => (
  <div className='path'>
    <nav aria-label="breadcrumb" className="main-breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href="/">Home</a></li>
        <li className="breadcrumb-item"><a href="#">User</a></li>
        <li className="breadcrumb-item active" aria-current="page">Profile Settings</li>
      </ol>
    </nav>
  </div>
);

export default Path;
