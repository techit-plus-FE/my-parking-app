import React, { ChangeEvent, ChangeEventHandler } from "react";
import {useState} from 'react';


// type UserInputElements = {
  type UserInputType = {
  email: string,
  password: string,
  name: string,
  phone: string,
  address: string,
  type: string,
  extra: extraType,
}

type extraType = {
    X_position: string
    Y_position: string
  }

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
    this.type = "customer"
    this.extra = {
      X_position: "",
      Y_position: ""
    }
  }
}


const SignUpForm = () => {
const [userInputs, setUserInputs] = useState<UserInputType>(
  new CustomerInput()
)

const saveUserInputs : ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>): void => {
  const {name, value} = event.target as HTMLInputElement;

  setUserInputs((prev: CustomerInput) => ({
    ...prev,
    [name]: value,
  }));
}

  return( 
  <form onSubmit = {(e)=> e.preventDefault()}>
    {Object.keys(userInputs).filter((v)=>(v!=='extra' && v!=='type')).map(item => {return (
      <div>
        <div>
        {item }   
        </div>
      <label>
        <input value = {userInputs[item as keyof UserInputType] as string} name = {item} onChange= {saveUserInputs}></input>
      </label>
      </div>
    )})}
    <button > 회원가입 </button>
  </form>
  )
};

export default SignUpForm;
