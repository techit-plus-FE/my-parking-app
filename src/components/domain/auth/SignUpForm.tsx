import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { UserInputClass } from "../../../types/classImplementations";
import { useBoundStore } from "../../../store/index";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import classes from "./SignUpForm.module.css";
import { useTheme } from "@mui/material";
import { CommonButtonLarge, MuiButton } from "../../UI/CommonButton";
import { Toast } from "../../UI/Toast";

const SignUpForm = () => {
  const AuthSlice: AuthSlice = useBoundStore((state) => state);
  const isToastOpen = useBoundStore((state)=>state.isToastOpen)
  const setIsToastOpen = useBoundStore((state)=>state.setIsToastOpen)
  const bgColor = useBoundStore((state)=>state.bgColor)
  const setBgColor = useBoundStore((state)=>state.setBgColor)
  const toastMessage = useBoundStore((state)=>state.alertText)
  const setToastMessage = useBoundStore((state)=>state.setAlertText)
  const navigate = useNavigate();
  const [userInputs, setUserInputs] = useState<UserInputClass>(
    new UserInputClass()
  );

  const saveUserInputs: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target as HTMLInputElement;

    setUserInputs((prev: UserInputClass) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isMatching: () => boolean = () => {
    if (userInputs.password === userInputs.passwordCheck) return true;
    return false;
  };

  const handleSignUp: (userInputs: UserInputClass) => void = async (
    userInputs: UserInputClass
  ) => {
    //userInputs에서 passwordCheck를 삭제한 객체 newPerson을 만들어 줍니다.
    const newPerson: Partial<UserInputClass> = { ...userInputs };
    delete newPerson["passwordCheck"];

    const AuthAlert = await AuthSlice.signUp(newPerson)
    //newPerson을 넣어 회원가입을 진행합니다. 잘 완료되었다면 login 페이지로 이동합니다.
    if (AuthAlert['ok'] == true) {
      setIsToastOpen(true)
      setToastMessage(AuthAlert['message'])
      setBgColor('var(--toast-success)')
      navigate("/login");
    }
    else {
      setIsToastOpen(true)
      setToastMessage(AuthAlert['message'])
      setBgColor('var(--toast-error)')
    }
  };

  const handleEmailVerification: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void = async (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const AuthAlert = await AuthSlice.verifyEmail(userInputs.email)
    if (AuthAlert['ok'] == true) {
      setIsToastOpen(true)
      setToastMessage(AuthAlert['message'])
      setBgColor('var(--toast-success)')
    }
    else {
      setIsToastOpen(true)
      setToastMessage(AuthAlert['message'])
      setBgColor('var(--toast-error)')
    } 
  }

  const checkPassword = () => {
    const pw = userInputs.password
    const regexPw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\d\s]).{8,}$/;
    if(!regexPw.test(pw)) {
      return false;
    }
    return true;
  }

  const titleDict = {
    email: '이메일',
    password: '비밀번호',
    password_check: '비밀번호 확인',
    name: '이름',
    phone: '전화번호',
    address: '주소',
  }

  return (
    <>
    <div className={classes.signUpContainer}>
      <h2>회원가입</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <Box>
          <div>
            <div>회원유형</div>
            <TextField
              select
              fullWidth
              required
              defaultValue="user"
              helperText="회원유형을 선택해 주세요"
              name="type"
              variant="standard"
              onChange={saveUserInputs}
            >
              <MenuItem key="user" value="user">
                일반
              </MenuItem>
              <MenuItem key="seller" value="seller">
                판매자
              </MenuItem>
            </TextField>
          </div>
          <div>
            <div>이메일</div>
            <TextField
              fullWidth
              required
              variant="standard"
              name="email"
              onChange={saveUserInputs}
            />
          </div>
          <MuiButton
            onClick={handleEmailVerification}
            // sx={{
            //   color: theme.palette.text.primary,
            // }}
            text={"이메일 중복확인"}
          />
          <div>
            <div>비밀번호</div>
            <TextField
              required
              fullWidth
              value={userInputs.password as string}
              name="password"
              type="password"
              variant="standard"
              onChange={saveUserInputs}
              error={
                userInputs.password.length === 0
                  ? false
                  : checkPassword()
                  ? false
                  : true
              }
              helperText = {
                userInputs.password.length === 0
                ? "비밀번호를 설정해 주세요"
                : checkPassword()
                ? true 
                : "8~20자 영문 대소문자, 숫자, 특수문자를 사용하세요."
              }
            />
          </div>
          <div>
            <div>비밀번호 확인</div>
            <TextField
              required
              fullWidth
              error={
                userInputs.password.length === 0
                  ? userInputs.passwordCheck.length !== 0
                    ? true
                    : false
                  : isMatching()
                  ? false
                  : true
              }
              helperText={
                userInputs.password.length === 0
                  ? userInputs.passwordCheck.length !== 0
                    ? "비밀번호를 설정해 주세요"
                    : true
                  : 
                  checkPassword()
                  ? userInputs.passwordCheck.length === 0
                  ? "비밀번호를 다시 입력해 주세요"
                  : isMatching()
                  ? "비밀번호가 일치합니다"
                  : "비밀번호가 일치하지 않습니다"
                  : "비밀번호는 양식에 맞아야 합니다"
              }
              value={userInputs.passwordCheck as string}
              name="passwordCheck"
              type="password"
              variant="standard"
              onChange={saveUserInputs}
            />
          </div>
          {Object.keys(userInputs)
            .filter(
              (v) =>
                v !== "email" &&
                v !== "password" &&
                v !== "extra" &&
                v !== "type" &&
                v !== "passwordCheck"
            )
            .map((item) => {
              return (
                <div key={item}>
                  <div>{titleDict[item as keyof typeof titleDict]}</div>
                  <TextField
                    fullWidth
                    required
                    value={userInputs[item as keyof UserInputClass] as string}
                    name={item}
                    variant="standard"
                    onChange={saveUserInputs}
                  />
                </div>
              );
            })}
          <Box
            sx={{
              mt: "20px",
            }}
          >
            <CommonButtonLarge
              text="회원가입"
              onClick={() => handleSignUp(userInputs)}
            />
            <MuiButton            
            text="회원이십니까? 로그인하러 가기"
            onClick = {()=>navigate('/login')}
            />

          </Box>
        </Box>
      </form>
    </div>
    <Toast
        bgColor = {bgColor}
        alertText ={toastMessage}
        isToastOpen = {isToastOpen}
      />
    </>
  );
};

export default SignUpForm;
