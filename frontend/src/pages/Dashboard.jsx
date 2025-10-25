import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Profile from './Profile';
import Settings from './Settings';

const Dashboard = () => {
  const [selected, setSelected] = useState('');
  const [profileData, setProfileData] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await axiosPrivate.get('/auth/profile');
        if (response.status === 200) {
          console.log(response.data)
          setProfileData(response.data.user);

        }
      } catch (err) {
        console.log('Failed to fetch profile:', err);
      }
    };

    if (!profileData) getUserProfile(); 
  }, [axiosPrivate, profileData]);
   
  return (
    <div className="flex flex-col gap-8 p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center">Dashboard</h1>

      <div className="flex justify-center gap-6">
        <button
          onClick={() => setSelected('profile')}
          className={`px-5 py-2 rounded-xl font-semibold transition ${
            selected === 'profile'
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Profile
        </button>

        <button
          onClick={() => setSelected('settings')}
          className={`px-5 py-2 rounded-xl font-semibold transition ${
            selected === 'settings'
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Settings
        </button>
      </div>

      <hr className="border-gray-300" />

      <div className="mt-6">
        {selected === '' ? (
          <p className="text-center text-gray-500">Nothing Selected</p>
        ) : selected === 'profile' ? (
          <Profile profileData={profileData} />
        ) : (
          <Settings />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
