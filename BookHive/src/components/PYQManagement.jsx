

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPYQs } from "../store/slices/pyqSlice";
import AddPYQPopup from "../popups/AddPYQPopup";
import { toggleAddPYQPopup } from "../store/slices/popUpSlice";

const PYQManagement = () => {
  const dispatch = useDispatch();
  const { pyqs, loading } = useSelector((state) => state.pyq);

  useEffect(() => {
    dispatch(fetchAllPYQs());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Page Header */}
      <header className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-bold mb-2">PYQ Management</h1>
        <p className="text-gray-400">
          Upload, view, and manage Previous Year Questions (PYQs) efficiently. 
          Keep your library updated and organized for your users.
        </p>
      </header>

      {/* Action Bar */}
      <div className="max-w-6xl mx-auto flex justify-end mb-8">
        <button
          onClick={() => dispatch(toggleAddPYQPopup())}
          className="bg-white text-black font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition duration-300"
        >
          + Add New PYQ
        </button>
      </div>

      {/* Content Area */}
      <main className="max-w-6xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-lg font-semibold">Loading PYQs...</p>
          </div>
        ) : pyqs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-60 text-center">
            <p className="text-2xl font-semibold mb-4">No PYQs Found</p>
            <p className="text-gray-500 mb-6">
              Start by uploading your first PYQ using the button above.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pyqs.map((pyq) => (
              <li
                key={pyq._id}
                className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-white transition duration-300"
              >
                <h3 className="text-xl font-bold mb-2">{pyq.title}</h3>
                <p className="text-gray-400 mb-4 text-sm">{pyq.description}</p>
                <a
                  href={pyq.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-auto text-sm font-semibold bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-300 transition"
                >
                  Download PYQ
                </a>
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* Popup for Adding PYQ */}
      <AddPYQPopup />
    </div>
  );
};

export default PYQManagement;