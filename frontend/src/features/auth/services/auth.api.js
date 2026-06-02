import axios from "axios";

const authApiInstace = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true,
});

export async function register({email, password, fullname, contact, role}){
    const response = await authApiInstace.post("/register", {  
        email,
        password,
        fullname,
        contact,
        role,
        isSeller
    });
    return response.data;
}