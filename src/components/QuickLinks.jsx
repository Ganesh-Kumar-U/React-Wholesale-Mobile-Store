import React from 'react';
import { FaBox, FaQuestionCircle, FaUser, FaHistory, FaChartBar, FaUndo, FaCog, FaDownload, FaPlus } from 'react-icons/fa';
 
const QuickLinks = () => {
  const links = [
    { icon: <FaBox />, text: 'Inventory' },
    { icon: <FaQuestionCircle />, text: 'Help' },
    { icon: <FaUser />, text: 'Account' },
    { icon: <FaHistory />, text: 'Order History' },
    { icon: <FaChartBar />, text: 'Sales Report' },
    { icon: <FaUndo />, text: 'Returns' },
    { icon: <FaCog />, text: 'Settings' },
    { icon: <FaDownload />, text: 'Downloads' },
    { icon: <FaPlus />, text: 'Add' }
  ];
 
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 h-[300px]">
      <h3 className="text-sm font-medium mb-4">Quick Links</h3>
      <div className="grid grid-cols-3 gap-2">
        {links.map((link, index) => (
          <button
            key={index}
            className="flex flex-col items-center p-2 hover:bg-gray-50 rounded transition-colors"
          >
            <span className="text-lg mb-1 text-gray-600">{link.icon}</span>
            <span className="text-xs text-gray-600">{link.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
 
export default QuickLinks;
 
 
 