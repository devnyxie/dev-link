import React, { useState } from 'react';
import { Button, Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import MD_view from '../../components/MD_view';
import { useDispatch, useSelector } from 'react-redux';
import { createTeam } from '../../Redux/Actions/teams';

function NewTeam_View({ user }) {
  const dispatch = useDispatch();
  const [md, setMd] = useState('');
  let [name, setName] = useState('');
  const [open, setOpen] = useState(true);
  const [description_short, setDescription_short] = useState('');
  //states
  //setters in inputs
  //new sinatra endpoints /POST
  //new redux action
  //check markdown syntax after succ /POST

  return (
    <div className='w-100 h-100 p-4 mt-4'>
      <Form>
        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='title'
            placeholder='Name of the team'
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Short description</Form.Label>
          <Form.Control
            as='textarea'
            onChange={(e) => setDescription_short(e.target.value)}
            placeholder='Briefly describe the purpose of this team'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>README.md</Form.Label>
          <MD_view editor={true} md={md} setMd={setMd} />
        </Form.Group>
        <Form.Label>Privacy</Form.Label>
        <div>
          <ToggleButtonGroup type='radio' name='options' defaultValue={open}>
            <ToggleButton
              variant='outline-light'
              //   className='custom-button'
              id='tbg-radio-1'
              onChange={(e) => setOpen(e.target.value)}
              value={true}
            >
              Open
            </ToggleButton>
            <ToggleButton
              variant='outline-light'
              //   className='custom-button'
              id='tbg-radio-2'
              onChange={(e) => setOpen(e.target.value)}
              value={false}
            >
              Private
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className='p-2 w-100 d-flex justify-content-end'>
          <Button
            variant='outline-light'
            onClick={() =>
              dispatch(
                createTeam({
                  name: name,
                  creator_id: user.id,
                  description_short: description_short,
                  description_md: md,
                  open: open,
                })
              )
            }
          >
            Create
          </Button>{' '}
        </div>
      </Form>
    </div>
  );
}

export default NewTeam_View;
