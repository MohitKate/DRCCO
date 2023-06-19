import React, { useState } from 'react'
import { Modal, ModalBody, ModalHeader,Button } from 'reactstrap';
import './DeleteConfirmationPopup.css'
import CancleIcon from '../../../../Assets/image/can.png'

function DeleteConfirmationPopup(props) {
 const {CanclePop, openPopup,isClickedOnConfirm}=props;


 const ClickedOnConfirm=()=>{
  isClickedOnConfirm();
 }
  return (
    <div>

		




<Modal 
size='md'
isOpen={openPopup} >
 <div className='icon-box' onClick={CanclePop}></div>
  <ModalBody>
  <div >
	<div >
		<div className="modal-content">
			<div className="modal-header flex-column">
				<div className="icon-box">
					<i className="material-icons"></i>
			
				</div>				
        <img  src={CancleIcon} height={90} />		
				<h4 style={{'color':'#c10c2b'}}>Are you sure?</h4>	
			
                
			</div>
			<div className="modal-body">
				<p style={{'textAlign':'center'}}>Do you really want to delete this record?</p>
			</div>
			<div className=" justify-content-center">
			<p
              style={{
                display: "flex",
                alignContent: "center",
                columnGap: "46px",
								marginLeft:'60px'
               
              }}
            >
              <Button
               onClick={CanclePop}
                color="primary"
                style={{ width: "150px" }}
              >
               Cancel
              </Button>
              <Button
               onClick={ClickedOnConfirm}
                style={{ width: "150px","backgroundColor":'#c10c2b'}}
              >
                Confirm
              </Button>
            </p>
			</div>
		</div>
	</div>
</div> 


    
  </ModalBody>
</Modal>


    </div>
  )
}

export default DeleteConfirmationPopup;
