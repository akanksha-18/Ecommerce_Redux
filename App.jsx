
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from './redux/actions/productActions';
import { RouterProvider } from 'react-router-dom'; 
import router from './routes/AllRoutes'; 


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
   
      <RouterProvider router={router} /> 
    </>
  );
}

export default App;