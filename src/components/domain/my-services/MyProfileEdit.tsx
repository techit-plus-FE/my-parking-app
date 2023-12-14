import {ChangeEvent, ChangeEventHandler, useRef, useEffect, useState, Ref, createRef, RefObject} from "react";
import { useBoundStore } from "../../../store";
import { useNavigate} from "react-router-dom";
import {UserInputClass, Person, UserDetailInfo, UserExtraInfo} from "../../../types/classImplementations"
import { CommonButtonMiddle } from "../../UI/CommonButton";
import Box from "@mui/material/Box";
import Modal from '@mui/material/Modal';
import { Button, TextField } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from "react";


const MyProfileEdit = () => {
  const Store = useBoundStore((state) => state)
  const myInfo: UserDetailInfoType = Store.userBasicInfo
  const id: number = Store.userBasicInfo._id
  const navigate = useNavigate()
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const currentInfo: Partial<UserDetailInfo> = {...myInfo}
  const userExtraInfo: ExtraType = {...new UserExtraInfo(), ...myInfo.extra}
  delete currentInfo['extra']
  const userBasicInfo: UserBasicInfoType = {...currentInfo} as UserBasicInfoType


  const userInputRef :{[key in keyof UserBasicInfoType]: React.MutableRefObject<HTMLInputElement|null>} = 
    Object.keys(userBasicInfo).reduce((acc, key) => {
    const myInputRef: React.MutableRefObject<HTMLInputElement|null> = React.createRef();
    acc[key as keyof UserBasicInfoType] = myInputRef;
    return acc;
  }, {} as { [key in keyof UserBasicInfoType]: React.MutableRefObject<HTMLInputElement|null> })


  const userExtraInputRef : {[key in keyof ExtraType] : React.MutableRefObject<HTMLInputElement|null>} = 
    Object.keys(userExtraInfo).reduce((acc, key) => {
      const myInputRef: React.MutableRefObject<HTMLInputElement|null> = React.createRef();
      acc[key as keyof ExtraType] = myInputRef;
      return acc;
    }, {} as { [key in keyof ExtraType]: React.MutableRefObject<HTMLInputElement|null> })


    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };


  useEffect(()=>{
    // console.log(myInfo)
     Object.keys(myInfo).forEach((key) => {
    
      const newInputElement = myInfo[key as keyof UserBasicInfoType ]
      console.log(newInputElement)
    
  })
  console.log('after', userInputRef)
  })


  const isUserDetailInfo = (obj: UserDetailInfoType|null): obj is UserDetailInfoType => {
    // Iplement your type checing logic here
    if (obj === null){
      return false
    }
    return true
  }

  
  return (
     <Box>
      <div>
        {/*프로필 이미지 표시*/}
        <img src={`${myInfo.extra?.profileImage}`}/>
        <button onClick ={()=>setModalIsOpen(!modalIsOpen)}>프로필사진 변경</button>
        <Dialog
        open={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={closeModal}>Close Child Modal</Button>
        </Box>
      </Dialog>
      </div>
      {Object.keys(userInputRef) 
        .filter((v) => v!=='token' && v!=='createdAt' && v!=='updatedAt' && v!== '_id' && v !== "type" && v!=='extra')
        .map((item) => {
          return (
            <div key = {item}>
              <div>{item}</div>
              <TextField
              fullWidth
              required
              inputRef = {userInputRef[item as keyof UserBasicInfoType]}
              defaultValue = {myInfo[item as keyof UserBasicInfoType]}
              name = {item}          
              variant="standard"
              // onChange = {saveUserInputs}
              />
            </div>
          );
        })}
        {Object.keys(userExtraInputRef) 
        .filter((v) => v!=='lat' && v!=='lng' && v!=='profileImage')
        .map((item) => {
          return (
            <div key = {item}>
              <div>{item}</div>
              <TextField
              fullWidth
              required
              name = {item}           
              variant="standard"
              // onChange = {saveUserInputs}
              />
            </div>
          );
        })}

    </Box>);
  }

export default MyProfileEdit;
