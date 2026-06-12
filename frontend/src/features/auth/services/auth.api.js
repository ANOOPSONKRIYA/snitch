import axios from "axios";

const authApiInstace = axios.create({
    baseURL: "/api/auth",
    withCredentials: true,
});

export async function register({ email, password, confirmPassword, fullname, contact, isSeller = false }){
    const response = await authApiInstace.post("/register", {  
        email,
        password,
        confirmPassword,
        fullname,
        contact,
        isSeller
    });
    return response.data;
}

export async function login({ email, password }){
    const response = await authApiInstace.post("/login", {
        email,
        password,
    });
    return response.data;
}

export async function getMe(){
    const response = await authApiInstace.get("/me");
    return response.data;
}