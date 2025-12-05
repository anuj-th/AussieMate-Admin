import { useState, useRef } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

export default function Settings() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/gif", "image/png"];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid JPG, GIF or PNG file");
        return;
      }

      // Validate file size (800KB)
      if (file.size > 800 * 1024) {
        alert("File size must be less than 800KB");
        return;
      }

      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleResetImage = () => {
    setProfileImage(null);
    setImagePreview(null);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleResetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
    });
    handleResetImage();
  };

  const handleSaveChanges = () => {
    // TODO: Implement save functionality
    console.log("Saving changes:", { ...formData, profileImage });
    alert("Changes saved successfully!");
  };

  return (
    <div className="w-full space-y-6">
      {/* Settings Header */}
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      {/* Centered Content */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Picture Section */}
        <div className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="/Profile.svg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          {/* Upload Buttons */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap gap-3">
              <input
                ref={fileInputRef}
                id="profile-image-upload"
                type="file"
                accept="image/jpeg,image/jpg,image/gif,image/png"
                className="hidden"
                onChange={handleImageUpload}
              />
              <Button
                variant="primary"
                size="md"
                type="button"
                onClick={handleUploadClick}
                className="cursor-pointer"
              >
                Upload New Photo
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={handleResetImage}
              >
                Reset
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Allowed JPG, GIF or PNG. Max size of 800KB
            </p>
          </div>
        </div>
      </div>

        {/* Divider */}
        <div className="border-t" style={{ borderColor: 'rgba(7, 20, 55, 0.10)' }}></div>

        {/* Profile Info Section */}
      <div className="p-6 space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">Profile Info</h2>

        <div className="space-y-4">
          {/* First Name and Last Name - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <Input
              label="Last Name"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>

          {/* Email Address - Full Width */}
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter mail address"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
      </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="primary" size="md" onClick={handleSaveChanges}>
            Save Changes
          </Button>
          <Button variant="outline" size="md" onClick={handleResetForm}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}

