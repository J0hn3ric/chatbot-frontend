import { SetStateAction, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, RootState } from "../store";

export const useField = (type: string) => {
  const [value, setValue] = useState('')

  const onChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setValue(event.target.value)
  }

  const submit = () => {
    setValue('');
  }

  return {
    input: {
      type,
      value,
      onChange
    },
    submit
  }
}

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();