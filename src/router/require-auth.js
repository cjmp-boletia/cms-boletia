import * as React from 'react';
import PropTypes from 'prop-types';
import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function RequireAuth({ children }) {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
}

RequireAuth.propTypes = {
    children: PropTypes.node,
};

RequireAuth.defaultProps = {
    children: <></>,
};

export default RequireAuth;