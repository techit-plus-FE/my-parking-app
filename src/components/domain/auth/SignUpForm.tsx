import React, { ChangeEvent, ChangeEventHandler } from "react";
import {useState} from 'react';


enum UserInputElements {
  email,
  password,
  name,
  phone,
  address,
  type,
  extra,
}

type UserInputType = {
  [key in keyof UserInputElements]: string;
};

const getDefaultUserInputElements: ()=> UserInputType = () => {
  const UserInputKeys = Object.keys(UserInputElements).filter((v) => isNaN(Number(v)))
  const DefaultUserInputElements: UserInputType = {} as UserInputType;
  UserInputKeys.forEach(item =>{
    DefaultUserInputElements[item as keyof UserInputType]= ""
  })  
  return DefaultUserInputElements
}


const SignUpForm = () => {
const [userInputs, setUserInputs] = useState<UserInputType>(
  getDefaultUserInputElements()
)

//const {email, password}: UserInputType = userInputs;

const saveUserInputs : ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>): void => {
  console.log(userInputs)
  const {name, value} = event.target as HTMLInputElement;

  setUserInputs((prev: UserInputType) => ({
    ...prev,
    [name]: value,
  }));
}

console.log(userInputs)

  return( 
  <form onSubmit = {(e)=> e.preventDefault()}>
    {Object.keys(userInputs).map(item => {return (
      <div>
      <label>
        <input value = {userInputs[item as keyof UserInputType]} name = {item} onChange= {saveUserInputs}></input>
      </label>
      </div>
      )})}
    <button > 회원가입 </button>
  </form>
  )
};

export default SignUpForm;
