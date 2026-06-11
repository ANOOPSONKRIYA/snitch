import { setError, setLoading, setUser } from "../state/auth.slice.js";
import { login, register } from "../services/auth.api.js";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
    const dispatch = useDispatch();
    const { loading, error, user } = useSelector((state) => state.auth);

    async function handleRegister({email, password, confirmPassword, fullname, contact, isSeller = false }){
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await register({email, password, confirmPassword, fullname, contact, isSeller });
            dispatch(setUser(data));
            dispatch(setLoading(false));
            return data;
        } catch (error) {
            dispatch(setError(error?.response?.data?.message || error.message));
            dispatch(setLoading(false));
            throw error;
        }
    };

    async function handleLogin({ email, password }){
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await login({ email, password });
            dispatch(setUser(data));
            dispatch(setLoading(false));
            return data;
        } catch (error) {
            dispatch(setError(error?.response?.data?.message || error.message));
            dispatch(setLoading(false));
            throw error;
        }
    };

    return { handleRegister, handleLogin, loading, error, user };
};