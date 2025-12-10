import { useState, useRef } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

export default function Settings() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "" });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/gif", "image/png"];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid JPG, GIF or PNG file");
        return;
      }
      if (file.size > 800 * 1024) {
        alert("File size must be less than 800KB");
        return;
      }

      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleResetImage = () => {
    setProfileImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleResetForm = () => {
    setFormData({ firstName: "", lastName: "", email: "" });
    handleResetImage();
  };

  const handleSaveChanges = () => {
    console.log("Saving changes:", { ...formData, profileImage });
    alert("Changes saved successfully!");
  };

  return (
    <div className="w-full space-y-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Profile Section */}
        <div className="py-4 sm:py-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">

            <div className="flex-shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden flex items-center justify-center mx-auto md:mx-0">
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <img src="/Profile.svg" alt="Profile" className="w-full h-full object-cover" />
                )}
              </div>
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
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
                  className="text-xs sm:text-[13px] md:text-sm"
                  onClick={handleUploadClick}
                >
                  Upload New Photo
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  className="text-xs sm:text-[13px] md:text-sm"
                  onClick={handleResetImage}
                >
                  Reset
                </Button>
              </div>

              <p className="text-xs sm:text-sm md:text-[16px] font-medium text-gray-500 text-center md:text-left">
                Allowed JPG, GIF or PNG. Max size of 800KB
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Profile Info */}
        <div className="">
          <h2 className="text-[15px] sm:text-[17px] md:text-[18px] font-semibold text-primary mb-4 text-center md:text-left">
            Profile Info
          </h2>

          <div className="space-y-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleInputChange}
                labelClassName="text-[11px] sm:text-xs md:text-[13px] font-medium"
              />

              <Input
                label="Last Name"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                labelClassName="text-[11px] sm:text-xs md:text-[13px] font-medium"
              />
            </div>

            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter mail address"
              value={formData.email}
              onChange={handleInputChange}
              labelClassName="text-[11px] sm:text-xs md:text-[13px] font-medium"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pb-6">
          <Button
            variant="primary"
            size="md"
            className="text-xs sm:text-[13px] md:text-sm"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>

          <Button
            variant="outline"
            size="md"
            className="text-xs sm:text-[13px] md:text-sm"
            onClick={handleResetForm}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
