import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer'; // Assurez-vous de créer ce composant

const Layout = ({ children, user }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-50">
      <Navbar user={user} />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default Layout;
