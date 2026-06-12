import { setError, setLoading, setUser } from "../state/auth.slice.js";
import { getMe, login, register } from "../services/auth.api.js";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

export const useAuth = () => {
    const dispatch = useDispatch();
    const { loading, error, user } = useSelector((state) => state.auth);

    async function handleRegister({email, password, confirmPassword, fullname, contact, isSeller = false }){
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await register({email, password, confirmPassword, fullname, contact, isSeller });
            dispatch(setUser(data.user || data));
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
            dispatch(setUser(data.user || data));
            dispatch(setLoading(false));
            return data;
        } catch (error) {
            dispatch(setError(error?.response?.data?.message || error.message));
            dispatch(setLoading(false));
            throw error;
        }
    };

    const syncCurrentSession = useCallback(async () => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await getMe();
            dispatch(setUser(data.user || data));
            dispatch(setLoading(false));
            return data;
        } catch {
            dispatch(setLoading(false));
            return null;
        }
    }, [dispatch]);

    return { handleRegister, handleLogin, syncCurrentSession, loading, error, user };
};