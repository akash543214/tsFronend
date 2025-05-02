import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-600">&copy; 2025 Task Manager. All rights reserved.</p>
        <div className="mt-2 md:mt-0">
          <a href="#" className="text-gray-600 hover:text-gray-800 mx-2">Privacy Policy</a>
          <a href="#" className="text-gray-600 hover:text-gray-800 mx-2">Terms of Service</a>
          <a href="#" className="text-gray-600 hover:text-gray-800 mx-2">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
