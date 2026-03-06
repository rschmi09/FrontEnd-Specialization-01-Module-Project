// src/components/ProtectedRoute.tsx

import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

interface Props {
    children: React.ReactElement;
}

const ProtectedRoute = ({ children }: Props) => {
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);

    if(!currentUser) {
        return <Navigate to='/register' replace />;
    }

    return children;

};

export default ProtectedRoute;
