import api from "../services/api_services.js";

export const signIn = (email, password) => {
  return api.post("/users/login", { email, password });
};

export const signUp =  (name,email,password) => {
    return api.post("/users",{name,email,password});
}