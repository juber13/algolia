import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[#000] p-8 max-w-6xl m-auto'>
      <ul className='flex text-white item-center justify-center gap-4 text-xs  place-items-center'>
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