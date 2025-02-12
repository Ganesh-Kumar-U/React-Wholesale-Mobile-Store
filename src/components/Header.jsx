import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaCaretDown, FaCaretUp, FaSearch } from 'react-icons/fa';
import { MdOutlineShoppingCart } from "react-icons/md";

import boostLogoorange from '../assets/Primary_Logo.png';

const Header = ({ cartCount }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Add your search functionality here
  };

  return (
    <header className="fixed top-0 w-full bg-white shadow-md py-3 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <img src={boostLogoorange} alt="Boost Mobile Logo" className="max-w-4/5 w-15 h-8" onClick={() => navigate('/')} />

        <div className="flex items-center space-x-10" style={{ width: "40%" }}>
  <div className="flex items-center border border-gray-300 rounded-customsearch h-12" style={{ width: "100%" }}>
    <FaSearch className='mx-2 text-search-grey' />
    <input
      type="text"
      placeholder="Search Boost Mobiles, Orders, IMEI Returns etc."
      value={searchQuery}
      onChange={handleSearch}
      className="px-2 py-2 rounded-custom focus:outline-none h-full"
      style={{ width: "100%" }}
    />
  </div>
</div>


        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/cart')}
            className="relative"
          >
            <MdOutlineShoppingCart className="text-xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-boost-orange text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            )}
          </button>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 bg-boost-grey text-black px-4 py-2 rounded-custom"
            >
              <span>John Doe</span>
              {isDropdownOpen ? <FaCaretUp /> : <FaCaretDown />}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-custom shadow-md">
                <ul>
                  <li className="px-4 py-2 hover:bg-boost-grey cursor-pointer">Profile</li>
                  <li className="px-4 py-2 hover:bg-boost-grey cursor-pointer">Settings</li>
                  <li className="px-4 py-2 hover:bg-boost-grey cursor-pointer">Logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
