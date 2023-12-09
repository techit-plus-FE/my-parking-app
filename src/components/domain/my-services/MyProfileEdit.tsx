import {ChangeEvent, ChangeEventHandler, useEffect, useState} from "react";
import { useBoundStore } from "../../../store";
import { useNavigate} from "react-router-dom";
import {UserInputClass} from "../../../types/classImplementations"
import { CommonButtonMiddle } from "../../UI/CommonButton";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";

const MyProfileEdit = () => {
  const Store = useBoundStore((state) => state)
  const myInfo: UserDetailInfoType = Store.myInfo
  const id: number = Store.userBasicInfo._id
  const navigate = useNavigate()
 
  const [userInputs, setUserInputs] = useState<UserInputClass>(
    new UserInputClass()
    );
  const fetchAndSetMyInfo = async () => {
    Store.setMyInfo(await Store.getMyInfo(id, Store.userToken.accessToken))
  }

  const saveUserInputs: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target as HTMLInputElement;

    setUserInputs((prev: UserInputClass) => ({
      ...prev,
      [name]: value,
    }));
  };

 
  
  return <div>
     <Box>
      <div>
        {/*프로필 이미지 표시*/}
        <img src={`${myInfo.extra?.profileImage}`}/>
      </div>
      {Object.keys(userInputs)
        .filter((v) => v !== "email" &&v!=="password" && v !== "extra" && v !== "type" && v!=="passwordCheck")
        .map((item) => {
          return (
            <div key = {item}>
              <div>{item}</div>
              <TextField
              fullWidth
              required
              value={userInputs[item as keyof UserInputClass] as string}
              name = {item}           
              variant="standard"
              onChange = {saveUserInputs}
              />
            </div>
          );
        })}
    </Box>

  </div>;
};

export default MyProfileEdit;
