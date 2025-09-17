const taskModel = require('../models/taskModel');
const { successResponse, errorResponse } = require("../utils/apiResponse");
async function getAllTasks(req,res,next) {
    try{
        const tasks = await taskModel.getAllTasks();
        return successResponse(res, tasks,"Tasks fetched successfully");
    }catch(err){
        return errorResponse(res, "Failed to fetch tasks", 500, err.message);
    }
}

async function getTaskById(req,res,next) {
    try{
        const task = await taskModel.getTaskById(req.params.id);
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
        const {title,description} = req.body;
        const newTask = await taskModel.createTask(title,description);
        return successResponse(res, newTask,"Task created successfully",201);
    }catch(err){
        return errorResponse(res, "Failed to create task", 500, err.message);
    }
}

async function updateTask(req,res,next){
    try{
        const {title,description,completed} = req.body;
        const existingTask = await taskModel.getTaskById(req.params.id);   
        if(!existingTask){
            return errorResponse(res, "Task not found", 404);
        }
        const updatedTask = await taskModel.updateTask(req.params.id,title,description,completed);
        return successResponse(res, updatedTask,"Task updated successfully");
    }catch(err){
        return errorResponse(res, "Failed to update task", 500, err.message);
    }
}

async function deleteTask(req,res,next){
    try{
        
        const existingTask = await taskModel.getTaskById(req.params.id);
        if(!existingTask){
            return errorResponse(res, "Task not found", 404);
        }
        await taskModel.deleteTask(req.params.id);
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