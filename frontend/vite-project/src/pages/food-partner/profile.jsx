import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null); // 👈 for fullscreen video

  useEffect(() => {
    const getProfileData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
           `${import.meta.env.VITE_BACKEND_URL}/food-partner/${id}`,
          {
            withCredentials: true,
          }
        );
        const data = res.data.foodPartner;
        setProfile(data || {});
        setVideos(Array.isArray(data.foodItems) ? data.foodItems : []);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setProfile(null);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    getProfileData();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!profile) return <p className="text-center mt-10">Profile not found</p>;

  const avatar =
    profile.avatar ||
    profile.logo ||
    "https://as2.ftcdn.net/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg";

  const username = profile.name || "Unknown";
  const bio = profile.description || "No bio available";

  return (
    <div className="max-w-4xl mx-auto p-4 relative">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b pb-6">
        <img
          src={avatar}
          alt="Avatar"
          className="w-36 h-36 rounded-full object-cover "
        />
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-4">
            <h2 className="text-2xl font-semibold">{username}</h2>
            <button
              onClick={() => setFollowing((f) => !f)}
              className={`px-4 py-2 text-sm rounded font-medium ${
                following
                  ? "bg-gray-200 text-black border border-gray-400"
                  : "bg-blue-500 text-white"
              }`}
            >
              {following ? "Following" : "Follow"}
            </button>
          </div>

          <div className="flex justify-center md:justify-start gap-6 text-gray-700 mb-3">
            <p>
              <strong>{videos.length}</strong> posts
            </p>
            <p>
              <strong>{profile.followers || 0}</strong> followers
            </p>
            <p>
              <strong>{profile.following || 0}</strong> following
            </p>
          </div>

          <div>
            <p className="font-medium">{profile.fullname || profile.name}</p>
            <p className="text-gray-600">{bio}</p>
            {profile.location && (
              <p className="text-sm text-gray-500">{profile.location}</p>
            )}
          </div>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-6">
        {videos.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">
            No videos uploaded yet
          </div>
        ) : (
          videos.map((v) => (
            <div
              key={v._id}
              onClick={() => setSelectedVideo(v.video)} // 👈 open fullscreen
              className="relative w-full h-[20vh] bg-gray-100 overflow-hidden group cursor-pointer"
            >
              {v.video ? (
                <video
                  src={v.video}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={v.thumbnail || ""}
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                  className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  No media
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* 🔥 Fullscreen Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setSelectedVideo(null)} // click outside to close
        >
          <video
            src={selectedVideo}
            controls
            autoPlay
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking video
          />
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-6 right-6 text-white text-3xl font-bold hover:text-gray-300"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
