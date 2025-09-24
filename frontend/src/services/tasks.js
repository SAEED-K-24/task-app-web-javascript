import api from "./api_services";

export const getAllTasks =  () => {
    return api.get("/tasks");
}

export const getTaskById = (id) => {
    return api.get(`/tasks/${id}`);
}

export const createTask= (title,description)=>{
return api.post("/tasks",{title,description});
}

export const updateTask=(id,title,description,completed)=>{
    return api.put(`/tasks/${id}`,{title,description,completed});
}

export const deleteTask=(id)=>{
    return api.delete(`tasks/${id}`);
}