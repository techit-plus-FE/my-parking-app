import React, { ChangeEvent, ChangeEventHandler } from "react";
import {useState} from 'react';


enum UserInputElements {
  email,
  password,
  name,
  phone,
  address,
  type,
  extra 
}

type UserInputType = {
  [key in keyof UserInputElements]: string;
};

const getDefaultUserInputElements: ()=> UserInputType = () => {

  const UserInputKeys = Object.keys(UserInputElements).filter((v) => isNaN(Number(v)))
  const DefaultUserInputElements: UserInputType = {} as UserInputType;
  UserInputKeys.forEach(item =>{
    DefaultUserInputElements[item]= ""
  })  
  return DefaultUserInputElements
}


const SignUpForm = () => {
const [userInputs, setUserInputs] = useState<UserInputType>(
  getDefaultUserInputElements()
)

// console.log(getDefaultUserInputElements())
//const {email, password}: UserInputType = userInputs;

const saveUserInputs : ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>): void => {
  const {name, value} = event.target as HTMLInputElement;

  setUserInputs((prev: UserInputType) => ({
    ...prev,
    [name]: value,
  }));
}

console.log(userInputs)

  return( 
  <form onSubmit = {(e)=> e.preventDefault()}>
    {Object.keys(userInputs).map(item => {return <div>
      <label>
        <input value = {item} name = {item} onChange= {saveUserInputs}></input>
      </label>
      </div>})}
    {/* <div>
      <label>
        email
          <input value={email} name="email" onChange={saveUserInputs}/>
      </label>
    </div>
    <div>
      <label>
        password
          <input value={password} name="password" onChange={saveUserInputs}/>
      </label>
    </div> */}
    <button > 회원가입 </button>
  </form>
  )
};

export default SignUpForm;
