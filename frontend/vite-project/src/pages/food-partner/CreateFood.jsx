import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateFood() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [video, setVideo] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const formHandler = async (e) => {
    e.preventDefault();

    if (!video) {
      toast.error("Please select a video!", { theme: "colored" });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("video", video);

    try {
      setLoading(true); // Start loading
      const response = await axios.post( `${import.meta.env.VITE_BACKEND_URL}/api/food`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Video uploaded successfully!", { theme: "colored" });
      navigate("/");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Upload failed", { theme: "colored" });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
        <div className="w-full max-w-lg bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-white">Upload Your Video</h2>
          <p className="text-gray-400 text-center">Want to Upload video</p>

          <form className="space-y-5" onSubmit={formHandler}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  placeholder="Video Description"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-1">Video</label>
                <input
                  onChange={(e) => setVideo(e.target.files[0])}
                  type="file"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 mt-4 bg-blue-600 hover:bg-blue-700 transition rounded-lg font-semibold text-white ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <a href="/food-partner/login" className="text-blue-400 hover:underline">
              Go To Home
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default CreateFood;
