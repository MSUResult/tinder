import cloudinary from "../config/cloudinary.js"; // Assuming you're using Cloudinary for image upload
import User from "../models/User.js"; // Adjust this import as needed for your User model

export const updateProfile = async (req, res) => {
  try {
    let updatedUser = {};
    
    // Check if there's a file in the request (image upload)
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        // Optional: set transformation options here, e.g., resizing images
        resource_type: "image",
        folder: "your_folder_name", // Customize your Cloudinary folder name here
        // Add any other settings you may need
      });

      if (!uploadResult) {
        return res.status(500).json({ message: "Error uploading image to Cloudinary" });
      }

      // Set the profile image URL from the upload result
      updatedUser.profilePicture = uploadResult.secure_url; // The image URL returned from Cloudinary
    }

    // Update user profile information (e.g., name, bio, etc.)
    if (req.body.name) updatedUser.name = req.body.name;
    if (req.body.bio) updatedUser.bio = req.body.bio;

    // Update the user in the database
    const user = await User.findByIdAndUpdate(req.user.id, updatedUser, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (err) {
    console.error("Error in updateProfile:", err);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};
