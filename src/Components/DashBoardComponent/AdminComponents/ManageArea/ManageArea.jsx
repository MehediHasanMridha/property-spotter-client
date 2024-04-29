import React, { useRef, useState } from "react";
import axios from "axios";

const ManageArea = () => {
  const [showName, setShowName] = useState("");
  const [showImagePreview, setShowImagePreview] = useState("");
  const fileInputRef = useRef();

  const handleManageArea = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", e.target.name.value);
      formData.append("city", e.target.city.value);
      formData.append("country", e.target.country.value);
      if (showName) {
        formData.append("image", showName);
      }
      const response = await axios.post("/api/post-route", formData);
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClearFile = () => {
    setShowName("");
    setShowImagePreview("");
    fileInputRef.current.value = "";
  };

  console.log(showName);
  return (
    <>
      <div className="min-h-screen">
        <div className="lg:w-[600px] mx-auto shadow-xl bg-white p-16">
          <form onSubmit={handleManageArea}>
            <div>
              <h1 className="text-4xl font-bold text-center my-4 pb-10">
                Manage Area Form
              </h1>
            </div>
            <div className="space-y-10">
              {/* Input fields for name, city, and country */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="border border-black py-3 px-5 w-full"
                />
                <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                  Your Name
                </h1>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="border border-black py-3 px-5 w-full"
                />
                <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                  Your City
                </h1>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="border border-black py-3 px-5 w-full"
                />
                <h1 className="absolute -top-2 left-4 px-1 bg-white text-sm">
                  Your Country
                </h1>
              </div>
              {/* Image preview section */}
              <div className="my-10">
                {showName && (
                  <div className="mx-auto flex max-w-[600px] items-center gap-x-6 rounded-lg border-2 border-dashed border-gray-400 p-5 bg-white">
                    <img
                      className="size-[100px] h-[100px] w-full max-w-[150px] rounded-lg object-cover"
                      src={showImagePreview}
                      alt="Uploaded"
                    />
                    {/* Display the name and size of the uploaded image */}
                    <div className="flex-1 space-y-1.5 overflow-hidden">
                      <h5 className="text-xl font-medium tracking-tight truncate">
                        {showName.name}
                      </h5>
                      <p className="text-gray-500">
                        {(showName.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    {/* Button to clear the file */}
                    <div onClick={handleClearFile}>
                      <svg
                        width={30}
                        viewBox="0 -0.5 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* SVG content */}
                      </svg>
                    </div>
                  </div>
                )}
                {/* Input field for file upload */}
                <label
                  className="mx-auto flex max-w-[600px] flex-col items-center justify-center space-y-3 rounded-lg border-2 border-dashed border-gray-400 p-6 bg-white"
                  htmlFor="fileInput"
                >
                  <svg
                    width={50}
                    viewBox="0 0 42 32"
                    fill="#000000"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* SVG content */}
                  </svg>
                  <div className="space-y-1.5 text-center">
                    <h5 className="whitespace-nowrap text-lg font-medium tracking-tight">
                      Upload your file
                    </h5>
                    <p className="text-sm text-gray-500">
                      File should be in PNG, JPEG, or JPG format
                    </p>
                  </div>
                </label>
                <input
                  ref={fileInputRef}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const imageFile = e.target.files[0];
                      setShowName(imageFile);
                      setShowImagePreview(URL.createObjectURL(imageFile));
                    }
                  }}
                  className="hidden"
                  id="fileInput"
                  type="file"
                />
              </div>
              {/* Submit button */}
              <button
                type="submit"
                className="border-2 bg-black text-white border-black py-3 px-5 w-full"
              >
                Register Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ManageArea;
