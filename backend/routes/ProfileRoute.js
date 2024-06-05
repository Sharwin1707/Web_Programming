import express from "express";
import { ArtistProfileModel, UserProfileModel } from "../models/Profile.js";

const router = express.Router();

//user profile

router.post("/user", async (req, res) => {
  try {
    const { _id, image, username, firstName, lastName, email } = req.body;

    if (!_id || !image || !username || !firstName || !lastName || !email) {
      return res.status(400).json({ message: "Please complete the required fields" });
    }

    const profile = new UserProfileModel({
      _id,
      image,
      username,
      firstName,
      lastName,
      email
    });
    await profile.save();

    return res.status(201).json({ message: "Profile saved successfully" });
  } catch (e) {
    console.error(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await UserProfileModel.findById(id);

    if (!profile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    return res.status(200).json(profile);
  } catch (e) {
    console.error(e.message);
    return res
      .status(500)
      .json({ message: "An error occurred", error: e.message });
  }
});

router.put("/user/image", async (req, res) => {
  try {
    const { _id, image } = req.body;

    // Validate that both _id and image are provided
    if (!_id || !image) {
      return res
        .status(400)
        .json({ message: "Both _id and image are required" });
    }

    // Find the artist profile by ID and update the image
    const profile = await UserProfileModel.findByIdAndUpdate(
      _id,
      { image },
      { new: true }
    );

    // Check if the profile was found and updated
    if (!profile) {
      return res.status(404).json({ message: "Artist profile not found" });
    }

    // Respond with the updated profile
    return res
      .status(200)
      .json({ message: "Image updated successfully", profile });
  } catch (e) {
    console.error(e.message);
    return res
      .status(500)
      .json({ message: "An error occurred", error: e.message });
  }
});


router.put("/user", async (req, res) => {
  try {
    const {
      _id,
      image,
      firstName,
      lastName,
      email,
    } = req.body;

    const profile = await ArtistProfileModel.findByIdAndUpdate(_id, {
      image,
      firstName,
      lastName,
      email,
    });

    if (!profile) {
      return res.status(404).json({ message: "Artist profile not found" });
    }

    return res.status(200).json({ message: "Save successfully", profile });
  } catch (e) {
    console.error(e.message);
    return res
      .status(500)
      .json({ message: "An error occurred", error: e.message });
  }
});

//artist profile
router.get("/artist", async (req, res) => {
  try {
    const artist = await ArtistProfileModel.find();
    if (!artist) {
      return res.status(404).send("artist not found");
    }
    return res.status(200).send(artist);
  } catch (e) {
    console.log(e);
  }
});

router.get("/artist/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await ArtistProfileModel.findById(id);

    if (!profile) {
      return res.status(404).json({ message: "Artist profile not found" });
    }

    return res.status(200).json(profile);
  } catch (e) {
    console.error(e.message);
    return res
      .status(500)
      .json({ message: "An error occurred", error: e.message });
  }
});

router.post("/artist", async (req, res) => {
  try {
    const {
      _id,
      image,
      firstName,
      lastName,
      stageName,
      career,
      genre,
      birthday,
      music,
      email,
      about,
    } = req.body;

    if (
      !_id ||
      !image ||
      !firstName ||
      !lastName ||
      !stageName ||
      !career ||
      !music ||
      !email ||
      !about ||
      !genre ||
      !birthday
    ) {
      return res.send("Please complete the required fields");
    }

    const profile = new ArtistProfileModel({
      _id: _id,
      image: image,
      firstName: firstName,
      lastName: lastName,
      stageName: stageName,
      career: career,
      genre: genre,
      birthday: birthday,
      music: music,
      email: email,
      about: about,
    });
    await profile.save(profile);

    return res.send("Save successfully");
  } catch (e) {
    console.log(e.message);
  }
});

router.put("/artist", async (req, res) => {
  try {
    const {
      _id,
      image,
      firstName,
      lastName,
      stageName,
      career,
      genre,
      birthday,
      music,
      email,
      about,
    } = req.body;

    const profile = await ArtistProfileModel.findByIdAndUpdate(_id, {
      image,
      firstName,
      lastName,
      stageName,
      career,
      genre,
      birthday,
      music,
      email,
      about,
    });

    if (!profile) {
      return res.status(404).json({ message: "Artist profile not found" });
    }

    return res.status(200).json({ message: "Save successfully", profile });
  } catch (e) {
    console.error(e.message);
    return res
      .status(500)
      .json({ message: "An error occurred", error: e.message });
  }
});

router.put("/artist/image", async (req, res) => {
  try {
    const { _id, image } = req.body;

    // Validate that both _id and image are provided
    if (!_id || !image) {
      return res
        .status(400)
        .json({ message: "Both _id and image are required" });
    }

    // Find the artist profile by ID and update the image
    const profile = await ArtistProfileModel.findByIdAndUpdate(
      _id,
      { image },
      { new: true }
    );

    // Check if the profile was found and updated
    if (!profile) {
      return res.status(404).json({ message: "Artist profile not found" });
    }

    // Respond with the updated profile
    return res
      .status(200)
      .json({ message: "Image updated successfully", profile });
  } catch (e) {
    console.error(e.message);
    return res
      .status(500)
      .json({ message: "An error occurred", error: e.message });
  }
});

export { router };
