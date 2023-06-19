import React, { useEffect, useRef, useState } from 'react';
import './UserPopDetails.css';
import Avatar from "../../../../Assets/image/ppl.png";
import { Button } from 'reactstrap';

function UserPopDetails() {
  const [isclikedOnViewProfile, setIsclikedOnViewProfile] = useState(true);
 

  const clickedOnProfile = (e) => {
    e.stopPropagation();
    setIsclikedOnViewProfile(false)
  }
  const goBackButton=(e)=>{
    e.stopPropagation();
    setIsclikedOnViewProfile(true)
  }

  return (
    <div>
      <section>
        <div className='imageName_flexbox'>
          <div className='image'>
            <img src={Avatar} alt="Profile" className="rounded-circle" height={60} />
          </div>
          <div className='namenID'>
            Freiedrike Heusar<br />
            NQ100139542
          </div>

        </div>
        <br />
        {isclikedOnViewProfile ? <div className='buttons_flexbox'>
          <div className='view_profile'>
            <Button size='sm' style={{ 'borderRadius': "0px", "width": '130px' }} onClick={(e) => clickedOnProfile(e)}>VEIW PROFILE</Button>

          </div>
          <div className='logout'>
            <Button size='sm' style={{ 'borderRadius': "0px", "width": '130px',"backgroundColor":"white","color":'blue' }}>Logout</Button>

          </div>
        </div> :

          <>
          <div>

            <div className='view_profile_tab' tabIndex={0}  onClick={(e)=>goBackButton(e)}>VIEW PROFILE</div>  <hr color='blue' height='4px'/>
          </div>
          <div >
         
            <div className='complete_details'>
              <div className='row justify-content-around'>
                <div className="col-8">
                  <b>Email:</b><br />
                  <small>freiedrikeheusar@gmail.com</small>
                </div>
                <div className="col-4">

                </div>
              </div>
           
            <div className="row">
                <div className="col">
                  <b>Manager:</b><br />
                  <small >Olive Repaskyss</small>
                </div>
                <div className="col-md-auto">
                  <b>Role:</b><br />
                  <small >Finance Supervisor</small>
                </div>
              


            </div>
             
              <div className='row justify-content-around'>
                <div className="col-8">
                  <b>Area:</b><br />
                  <small>OTC</small>
                </div>
                <div className="col-4">

                </div>
              </div>
            
            </div>
           
            <hr color='blue' height='7px' className='container-fluid m-0'/>
            <pre></pre>
          </div>
          
            
            <Button size='sm' style={{ 'borderRadius': "0px", "width": '130px',"float":'right',"backgroundColor":"white","color":'blue' }}>Logout</Button>
          </>}


      </section>
    </div>
  )
}

export default UserPopDetails
