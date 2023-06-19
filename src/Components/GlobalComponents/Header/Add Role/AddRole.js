import React from 'react'
import Header from '../Header';
import './AddRole.css'
import { faAngleLeft, faAnglesLeft, faBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function AddRole() {
    const navigate = useNavigate();
    const backtoLogin = () => {
        navigate(`${process.env.REACT_APP_BASE_URL_DRCCO }`)

    }
    return (
        <div>
            <Header />
            <h1>ADD ROLE</h1>
       <div className='formcard'>
           
       <Form inline>
        <FormGroup >
          <Label for="exampleEmail"><span className='label1'><b >Role ID</b></span></Label>
          <Input type="email" name="email" id="exampleEmail" className='input1'/>
        </FormGroup>
        <FormGroup >
          <Label for="examplePassword"><span className='label2'><b >Name</b></span></Label>
          <Input type="password" name="password" id="examplePassword" className='input2'  />
        </FormGroup>
        <Button className='addroleButton'>ADD ROLE</Button>
      </Form>

       </div>
          

        </div>
    )
}

export default AddRole
