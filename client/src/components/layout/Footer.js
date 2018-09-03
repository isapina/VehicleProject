import React from 'react';

const Footer = (props) => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center footer">
      Copyright &copy; {new Date().getFullYear()} VehicleProject
    </footer>
  );
};

export default Footer;