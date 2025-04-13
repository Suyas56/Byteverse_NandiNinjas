import { PYQ } from "../models/pyqModel.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

// export const addPYQ = catchAsyncErrors(async (req, res, next) => {
//   const { title, description, fileUrl } = req.body;
//   const uploadedBy = req.user._id;

//   if (!title || !description || !fileUrl) {
//     return next(new ErrorHandler("All fields are required.", 400));
//   }

//   const pyq = await PYQ.create({ title, description, fileUrl, uploadedBy });
//   res.status(201).json({ success: true, message: "PYQ added successfully.", pyq });
// });


export const addPYQ = async (req, res, next) => {
  try {
    const { title, description, fileUrl } = req.body;
    if (!title || !description || !fileUrl) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const pyq = await PYQ.create({ title, description, fileUrl, uploadedBy: req.user._id });
    res.status(201).json({ success: true, message: "PYQ added successfully.", pyq });
  } catch (error) {
    console.error("Error in addPYQ:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getAllPYQs = catchAsyncErrors(async (req, res, next) => {
  const pyqs = await PYQ.find().populate("uploadedBy", "name email");
  res.status(200).json({ success: true, pyqs });
});