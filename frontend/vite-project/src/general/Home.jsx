


import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";

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

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory"
    >
      {videos.length === 0 ? (
        <p className="text-white text-center mt-20">Loading videos...</p>
      ) : (
        videos.map((item, index) => (
          <div
            key={index}
            className="h-screen w-full relative snap-start flex items-center justify-center bg-black"
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
                  onClick={()=>profileCreater(item.foodPartner)}
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
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
