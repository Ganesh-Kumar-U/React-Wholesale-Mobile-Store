import React, { useState } from 'react';

const FilterSection = ({ title, options, isOpen, onToggle }) => {
  return (
    <div className="border-b pb-4">
      <button
        className="w-full flex justify-between items-center py-2"
        onClick={onToggle}
      >
        <span className="font-medium">{title}</span>
        <span>{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="mt-2 space-y-2">
          {options.map((option, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const Filters = () => {
  const [openSections, setOpenSections] = useState({
    deals: true,
    price: false,
    manufacturer: false,
    osType: false,
    color: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      <FilterSection
        title="Deals"
        options={['Free Phones', 'Free Year of Service', 'Infinite Access iPhone', 'Newly Released', 'On Sale']}
        isOpen={openSections.deals}
        onToggle={() => toggleSection('deals')}
      />
      <FilterSection
        title="Price"
        options={['$0-$200', '$201-$500', '$501-$800', '$801+']}
        isOpen={openSections.price}
        onToggle={() => toggleSection('price')}
      />
      <FilterSection
        title="Manufacturer"
        options={['Apple', 'Sony', 'Samsung', 'Google']}
        isOpen={openSections.manufacturer}
        onToggle={() => toggleSection('manufacturer')}
      />
      <FilterSection
        title="Os Type"
        options={['IOS', 'Android', 'GoogleOne', 'Windows']}
        isOpen={openSections.osType}
        onToggle={() => toggleSection('osType')}
      />
      {/* Add more filter sections as needed */}
    </div>
  );
};

export default Filters;