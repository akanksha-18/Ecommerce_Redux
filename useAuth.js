import { useSelector } from 'react-redux';

export const useAuth = () => {
    const user = useSelector((state) => state.auth.user);
    const isLoading = useSelector((state) => state.auth.status === 'loading');
    return { user, isLoading }; 
};
