// src/components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-200 p-4 shadow w-full ">
      <h1 className="text-3xl font-bold text-gray-800 max-w-6xl mx-auto w-full h-full">Election 2024</h1>
      <nav className="mt-2">
        {/* <ul className="flex justify-center space-x-4">
          <li><a className="text-gray-700 hover:text-gray-900" href="#">Personal</a></li>
          <li><a className="text-gray-700 hover:text-gray-900" href="#">Local</a></li>
          <li><a className="text-gray-700 hover:text-gray-900" href="#">National</a></li>
        </ul> */}
      </nav>
    </header>
  );
};

export default Header;
