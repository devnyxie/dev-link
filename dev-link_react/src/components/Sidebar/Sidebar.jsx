import React, { useEffect } from 'react';
import './Sidebar.css';
import { AiOutlineStar, AiOutlineUser } from 'react-icons/ai';
import { LiaUsersSolid } from 'react-icons/lia';
import { PiUsersThreeLight } from 'react-icons/pi';
import { GiEarthAmerica } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { FiSettings } from 'react-icons/fi';
import { TOGGLE_SIDEBAR } from '../../Redux/Actions/ui';
import { IoLogOutOutline } from 'react-icons/io5';
import { logout } from '../../Redux/Actions/users';
function Sidebar({ user }) {
  const dispatch = useDispatch();
  return (
    <div className="d-flex flex-fill sidebar-wrapper">
      <div
        className="flex-fill"
        onClick={() => {
          dispatch({
            type: TOGGLE_SIDEBAR,
          });
        }}
      ></div>
      <div className="sidebar fade-in p-3 d-flex flex-column justify-content-between">
        <div className="d-flex flex-column justify-content-between h-100">
          <div>
            <div className="d-flex mb-2">
              <img
                style={{ width: '90px', aspectRatio: '1/1' }}
                className="border-gray rounded"
                src={user.pfp}
              />
              <div className="d-flex flex-column justify-content-end ms-1">
                <small className="opacity-75">@{user.username}</small>
                {user.name ? (
                  <div>
                    {user.name} {user.surname ? user.surname : ''}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="border-gray-top border-gray-bottom p-1 d-flex align-items-center custom-button">
              <AiOutlineUser
                size={18}
                className="me-1 light-gray"
                style={{ width: '20px' }}
              />
              Profile
            </div>
            <div className=" border-gray-bottom p-1 d-flex align-items-center custom-button">
              <PiUsersThreeLight
                size={20}
                className="me-1 light-gray"
                style={{ width: '20px' }}
              />
              My teams
            </div>
            <div className=" border-gray-bottom p-1 d-flex align-items-center custom-button">
              <FiSettings
                size={18}
                className="me-1 light-gray"
                style={{ width: '20px' }}
              />
              Settings
            </div>
          </div>
        </div>
        <div className="pb-2">
          <div
            className="border-gray-top border-gray-bottom p-1 d-flex align-items-center custom-button"
            onClick={() => dispatch(logout())}
          >
            <IoLogOutOutline
              size={18}
              className="me-1 text-danger"
              style={{ width: '20px' }}
            />
            Sign out
          </div>
        </div>

        <div className="w-100 border-gray rounded d-flex flex-column align-items-center justify-content-center light-gray p-2">
          <GiEarthAmerica size={40} />
          <span>Dev-Link</span>
          <small>v0.1.0</small>
          <small className="border-gray custom-button p-1 rounded d-flex align-items-center">
            Star on Git <AiOutlineStar className="ms-1" />
          </small>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
