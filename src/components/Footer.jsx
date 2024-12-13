import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[#000] p-8'>
      <ul className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 text-white text-xs gap-4 place-items-center'>
        <li>About</li>
        <li>Setting </li>
        <li>Help </li>
        <li>API Documentation</li> 
        <li>Hacker News</li>
        <li>Fork/Contribute </li>
        <li>Cool Apps</li>
      </ul>
    </div>  
  );
}

export default Footer