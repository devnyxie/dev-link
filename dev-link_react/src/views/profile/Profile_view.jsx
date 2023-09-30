import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneUser } from '../../Redux/Actions/users';
import { Col, Row } from 'react-bootstrap';
import UserPfp from '../../components/user_pfp/UserPfp';

function Profile_view({ logged_user }) {
  const dispatch = useDispatch();
  const { username } = useParams();
  const [user, setUser] = useState({});
  // const [alreadyMember, setAlreadyMember] = useState(false)
  useEffect(() => {
    if ((logged_user && username === logged_user.username) || !username) {
      // Code to handle the case when the username matches the logged user's username
      setUser(logged_user);
    } else {
      // Code to get another user
      dispatch(getOneUser({ username: username, setRes: setUser }));
    }
  }, []);
  return (
    <Row className="w-100 h-100 g-0">
      <Col className="p-2 pe-1" xs={12} md={6}>
        <div className="w-100 h-100 position-relative d-flex flex-column">
          <div
            className="border-gray rounded position-relative"
            style={{
              height: '225px',
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url(${user.banner})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div
              className="position-absolute mx-3 d-flex align-items-end"
              style={{ bottom: '-12.5%' }}
            >
              <UserPfp
                size="100px"
                pfp={user.pfp}
                img_classes="rounded border-gray"
              />
              <div className=" pb-4" style={{ paddingLeft: '5px' }}>
                <h4 className="m-0">{user.username}</h4>

                <div className="opacity-75">
                  {(user.name ? user.name : '') +
                    ' ' +
                    (user.surname ? user.surname : '')}
                </div>
              </div>
            </div>
          </div>
          <div
            className="h-100 w-100 rounded d-flex flex-column"
            style={{ paddingTop: '2rem' }}
          >
            <span className="small opacity-50 px-2">README.md</span>
            <div className="w-100 h-100 border-gray rounded"></div>
          </div>
        </div>
      </Col>
      <Col className="p-2 ps-1" xs={12} md={6}>
        <div
          className="border-gray w-100 h-100"
          style={{ borderRadius: '5px' }}
        ></div>
      </Col>
    </Row>
  );
}

export default Profile_view;
