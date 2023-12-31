import { useEffect } from "react";
import { useBoundStore } from "../../../store";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import classes from "./Mypage.module.css";
import { MuiButton } from "../../UI/CommonButton";
import usericon from "../../../assets/images/user-default-profile.png";
import { useTheme } from "@mui/material/styles";
import { Toast } from "../../UI/Toast";

const MyProfile = () => {
  const theme = useTheme();
  const Store = useBoundStore((state) => state);
  const myInfo: UserDetailInfoType = useBoundStore((state) => state.myInfo);
  const id: number = Store.userBasicInfo._id;
  const navigate = useNavigate();
  const fetchAndSetMyInfo = async () => {
    Store.setMyInfo(await Store.getMyInfo(id, Store.userToken.accessToken));
  };
  const fontSize = "1.2rem";
  const isToastOpen = useBoundStore((state) => state.isToastOpen);
  const toastMessage = useBoundStore((state) => state.alertText);
  const bgColor = useBoundStore((state) => state.bgColor);
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
        {/*프로필 이미지 표시*/}
        {myInfo.extra?.profileImage ? (
          <div className={classes.imgWrapperA}>
            <img
              className={classes.myProfileImage}
              src={`${myInfo.extra?.profileImage}`}
            />
          </div>
        ) : (
          <div className={classes.imgWrapperA}>
            <img src={usericon} />
          </div>
        )}
        <div className={classes.user}>
          <h2>{myInfo.name}</h2>
          <div>{myInfo.type === "seller" ? "판매자" : "일반회원"}</div>
          <div>{myInfo.email}</div>
          <div>{myInfo.phone}</div>
          <div>{myInfo.address}</div>
          <Box
            sx={{
              color: "#4285F4",
            }}
          >
            {/* 차량번호 */}{" "}
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
            <MuiButton
              text={"프로필 수정하기"}
              fontSize={fontSize}
              onClick={() => {
                navigate(`/mypage/${myInfo._id}/edit`);
              }}
            />
          </div>
          {/* 버튼들 */}
          {myInfo.type === "seller" ? (
            <>
              <MuiButton
                text={"내상품 목록"}
                fontSize={fontSize}
                onClick={() => navigate(`/mypage/${myInfo._id}/mylist`)}
              />
              <MuiButton
                text={"내 주차장 등록하기"}
                fontSize={fontSize}
                onClick={() => {
                  navigate(`/products/regist`);
                }}
              />
            </>
          ) : (
            <>
              <MuiButton
                text={"주문 목록"}
                fontSize={fontSize}
                onClick={() => {
                  navigate(`/order-history`);
                }}
              />
              <MuiButton
                text={"리뷰 관리"}
                fontSize={fontSize}
                onClick={() => {
                  navigate(`/reply/replies`);
                }}
              />
            </>
          )}
        </Box>
      </Box>
      <Toast
        isToastOpen={isToastOpen}
        alertText={toastMessage}
        bgColor={bgColor}
      />
    </>
  );
};

export default MyProfile;
