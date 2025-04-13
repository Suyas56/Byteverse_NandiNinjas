// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllPYQs } from "../store/slices/pyqSlice";

// const MyPYQs = () => {
//   const dispatch = useDispatch();
//   const { pyqs, loading } = useSelector((state) => state.pyq);

//   useEffect(() => {
//     dispatch(fetchAllPYQs());
//   }, [dispatch]);

//   return (
//     <div>
//       {loading ? <p>Loading...</p> : (
//         <ul>
//           {pyqs.map((pyq) => (
//             <li key={pyq._id}>
//               <h3>{pyq.title}</h3>
//               <p>{pyq.description}</p>
//               <a href={pyq.fileUrl} target="_blank" rel="noopener noreferrer">Download</a>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default MyPYQs;


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPYQs } from "../store/slices/pyqSlice";

const MyPYQs = () => {
  const dispatch = useDispatch();
  const { pyqs, loading, error } = useSelector((state) => state.pyq);

  useEffect(() => {
    dispatch(fetchAllPYQs());
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500 font-semibold">Error: {error}</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My PYQs</h1>
      <ul className="space-y-6">
        {pyqs.map((pyq) => (
          <li
            key={pyq._id}
            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition duration-300"
          >
            <h3 className="text-xl font-semibold mb-2">{pyq.title}</h3>
            <p className="text-gray-600 mb-4">{pyq.description}</p>
            <a
              href={pyq.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPYQs;