import { createSlice } from "@reduxjs/toolkit";
const popupSlice = createSlice({
  name: "popup",
  initialState: {
    settingPopup: false,
    addBookPopup: false,
    readBookPopup: false,
    recordBookPopup: false,
    returnBookPopup: false,
    addNewAdminPopup: false,
    addPYQPopup: false, // Add this state
  },
  reducers: {
    toggleSettingPopup(state) {
      state.settingPopup = !state.settingPopup;
    },
    toggleAddBookPopup(state) {
      state.addBookPopup = !state.addBookPopup;
    },
    toggleReadBookPopup(state) {
      state.readBookPopup = !state.readBookPopup;
    },
    toggleRecordBookPopup(state) {
      state.recordBookPopup = !state.recordBookPopup;
    },
    toggleAddNewAdminPopup(state) {
      state.addNewAdminPopup = !state.addNewAdminPopup;
    },
    toggleReturnBookPopup(state) {
      state.returnBookPopup = !state.returnBookPopup;
    },
    toggleAddPYQPopup(state) { // Add this reducer
      state.addPYQPopup = !state.addPYQPopup;
    },
    closeAllPopup(state) {
      state.addBookPopup = false;
      state.addNewAdminPopup = false;
      state.readBookPopup = false;
      state.recordBookPopup = false;
      state.returnBookPopup = false;
      state.settingPopup = false;
      state.addPYQPopup = false; // Reset this state
    },
  },
});

export const {
  closeAllPopup,
  toggleAddBookPopup,
  toggleAddNewAdminPopup,
  toggleReadBookPopup,
  toggleRecordBookPopup,
  toggleReturnBookPopup,
  toggleSettingPopup,
  toggleAddPYQPopup, // Export the new reducer
} = popupSlice.actions;

export default popupSlice.reducer;