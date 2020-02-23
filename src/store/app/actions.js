import {
  FIRST_UPLOAD_INIT, TOGGLE_LOADER, TOGGLE_MODAL
} from "./actionTypes";

export const firstLoadInit = () => ({
  type: FIRST_UPLOAD_INIT
});

export const toggleLoader = (data) => ({
  type: TOGGLE_LOADER,
  ...data
});

export const toggleModal = (data) => ({
  type: TOGGLE_MODAL,
  ...data
})



