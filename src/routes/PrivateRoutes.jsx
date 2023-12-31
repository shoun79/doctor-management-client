import React, { Children, useContext } from 'react';
import { AuthContext } from '../providers/AuthProviders';
import { Button, Spinner } from 'flowbite-react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <div className='w-1/4 mx-auto my-10'>
            <Button>
                <Spinner aria-label="Spinner button example" size="sm" />
                <span className="pl-3">Loading...</span>
            </Button>
        </div>

    }
    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace> </Navigate>
};

export default PrivateRoutes;