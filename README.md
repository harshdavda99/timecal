import { useState } from 'react'
import { Link } from 'react-router-dom';

function HeaderNabBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
          <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
              <span className="text-2xl font-semibold dark:text-white">Flowbite</span>
            </div>

            {/* Hamburger Menu for Mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="lg:hidden p-2 w-10 h-10 text-gray-500 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>

            {/* Navigation Links - Centered in Desktop */}
            <div className="hidden lg:flex mx-auto space-x-8">
              <Link to="/" className="text-gray-900 hover:text-blue-700 dark:text-white">Home</Link>
              <Link to="/about" className="text-gray-900 hover:text-blue-700 dark:text-white">About</Link>
              <Link to="/about" className="text-gray-900 hover:text-blue-700 dark:text-white">About</Link>
              
              <Link to="/services" className="text-gray-900 hover:text-blue-700 dark:text-white">Services</Link>
              <Link to="/contact" className="text-gray-900 hover:text-blue-700 dark:text-white">Contact</Link>
            </div>

            {/* Buttons - Desktop */}
            <div className="hidden lg:flex space-x-3">
              <button className="px-4 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800">Get Started</button>
              <button className="px-4 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800">Get Login</button>
            </div>
          </div>

          {/* Mobile Menu - Fixed in Position */}
          {isOpen && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t dark:bg-gray-900">
              <ul className="flex flex-col items-center space-y-4 py-4">
                <li><Link to="/" className="text-gray-900 hover:text-blue-700 dark:text-white">Home</Link></li>
                <li><Link to="/about" className="text-gray-900 hover:text-blue-700 dark:text-white">About</Link></li>
                <li><Link to="/contact" className="text-gray-900 hover:text-blue-700 dark:text-white">Contact</Link></li>

                <li><Link to="/services" className="text-gray-900 hover:text-blue-700 dark:text-white">Services</Link></li>
                <li><Link to="/contact" className="text-gray-900 hover:text-blue-700 dark:text-white">Contact</Link></li>
                {/* Buttons in Mobile View */}
                <li><button className="px-4 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800">Get Started</button></li>
                <li><button className="px-4 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800">Get Login</button></li>
              </ul>
            </div>
          )}
        </nav>
    );
}

export default HeaderNabBar;
