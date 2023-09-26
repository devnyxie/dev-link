import React from 'react';
import { IoReturnDownBackSharp } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.css';

function GoBackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentRoute = location.pathname;
  const routesToGoBackFrom = ['/team', '/new', '/login'];
  const isCurrentRouteInList = routesToGoBackFrom.includes(currentRoute);

  const handleGoBack = () => {
    if (isCurrentRouteInList) {
      navigate(-1);
    }
  };
  return (
    <>
      {isCurrentRouteInList ? (
        <div className="go-back-btn bg-main" style={{ zIndex: 1 }}>
          <div
            style={{ width: 'max-content', height: '30px' }}
            className="custom-button p-1 border-gray d-flex justify-content-center align-items-center"
            onClick={handleGoBack}
          >
            <IoReturnDownBackSharp style={{ transform: 'rotate(90deg)' }} /> Go
            back
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default GoBackButton;
