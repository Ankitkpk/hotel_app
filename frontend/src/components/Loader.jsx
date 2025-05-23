import React, { useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router';

const Loader = () => {
  const { navigate } = useContext(AppContext);
  const { nexturl } = useParams();

  useEffect(() => {
    if (nexturl) {
      const timer = setTimeout(() => {
        navigate(`/${nexturl}`);
      }, 5000);

      return () => clearTimeout(timer); 
    }
  }, [nexturl, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="animate-spin h-24 w-24 border-4 border-gray-300 border-t-primary rounded-full" />
      <p className="text-gray-500 text-lg">Redirecting you, please wait...</p>
    </div>
  );
};

export default Loader;