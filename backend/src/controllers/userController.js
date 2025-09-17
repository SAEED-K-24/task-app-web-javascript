const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { successResponse, errorResponse } = require("../utils/apiResponse");
const dotenv = require("dotenv");

dotenv.config();

async function getAllUsers(req, res, next) {
  try {    
    const users = await userModel.getAllUsers();
    return successResponse(res, users, "Users fetched successfully");
  } catch (err) {
    return errorResponse(res, "Failed to fetch users", 500, err.message);
  }
}

async function getUserById(req, res, next) {  
  try {
    const user = await userModel.getUserById(req.params.id);
    if (user) {
      return successResponse(res, user, "User fetched successfully");
    } else {
      return successResponse(res, user, "User Not found", 404);
    }
  } catch (err) {
    return errorResponse(res, "Failed to fetch user", 500, err.message);
  }
}

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    //check if user exists
    const user = await userModel.login(email);
    if (!user) {
      return errorResponse(res, "Invalid email or password", 401);
    }
    //check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //generate token
    const payload = { userId: user.id };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Logged in successfully",
      token: token,
    });
  } catch (err) {
    return errorResponse(res, "Failed to login user", 500, err.message);
  }
}

async function createUser(req, res, next) {
  try {
    const { email, name, password } = req.body;
    //password hasing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.createUser(email, name, hashedPassword);
    return successResponse(res, newUser, "User created successfully", 201);
  } catch (err) {
    return errorResponse(res, "Failed to create user", 500, err.message);
  }
}

async function profile(req, res, next) {
  
  try {
    
    const authHeader = req.header("Authorization");
    const token = authHeader.split(" ")[1];
    
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET);

    const userId = decoded.userId;
    
    const user = await userModel.getUserById(userId);
    if (!user) {
      return errorResponse(res, "User not found", 404);
    }
    return successResponse(res, user, "User profile fetched successfully");
  } catch (err) {
    return errorResponse(res, "Failed to fetch user profile", 500, err.message);
  }
}

async function updateUser(req, res, next) {
  try {
    const { email, name, password } = req.body;
    //get id from token
    const authHeader = req.header("Authorization");
    const token = authHeader.split(" ")[1];
    
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET ||
        "asflkjdlkjfskjljkfsafiasdgdfjgkdfhsgiwhegwegjgdshsjkdkjsdkjshjsdghksdgjsdgksdggdssgdgsdsdg"
    );
    
    const userId = decoded.userId;

    const existingUser = await userModel.getUserById(userId);
    if (!existingUser) {
      return errorResponse(res, "User not found", 404);
    }

    //password hasing
    let hashedPassword;
    if(password != undefined || password != null){
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
    }
    const updatedUser = await userModel.updateUser(
      userId,
      email || existingUser.email,
      name || existingUser.name,
      hashedPassword || existingUser.password
    );
    return successResponse(res, updatedUser, "User updated successfully");
  } catch (err) {
    return errorResponse(res, "Failed to update user", 500, err.message);
  }
}

async function deleteUser(req, res, next) {
  try {
    //get id from token
    const authHeader = req.header("Authorization");
    const token = authHeader.split(" ")[1];
    
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET ||
        "asflkjdlkjfskjljkfsafiasdgdfjgkdfhsgiwhegwegjgdshsjkdkjsdkjshjsdghksdgjsdgksdggdssgdgsdsdg"
    );
    
    const userId = decoded.userId;

    const existingUser = await userModel.getUserById(userId);
    if (!existingUser) {
      return errorResponse(res, "User not found", 404);
    }

    await userModel.deleteUser(userId);
    return successResponse(res, null, "User deleted successfully");
  } catch (err) {
    return errorResponse(res, "Failed to delete user", 500, err.message);
  }
}

async function logout(req, res, next) {
  const authHeader = req.header("Authorization");
    const token = authHeader.split(" ")[1];
    
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET ||
        "asflkjdlkjfskjljkfsafiasdgdfjgkdfhsgiwhegwegjgdshsjkdkjsdkjshjsdghksdgjsdgksdggdssgdgsdsdg"
    );

    
    return successResponse(res, null, "Logged out successfully");
}

module.exports = {
  profile,
  loginUser,
  logout,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
