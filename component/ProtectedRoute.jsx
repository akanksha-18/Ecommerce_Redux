// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//     // const { user, isLoading } = useAuth(); 
//     let user = JSON.parse(localStorage.getItem('user'));

//     console.log('User in ProtectedRoute:', user);

//     // if (isLoading) {
//     //     return <div>Loading...</div>; 
//     // }

//     if (user && user.uid) {
//         return children; 
//     } else {
//         return <Navigate to="/login" />; 
//     }
// };

// export default ProtectedRoute;


import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    let user = JSON.parse(localStorage.getItem('user'));

    console.log('User in ProtectedRoute:', user);

    if (user && user.uid) {
        return children; 
    } else {
        return <Navigate to="/login" />; 
    }
};

export default ProtectedRoute;
