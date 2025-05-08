import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white py-6 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} StudentHub. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <p className="text-gray-600 text-sm flex items-center">
              Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> by Harshit
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;