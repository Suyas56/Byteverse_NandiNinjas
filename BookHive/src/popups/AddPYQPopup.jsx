import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPYQ } from "../store/slices/pyqSlice";
import { toggleAddPYQPopup } from "../store/slices/popUpSlice";

const AddPYQPopup = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(addPYQ({ title, description, fileUrl }));
  //   dispatch(toggleAddPYQPopup());
  // };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting PYQ:", { title, description, fileUrl }); // Debug log
    dispatch(addPYQ({ title, description, fileUrl }));
    dispatch(toggleAddPYQPopup());
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="url" placeholder="File URL" value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} required />
        <button type="submit">Add PYQ</button>
      </form>
    </div>
  );
};

export default AddPYQPopup;