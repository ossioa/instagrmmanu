import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, user }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-9000">
      <Navbar user={user} />
      <main className="flex-grow ">
        {children}
      </main>
    </div>
  );
};

export default Layout;
