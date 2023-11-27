import { create } from "zustand";

const saveUserInputs<T> = (target:HTMLInputElement): void => {
  const {name, value} = target;

  setUserInputs((prev: T) => ({
    ...prev,
    [name]: value,
  }));
}