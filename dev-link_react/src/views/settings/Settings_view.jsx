import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../Redux/Actions/users';
import MD_view from '../../components/MD_view';

function Settings_view({ user }) {
  const dispatch = useDispatch();
  const [changedUser, setChangedUser] = useState(user);
  const [changedPassword, setChangedPassword] = useState('');
  const [changedReadme, setChangedReadme] = useState(changedUser.readme);
  function updateLoggedInUser() {
    if (changedPassword !== '') {
      setChangedUser({
        ...changedUser,
        password: changedPassword,
      });
    }
    dispatch(
      updateUser({
        credentials: {
          ...changedUser,
          readme: changedReadme,
        },
      })
    );
  }
  return (
    <div className="w-100 h-100 p-2 d-flex flex-column align-items-center position-relative">
      <Row className="w-100 h-100 g-2">
        <Col xs={12} md={5}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={changedUser.username}
              onChange={(e) =>
                setChangedUser({ ...changedUser, username: e.target.value })
              }
              type="username"
              placeholder={user.username}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              disabled
              placeholder="Not available yet."
              as="textarea"
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={changedPassword}
              onChange={(e) => setChangedPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 ">
            <Form.Label>Profile Picture (URL)</Form.Label>
            <div className="d-flex">
              <Form.Control
                type="link"
                placeholder="https://imgur.com/profile_picture.png"
                value={changedUser.pfp}
                onChange={(e) =>
                  setChangedUser({ ...changedUser, pfp: e.target.value })
                }
              />
              <img
                style={{ width: '38px', height: '38px' }}
                className="rounded ms-2 border-gray"
                src={changedUser.pfp}
              />
            </div>
          </Form.Group>

          <Form.Group className=" ">
            <Form.Label>Profile Banner (URL)</Form.Label>
            <div className="d-flex">
              <Form.Control
                type="link"
                placeholder="https://imgur.com/profile_banner.png"
                value={changedUser.banner}
                onChange={(e) =>
                  setChangedUser({ ...changedUser, banner: e.target.value })
                }
              />
              <img
                style={{ width: '38px', height: '38px' }}
                className="rounded ms-2 border-gray"
                src={changedUser.banner}
              />
            </div>
          </Form.Group>
        </Col>
        <Col className="h-100" xs={12} md={7}>
          <Form.Group className="d-flex flex-column h-100">
            <Form.Label>README.md</Form.Label>
            <MD_view
              md={changedReadme}
              setMd={setChangedReadme}
              editor={true}
            />
          </Form.Group>
        </Col>
      </Row>
      {changedUser !== user ||
      changedPassword !== '' ||
      changedReadme !== changedUser.readme ? (
        // Conditionally render the "Save" button when the conditions are met
        <div className="position-absolute bottom-0 pb-3">
          <div
            className="custom-button p-1 px-3 rounded border"
            onClick={updateLoggedInUser}
          >
            Save
          </div>
        </div>
      ) : (
        // Render nothing when the conditions are not met
        <></>
      )}
    </div>
  );
}

export default Settings_view;
