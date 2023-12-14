import {ChangeEvent, ChangeEventHandler, useRef, useEffect, useState, Ref, createRef, RefObject} from "react";
import { useBoundStore } from "../../../store";
import { useNavigate} from "react-router-dom";
import {UserInputClass, Person, UserDetailInfo} from "../../../types/classImplementations"
import { CommonButtonMiddle } from "../../UI/CommonButton";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import React from "react";

const MyProfileEdit = () => {
  const Store = useBoundStore((state) => state)
  const myInfo: UserDetailInfoType = Store.userBasicInfo
  const id: number = Store.userBasicInfo._id
  const navigate = useNavigate()
 

  const userInputRef :{[key in keyof UserDetailInfo]: React.MutableRefObject<HTMLInputElement|null>} = 
    Object.keys(myInfo).reduce((acc, key) => {
    const myInputRef: React.MutableRefObject<HTMLInputElement|null> = React.createRef();
    acc[key as keyof UserDetailInfo] = myInputRef;
    return acc;
  }, {} as { [key in keyof UserDetailInfo]: React.MutableRefObject<HTMLInputElement|null> })


  useEffect(()=>{
    // console.log(myInfo)
     Object.keys(myInfo).forEach((key) => {
    
      const newInputElement = myInfo[key as keyof UserDetailInfo]
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
              inputRef = {userInputRef[item as keyof UserDetailInfo]}
              defaultValue = {myInfo[item as keyof UserDetailInfo]}
              name = {item}          
              variant="standard"
              // onChange = {saveUserInputs}
              />
            </div>
          );
        })}
        {Object.keys(userInputRef.extra) 
        .filter((v) => v!=='createdAt' && v!=='updatedAt' && v!== '_id' && v !== "type" && v!=="passwordCheck" && v!=='extra')
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
