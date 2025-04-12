
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadPDF = createAsyncThunk("pdf/upload", async (formData) => {
  const response = await axios.post("/api/v1/pdf/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
});

const pdfSlice = createSlice({
  name: "pdf",
  initialState: { pdfs: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadPDF.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadPDF.fulfilled, (state, action) => {
        state.loading = false;
        state.pdfs.push(action.payload);
      })
      .addCase(uploadPDF.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default pdfSlice.reducer;