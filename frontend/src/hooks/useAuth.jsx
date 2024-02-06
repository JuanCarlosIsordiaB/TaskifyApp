import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';


export const useAuth = () => {
    const data = useContext(AuthContext);
    return data;
}