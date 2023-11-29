import React, { ChangeEvent, ChangeEventHandler } from "react";
import {useState} from 'react';
import { useBoundStore } from "../../../store/index"


// type UserInputElements = {
  class CustomerInput implements UserInputType {
    email: string;
    password: string;
    name: string;
    phone: string;
    address: string;
    type: string;
    extra: extraType;
  
    constructor(){
      this.email = ""
      this.password = ""
      this.name = ""
      this.phone = ""
      this.address = ""
      this.type = "user"
      this.extra = {
        X_position: "",
        Y_position: ""
      }
    }
  }


const SignUpForm = () => {
  const signUp: AuthSlice["signUp"] = useBoundStore((state) => state.signUp)
  
  const [userInputs, setUserInputs] = useState<UserInputType>(
    // Customer일 때 
    new CustomerInput()
    // Seller일 때 
    // new SellerInput()
  )

  const saveUserInputs : ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>): void => {
    const {name, value} = event.target as HTMLInputElement;

    setUserInputs((prev: UserInputType ) => ({
      ...prev,
      [name]: value,
    }));
  }

  return( 
  <form onSubmit = {(e)=> e.preventDefault()}>
    <div>
        <div>
        email
        </div>
      <label>
        <input value = {userInputs.email as string} name = "email" onChange= {saveUserInputs}></input>
      </label>
      <button>
        이메일 중복확인
      </button>
    </div>
    {Object.keys(userInputs).filter((v)=>(v!=='email' && v!=='extra' && v!=='type')).map(item => {return (
      <div>
        <div>
        {item}   
        </div>
      <label>
        <input value = {userInputs[item as keyof UserInputType] as string} name = {item} onChange= {saveUserInputs}></input>
      </label>
      </div>
    )})}
    <button onClick={()=>signUp(userInputs)}> 회원가입 </button>
  </form>
  )
};

export default SignUpForm;
