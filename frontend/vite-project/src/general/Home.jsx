import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { FiHeart } from "react-icons/fi";
import { FaCommentAlt } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

function Home() {
  const [videos, setVideos] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const response = axios
      .get("http://localhost:5000/api/food", { withCredentials: true })
      .then((res) => setVideos(res.data.foodItems))
      .catch((err) => console.log("Axios error:", err));
  }, []);

  const navigate = useNavigate();

  const profileCreater = async (id) => {
    navigate(`/food-partner/${id}`);
  };

  useEffect(() => {
    if (!videos.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.99) {
            // Video fully visible → play
            video.play().catch((err) => console.log("Play error:", err));
          } else {
            // Not fully visible → pause
            video.pause();
          }
        });
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100), // 0 → 1 step by 0.01
      }
    );

    const vids = containerRef.current?.querySelectorAll("video");
    vids?.forEach((video) => observer.observe(video));

    return () => observer.disconnect();
  }, [videos]);

  async function likeVideo(item) {
    console.log("here is itesm ", item._id);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/food/like",
        { foodId: item._id },
        { withCredentials: true }
      );

      if (res.data.message === "Food liked successfully") {
        console.log("Liked");
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id ? { ...v, likeCount: (v.likeCount || 0) + 1 } : v
          )
        );
      } else if (res.data.message === "Food unliked successfully") {
        console.log("Unliked");
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id ? { ...v, likeCount: (v.likeCount || 1) - 1 } : v
          )
        );
      }
    } catch (err) {
      console.log("Like error:", err.response?.data || err.message);
    }
  }

  const navigateLogin = async () => {
    navigate("/user/login");
  };

  const navigateFoodPartner= async () => {

    navigate("/food-partner/register");
    
  };

  return (
    <>
      <div className="flex justify-center w-screen">
        <div
          ref={containerRef}
          className="h-screen bg-black w-full  center overflow-y-scroll snap-y snap-mandatory"
        >
          {videos.length === 0 ? (
            <div className="text-white text-center h-full flex flex-col gap-5 items-center md:text-lg justify-center">
              <p>Loading videos...</p>
              <p>Login First To Watch Videos</p>
              <button
                onClick={navigateLogin}
                className="bg-teal-800 hover:bg-teal-700 px-14 py-2 hover:rounded-md hover:scale-105 duration-700 transition-all"
              >
                Login
              </button>
            </div>
          ) : (
            videos.map((item, index) => (
              <div
                key={index}
                className="h-screen   w-full relative snap-start flex items-center justify-center bg-black"
              >
                <video
                  src={item.video}
                  className="h-full w-full object-cover"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div className="absolute bottom-5 left-4 text-white">
                  <div className="flex items-center gap-2 mb-2 cursor-pointer">
                    <div
                      onClick={() => profileCreater(item.foodPartner)}
                      className="bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center text-sm"
                    >
                      {item.profileName?.charAt(0) || "P"}
                    </div>
                    <span className="font-semibold">
                      {item.name || "profile_name"}
                    </span>
                    <button className="ml-4 px-3 py-1 bg-red-500 rounded-full text-sm font-semibold">
                      Follow
                    </button>
                  </div>
                  <p className="text-sm">
                    {item.description || "Video description"}
                  </p>
                </div>

                <div className="absolute right-0 bottom-[8%] gap-5 text-white">
                  <div className="flex flex-col gap-14">
                    <div className="flex-col items-center    gap-8 mb-2 cursor-pointer">
                      <div className="text-center ">
                        <FiHeart
                          onClick={() => likeVideo(item)}
                          className=" h-12  w-12  pt-5 hover:text-red-400"
                        />
                        <span className="text-center">
                          {item.likeCount || 0}
                        </span>
                      </div>

                      <FaCommentAlt className=" h-12  w-12  pt-5" />
                      <FaBookmark className=" h-12  w-12  pt-5" />
                    </div>

                    <div>
                      <FaPlus onClick={navigateFoodPartner}  className=" h-12  w-12  pt-5 " />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
