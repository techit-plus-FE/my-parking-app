import React, { useEffect } from "react";
import { useBoundStore } from "../../../store";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import classes from "./Mypage.module.css";
import { Button } from "@mui/material";
import usericon from "../../../assets/images/user-default-profile.png";
import { useTheme } from "@mui/material/styles";

const MyProfile = () => {
  const theme = useTheme();
  const Store = useBoundStore((state) => state);
  const myInfo: UserDetailInfoType = useBoundStore((state) => state.myInfo);
  const id: number = Store.userBasicInfo._id;
  const navigate = useNavigate();
  const fetchAndSetMyInfo = async () => {
    Store.setMyInfo(await Store.getMyInfo(id, Store.userToken.accessToken));
  };

  useEffect(() => {
    Store.isLoggedIn
      ? fetchAndSetMyInfo()
      : (() => {
          alert("로그인이 필요합니다"), navigate("/login");
        })();
  }, []);

  // return (<></>)
  return !Store.isLoggedIn ? (
    <>로그인을 해주세요</>
  ) : (
    <>
      {/* 프로필 카드 */}
      <Box
        className={classes.myProfile}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>마이 페이지</h1>
        <div className={classes.imgWrapper}>
          {/*프로필 이미지 표시*/}
          {myInfo.extra?.profileImage ? (
            <img src={`${myInfo.extra?.profileImage}`} />
          ) : (
            <img src={usericon} />
          )}
        </div>
        <div className={classes.user}>
          <h2>이름 : {myInfo.name}</h2>
          <div>
            회원유형 : {myInfo.type === "seller" ? "판매자" : "일반회원"}
          </div>
          <div>이메일 : {myInfo.email}</div>
          <div>전화번호 : {myInfo.phone}</div>
          <div>주소 : {myInfo.address}</div>
          <Box
            sx={{
              color: "#4285F4",
            }}
          >
            차량번호 :{" "}
            {myInfo.extra?.carNumber === "" ||
            myInfo.extra?.carNumber == undefined
              ? "등록된 차량이 없습니다"
              : `${myInfo.extra?.carNumber}`}
          </Box>
        </div>
        <Box
          className={classes.btnWrapper}
          sx={{
            backgroundColor: theme.palette.background.default,
          }}
        >
          <div>
            <h3>내정보</h3>
            <Button
              onClick={() => {
                navigate(`/mypage/${myInfo._id}/edit`);
              }}
              sx={{
                color: theme.palette.text.primary,
                fontSize: "20px",
              }}
            >
              프로필 수정하기
            </Button>
          </div>
          {/* 버튼들 */}
          {myInfo.type === "seller" ? (
            <Button
              sx={{
                color: theme.palette.text.primary,
                fontSize: "1.2rem",
              }}
            >
              내상품 목록
            </Button>
          ) : (
            <>
              <Button
                onClick={() => {
                  navigate(`/order-history`);
                }}
                sx={{
                  color: theme.palette.text.primary,
                  fontSize: "1.2rem",
                }}
              >
                주문 목록
              </Button>
              <Button
                sx={{
                  color: theme.palette.text.primary,
                  fontSize: "20px",
                }}
              >
                리뷰 관리
              </Button>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default MyProfile;
