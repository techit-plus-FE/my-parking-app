import {ChangeEvent, ChangeEventHandler, useRef, useEffect, useState, Ref, createRef, RefObject} from "react";
import { useBoundStore } from "../../../store";
import { useNavigate} from "react-router-dom";
import {UserInputClass, Person, UserDetailInfo, UserExtraInfo} from "../../../types/classImplementations"
import { CommonButtonMiddle } from "../../UI/CommonButton";
import Box from "@mui/material/Box";
import Modal from '@mui/material/Modal';
import { Button, Card, TextField } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import React from "react";
import DEFAULTIMAGE from '../../../assets/images/default-avatar.png'


const MyProfileEdit = () => {
  const Store = useBoundStore((state) => state)
  const myInfo: UserDetailInfoType = Store.userBasicInfo
  const id: number = Store.userBasicInfo._id
  const navigate = useNavigate()
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const upload = useRef<HTMLInputElement>(null);
  const [imgFileView, setImgFileView]= useState('')

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
      setImgFileView('');
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };

    const boximgUpload = () => {
      if (upload.current === null) return
      if (upload.current.files === null) return
      setImgFileView(URL.createObjectURL(upload.current.files[0]));
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
        <Button onClick ={()=>setModalIsOpen(!modalIsOpen)}>프로필사진 변경</Button>
        <Dialog
        open={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
         <Box>
          <h2 id="child-modal-title">프로필 사진 업로드</h2>
          <Card>
            {upload.current === null ? 
                (
                <img src = {DEFAULTIMAGE} alt = "img"></img>
                  )
                  : (
                    <img src = {imgFileView} alt = "img"></img>
                )}    
                <input
                  type="file"
                  ref={upload}
                  // multiple
                  onChange={boximgUpload}
                  accept="image/*"
                  className="upload-btn-inside"
                />
          </Card>
          <Button onClick={closeModal}>업로드하기</Button>
          <Button onClick={closeModal}>닫기</Button>
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
