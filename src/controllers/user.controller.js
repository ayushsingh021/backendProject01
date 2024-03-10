import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //logic
  // get user details from frontend
  // validation - not empty
  // check if user already exists -- username, email
  // check for images and check for avatar
  // upload them to cloudinary -- avatar
  // create user object, create entry in db
  // remove password and refresh tokens field form response
  // check for user creation
  // return response

  // 1. get user details from frontend
  //if data coming from form or json then we will get it in req.body() and if from url
  const { fullName, email, username, password } = req.body;

  // 2.validation - not empty
  //   if(fullName === ""){
  //     throw new ApiError(400 , "fullName is required")
  //   }

  //cool way
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //3. check if user already exists -- username, email if any of username or email same then duplicate user
  // "User" -- model is directly connected to mongoose by this User and can be accessed

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already existed");
  }
  //4. check for images and check for avatar
  //multer gives access of req.files

  const avatarLocalPath = req.files?.avatar[0]?.path;
  //   const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }
  //   console.log(req.files);
  // console.log(req.body)

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  // 5.upload them to cloudinary -- avatar
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }
  //6. create user object, create entry in db
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  //7. remove password and refresh tokens field form response

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // 8.check for user creation
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  //9. return response
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
