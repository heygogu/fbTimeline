import Profile from './Profile';
import "../../app/styles.css"
import React from 'react';
const Header = () => {
  return (
    <div className="h-screen overflow-hidden">
      <div>
        <h1 className="header text-center text-5xl font-bold text-yellow-600 p-3 ">
          To Do App
        </h1>
      </div>
      <div>
        <Profile />
      </div>
    </div>
  );
};
export default Header;
