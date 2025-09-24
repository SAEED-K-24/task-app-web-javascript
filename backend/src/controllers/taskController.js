const taskModel = require('../models/taskModel');
const { successResponse, errorResponse } = require("../utils/apiResponse");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();


async function getAllTasks(req,res,next) {
    try{
        const authHeader = req.header("Authorization");
            const token = authHeader.split(" ")[1];
            
            const decoded = jwt.verify(
              token,
              process.env.JWT_SECRET);
        
            const userId = decoded.userId;
            
        const tasks = await taskModel.getAllTasks(userId);
        return successResponse(res, tasks,"Tasks fetched successfully");
    }catch(err){
        return errorResponse(res, "Failed to fetch tasks", 500, err.message);
    }
}

async function getTaskById(req,res,next) {
    try{
        const authHeader = req.header("Authorization");
            const token = authHeader.split(" ")[1];
            
            const decoded = jwt.verify(
              token,
              process.env.JWT_SECRET);
        
            const userId = decoded.userId;
        const task = await taskModel.getTaskById(req.params.id,userId);
        if(task){
            return successResponse(res, task,"Tasks fetched successfully");
        }else{
            return successResponse(res, task,"Task Not found",404);
        }
    }catch(err){
        return errorResponse(res, "Failed to fetch tasks", 500, err.message);
    }
}

async function createTask(req,res,next){
    try{
        const authHeader = req.header("Authorization");
            const token = authHeader.split(" ")[1];
            
            const decoded = jwt.verify(
              token,
              process.env.JWT_SECRET);
        
            const userId = decoded.userId;
        const {title,description} = req.body;
        const newTask = await taskModel.createTask(title,description,userId);
        return successResponse(res, newTask,"Task created successfully",201);
    }catch(err){
        return errorResponse(res, "Failed to create task", 500, err.message);
    }
}

async function updateTask(req,res,next){
    try{
        const {title,description,completed} = req.body;
        const authHeader = req.header("Authorization");
            const token = authHeader.split(" ")[1];
            
            const decoded = jwt.verify(
              token,
              process.env.JWT_SECRET);
        
            const userId = decoded.userId;
        const existingTask = await taskModel.getTaskById(req.params.id,userId);   
        if(!existingTask){
            return errorResponse(res, "Task not found", 404);
        }
        
        const updatedTask = await taskModel.updateTask(req.params.id,userId,title,description,completed);
        return successResponse(res, updatedTask,"Task updated successfully");
    }catch(err){
        return errorResponse(res, "Failed to update task", 500, err.message);
    }
}

async function deleteTask(req,res,next){
    try{
        const authHeader = req.header("Authorization");
            const token = authHeader.split(" ")[1];
            
            const decoded = jwt.verify(
              token,
              process.env.JWT_SECRET);
        
            const userId = decoded.userId;

        const existingTask = await taskModel.getTaskById(req.params.id,userId);
        if(!existingTask){
            return errorResponse(res, "Task not found", 404);
        }
        await taskModel.deleteTask(req.params.id,userId);
        return successResponse(res, null,"Task deleted successfully");
    }catch(err){
        return errorResponse(res, "Failed to delete task", 500, err.message);
    }
}


module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};