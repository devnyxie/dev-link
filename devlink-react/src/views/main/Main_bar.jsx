import React, { useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { FiRefreshCcw } from 'react-icons/fi';
import { getTeams } from '../../Redux/Actions/teams';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { TOGGLE_SIDEBAR } from '../../Redux/Actions/ui';
import { PiSignInFill } from 'react-icons/pi';
import { MdAdd } from 'react-icons/md';
import GoBackButton from '../../components/GoBackButton/GoBackButton';

export default function Main_bar({ isLoggedIn, sidebar }) {
  const dispatch = useDispatch();

  const [dayAndTime, setDateAndTime] = useState('');
  useEffect(() => {
    const now = new Date();
    const current_day = now.toLocaleDateString('en-US', {
      weekday: 'long',
    });
    // Get the current hours and minutes
    const hours = now.getHours();
    const minutes = now.getMinutes();
    // Format the time as a 24-hour string
    const currentTime24h = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
    setDateAndTime(`${currentTime24h + ' | ' + current_day}`);
  });

  return (
    <div className='position-relative'>
      <div className='mx-2 border-gray-bottom p-2 d-flex justify-content-between align-items-center'>
        <div
          className=' d-flex align-items-center justify-content-start'
          style={{ width: '33.33%' }}
        >
          {dayAndTime}
        </div>
        <div
          className='lead d-flex align-items-center justify-content-center'
          style={{ width: '33.33%' }}
        >
          <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
            DevLink
          </Link>
        </div>
        <div className='d-flex justify-content-end' style={{ width: '33.33%' }}>
          {/* <HiChatAlt2
          size={30}
          className='rounded p-1 border-gray text-secondary ms-2'
        /> */}
          <FiRefreshCcw
            onClick={() => {
              dispatch(getTeams({ from: 0, to: 10 }));
            }}
            size={30}
            className='ico-button rounded p-1 border-gray text-secondary ms-2'
          />
          {isLoggedIn ? (
            <>
              <Link to='/new'>
                <MdAdd
                  size={30}
                  className='ico-button rounded p-1 border-gray text-secondary ms-2'
                />
              </Link>
              <AiOutlineUser
                size={30}
                className={`custom-button rounded p-1 border-gray text-secondary ms-2 ${
                  sidebar ? 'custom-button-active' : ''
                }`}
                onClick={() => {
                  dispatch({
                    type: TOGGLE_SIDEBAR,
                  });
                }}
              />
            </>
          ) : (
            <Link to='/login'>
              <PiSignInFill
                size={30}
                className='ico-button rounded p-1 border-gray text-secondary ms-2'
              />
            </Link>
          )}
        </div>
      </div>
      <GoBackButton />
    </div>
  );
}
