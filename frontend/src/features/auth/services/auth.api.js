import axios from "axios";

const authApiInstace = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true,
});

export async function register({ email, password, fullname, contact, isSeller = false }){
    const response = await authApiInstace.post("/register", {  
        email,
        password,
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