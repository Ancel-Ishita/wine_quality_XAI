import React from 'react';
import { Wine } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Wine className="h-8 w-8 text-red-700" />
            <span className="ml-2 text-xl font-semibold text-gray-900">WineAI</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-base text-gray-400">
            © {new Date().getFullYear()} WineAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;