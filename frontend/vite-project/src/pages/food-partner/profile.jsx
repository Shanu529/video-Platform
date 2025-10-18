import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);

  console.log("here is id using in profile ", id);
  
  useEffect(() => {
    const getProfileData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/api/food-partner/${id}`,
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
    "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400&auto=format&fit=crop&q=60";

  const username = profile.name || "Unknown";
  const bio = profile.description || "No bio available";
  // console.log("here is profile ",profile.foodItems.[0]description);
  

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b pb-6">
        <img
          src={avatar}
          alt="Avatar"
          className="w-36 h-36 rounded-full object-cover border-2 border-gray-300"
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
              className="relative w-full h-[20vh] aspect-square bg-gray-100 overflow-hidden group"
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
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-gray-400">
                  No media
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Profile;
