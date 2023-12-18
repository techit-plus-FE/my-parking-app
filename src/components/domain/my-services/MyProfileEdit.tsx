import {useRef, useEffect, useState, createRef} from "react";
import { useBoundStore } from "../../../store";
import { useNavigate} from "react-router-dom";
import {UserDetailInfo, UserExtraInfo} from "../../../types/classImplementations"
import Box from "@mui/material/Box";
import { Button, Card, TextField } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import React from "react";
import DEFAULTIMAGE from '../../../assets/images/default-avatar.png'


const MyProfileEdit = () => {
  const Store = useBoundStore((state) => state)
  const myInfo: UserDetailInfoType = Store.myInfo
  const id: number = Store.userBasicInfo._id
  const navigate = useNavigate()
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const imageUploadRef = useRef<HTMLInputElement>(null);
  const [imgFileView, setImgFileView]= useState('')
  const fetchAndSetMyInfo = async () => {
    const myInfo = await Store.getMyInfo(id, Store.userToken.accessToken);
    Store.setMyInfo(myInfo)
  };

  useEffect(()=>{
    fetchAndSetMyInfo()
  },[])

  // const [userInputRefObjectState, setUserInputRefObjectState] = useState<{ [key in keyof UserBasicInfoType]: React.RefObject<HTMLInputElement|null> }>({})

  const userExtraInfo: ExtraType = {...new UserExtraInfo(), ...myInfo.extra}
  const currentInfo: Partial<UserDetailInfo> = {...myInfo}
  delete currentInfo['extra']
  const userBasicInfo: UserBasicInfoType = {...currentInfo} as UserBasicInfoType
  
  //userInputRef object 생성
  const userInputRef :{[key in keyof UserBasicInfoType]: React.RefObject<HTMLInputElement|null>} = 
    Object.keys(userBasicInfo).reduce((acc, key) => {
    const myInputRef: React.RefObject<HTMLInputElement|null> = React.createRef();
    acc[key as keyof UserBasicInfoType] = myInputRef;
    return acc;
  }, {} as { [key in keyof UserBasicInfoType]: React.RefObject<HTMLInputElement|null> })

  //userExtraInputRef object 생성
  const userExtraInputRef : {[key in keyof ExtraType] : React.MutableRefObject<HTMLInputElement|null>} = 
    Object.keys(userExtraInfo).reduce((acc, key) => {
      const myInputRef: React.MutableRefObject<HTMLInputElement|null> = createRef();
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
      if (imageUploadRef.current === null) return
      if (imageUploadRef.current.files === null) return
      setImgFileView(URL.createObjectURL(imageUploadRef.current.files[0]));
    };

    
    const handleImageUpload = async () => {
      const uploadImage = Store.uploadImage
      const profileImageURL = await uploadImage(imageUploadRef)
      const updatedInfo = await Store.updateMyInfo(id, Store.userToken.accessToken, {extra: {profileImage: profileImageURL[0]}})
      Store.setMyInfo({...updatedInfo})
    }


  const isString = (obj: string|undefined): obj is string => {
    if (obj === undefined)return false
    return true
  }

  const handleSubmit = async() => {
    //userInputRef object에 있는 데이터를 myBasicInfo에 모으기
    const myBasicInfo = {} as Omit<Partial<{[key in keyof UserBasicInfoType]: string}>, '_id'>
     Object.keys(userInputRef).forEach((key) => {
      if (key === '_id') return;
      const userInputValue = userInputRef[key as keyof UserBasicInfoType].current?.value;
      if (isString(userInputValue)) {
        myBasicInfo[key as keyof Omit<Partial<UserBasicInfoType>, '_id'>] = userInputValue;
      }})

    //userExtraInputRef object에 있는 데이터를 myExtraInfo에 모으기  
    const myExtraInfo = {} as Partial<{[key in keyof UserExtraInfo]: string}>
    Object.keys(userExtraInputRef).forEach((key) => {
      if (key === 'profileImage') return;
      const userInputValue = userExtraInputRef[key as keyof UserExtraInfo]?.current?.value;
      if (isString(userInputValue)) {
        myExtraInfo[key as keyof Omit<Partial<UserExtraInfo>, 'profileImage'>] = userInputValue;
      }
    });
    myExtraInfo['profileImage'] = myInfo.extra.profileImage

    //editedInfo에 담아서 patch하기
    const editedInfo = {...myBasicInfo, extra: {...myExtraInfo}}
    if (await Store.updateMyInfo(id, Store.userToken.accessToken, editedInfo)){
      alert('수정이 완료되었습니다')
      navigate(`/mypage/${myInfo._id}`)
    }
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
            {imageUploadRef.current === null ? 
                (
                <img src = {DEFAULTIMAGE} alt = "img"></img>
                  )
                  : (
                    <img src = {imgFileView} alt = "img"></img>
                )}    
                <input
                  type="file"
                  ref={imageUploadRef}
                  // multiple
                  onChange={boximgUpload}
                  accept="image/*"
                  className="upload-btn-inside"
                />
          </Card>
          <Button onClick={handleImageUpload}>업로드하기</Button>
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
              />
            </div>
          );
        })}
        <Button onClick={handleSubmit}>수정 완료</Button>
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
              />
            </div>
          );
        })}

    </Box>);
         
  }

export default MyProfileEdit;
