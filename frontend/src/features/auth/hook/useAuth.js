import { setError, setLoading, setUser } from "../state/auth.slice.js";
import { register } from "../services/auth.api.js";
import { useDispatch } from "react-redux";

export const useAuth = () => {
    const dispatch = useDispatch();

    async function handleRegister({email, password, fullname, contact, isSeller = false }){
        try {
            dispatch(setLoading(true));
            const data = await register({email, password, fullname, contact, role: isSeller });
            dispatch(setUser(data));
            dispatch(setLoading(false));
        } catch (error) {
            dispatch(setError(error.message));
            dispatch(setLoading(false));
        }
    };

    return { handleRegister };
};