import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/slices/auth.slice';

const useAuth = () => {
    const user = useSelector(selectCurrentUser);

    return useMemo(() => ({ user }), [user]);
};

export default useAuth;