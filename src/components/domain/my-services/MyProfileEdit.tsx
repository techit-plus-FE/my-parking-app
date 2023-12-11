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
 

  // const userInputRef = useRef<UserDetailInfo|null>(null);
  // if (userInputRef.current === null){
  //   userInputRef.current = new UserDetailInfo()
  // }
  
  // const userInputRef = useRef(Object.entries(myInfo).map((key, value) => {key : createRef()}));
  // <{ [key in keyof UserDetailInfo]: React.RefObject<HTMLInputElement> }>
  // const userInputRef = useRef(
  //   Object.keys(myInfo).reduce((acc, key) => {
  //     acc[key] = createRef<HTMLInputElement>();
  //     return acc;
  //   }, {})
  // )
  const userInputRef = useRef<{ [key in keyof UserInputClass]: React.RefObject<HTMLInputElement|null> }>(
    Object.keys(myInfo).reduce((acc, key) => {
      acc[key] = createRef<HTMLInputElement|null>();
      return acc;
    }, {} as { [key in keyof UserInputClass]: React.RefObject<HTMLInputElement|null> })
  );
// {
  const userInputRefArray :{[key in keyof UserDetailInfo]: React.MutableRefObject<HTMLInputElement|null>} = 
    Object.keys(myInfo).reduce((acc, key) => {
    const myInputRef: React.MutableRefObject<HTMLInputElement|null> = React.createRef();
    acc[key as keyof UserDetailInfo] = myInputRef;
    return acc;
  }, {} as { [key in keyof UserDetailInfo]: React.MutableRefObject<HTMLInputElement|null> })

  

  const [userInput, setUserInput] = useState(new UserInputClass())
  // useEffect(()=>{
  //   const defaultValue : UserInputClass = Object.fromEntries(
  //     Object.entries(myInfo).filter(([key, value])=>(key !== 'password' && key!=='passwordcheck' && key!=='token'))
  //   )
  //   setUserInput(myInfo)
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // const fetchAndSetMyInfo = async () => {
  //   userInputs.current = await Store.getMyInfo(id, Store.userToken.accessToken)
  const isHTMLInputElement = (obj: HTMLInputElement|null): obj is HTMLInputElement => {
    // Iplement your type checing logic here
    if (obj === null){
      return false
    }
    return true
  }

  useEffect(()=>{
    // console.log(myInfo)
     Object.keys(myInfo).forEach((key) => {
      // const myInputRef: React.MutableRefObject<HTMLInputElement|null> = React.createRef();
      // myInputRef.current = document.createElement(myInfo[key as keyof UserDetailInfo]);
      //const newInputElement = document.createElement(myInfo[key as keyof UserDetailInfo].toString()) as HTMLInputElement

      const newInputElement = myInfo[key as keyof UserDetailInfo]
      console.log(newInputElement)
      //userInputRefArray[key as keyof UserDetailInfo].current = newInputElement
      // userInputRefArray[key as keyof UserDetailInfo].current?.appendChild(newInputElement)
      //  = document.createElement(myInfo[key as keyof UserDetailInfo])
      // userInputRefArray[key as keyof UserDetailInfo].current = myInfo[key as keyof UserDetailInfo]
    
  })
  console.log('after', userInputRefArray)
  })
    // Object.keys(myInfo).forEach((key) => {
    //   userInputRef.current[key].current.value = myInfo[key as keyof UserDetailInfo];
    // })
    // console.log('after', userInputRef)

    // Array(userInputRef.current).forEach((itemRef, key) => {
    //   // Check if the ref and key exist before trying to access them
    //   itemRef.current = myInfo[key];
    //   console.log(itemRef, key)
    //   })
    // console.log(myInfo)

    // });
  // useEffect(()=>{
  //  fetchAndSetMyInfo()
  //  console.log(myInfo)
  //   console.log(userInputs.current)
  // })
  
  const isUserDetailInfo = (obj: UserDetailInfoType|null): obj is UserDetailInfoType => {
    // Iplement your type checing logic here
    if (obj === null){
      return false
    }
    return true
  }

  // const saveUserInputs: ChangeEventHandler<HTMLInputElement> = (
  //   event: ChangeEvent<HTMLInputElement>
  // ): void => {
  //   const { name, value } = event.target as HTMLInputElement;
  //     setUserInput({
  //       ...userInput,
  //       [name]: value,
  //     })
  // };


  // const saveUserInputs: ChangeEventHandler<HTMLInputElement> = (
  //   event: ChangeEvent<HTMLInputElement>
  // ): void => {
  //   const { name, value } = event.target as HTMLInputElement;
  //   if (isUserDetailInfo( userInputRef.current[name as keyof UserDetailInfo].current)) {  
  //     userInputRef.current = ({
  //       ...userInputRef.current,
  //       [name]: value,
  //     })
  //   }
  // };

 
  
  return (
     <Box>
      <div>
        {/*프로필 이미지 표시*/}
        <img src={`${userInput.extra?.profileImage}`}/>
      </div>
      {Object.keys(userInput) 
        .filter((v) => v!=='token' && v!=='createdAt' && v!=='updatedAt' && v!== '_id' && v !== "type" && v!=="passwordCheck" && v!=='extra')
        .map((item) => {
          return (
            <div key = {item}>
              <div>{item}</div>
              <TextField
              fullWidth
              required
              //inputRef={isUserDetailInfo(userInputRef.current) ? useRef(userInputRef.current[item as keyof UserDetailInfo]) : undefined}
              // value = {isUserDetailInfo(userInputRef.current) ? userInputRef.current[item as keyof UserDetailInfo]: null}
              inputRef = {userInputRefArray[item as keyof UserDetailInfo]}
              defaultValue = {myInfo[item as keyof UserDetailInfo]}
              //value = {userInput[item as keyof UserInputClass] as string}
              name = {item}          
              variant="standard"
              // onChange = {saveUserInputs}
              />
            </div>
          );
        })}
        {Object.keys(userInput.extra) 
        .filter((v) => v!=='createdAt' && v!=='updatedAt' && v!== '_id' && v !== "type" && v!=="passwordCheck" && v!=='extra')
        .map((item) => {
          return (
            <div key = {item}>
              <div>{item}</div>
              <TextField
              fullWidth
              required
              //inputRef={isUserDetailInfo(userInputRef.current) ? React.createRef(userInputRef.current[item as keyof UserDetailInfo]) : undefined}
              // value = {isUserDetailInfo(userInputRef.current) ? userInputRef.current[item as keyof UserDetailInfo]: null}
              //inputRef = {userInputRef.current[item]}
              //value = {userInput[item as keyof UserInputClass] as string}
              name = {item}           
              variant="standard"
              onChange = {saveUserInputs}
              />
            </div>
          );
        })}

    </Box>);
  }

export default MyProfileEdit;
