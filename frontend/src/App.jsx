import { useState, useEffect, Suspense, lazy } from "react";
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { routes } from "./routes/routes";
import SuspenseLoader from "./components/common/SuspenseLoader";
import DataProvider from "./context/DataProvider";
import Login from "./pages/Login";
import axios from "axios";

const ErrorComponent = lazy(() => import("./components/common/ErrorComponent"));

const App = () => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = "http://localhost:8000/login/success";
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user._json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
    console.log("this is", user);
  }, []); // Run the effect only once on component mount

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path={routes.main.path} element={<Login />} />
        <Route
          path={routes.emails.path}
          element={<Navigate to={`${routes.emails.path}/inbox`} />}
        />
        <Route path={routes.main.path} element={<routes.main.element />}>
          <Route
            path={`${routes.emails.path}/:type`}
            element={<routes.emails.element />}
            errorElement={<ErrorComponent />}
          />
          <Route
            path={routes.view.path}
            element={<routes.view.element />}
            errorElement={<ErrorComponent />}
          />
        </Route>

        <Route
          path={routes.invalid.path}
          element={<Navigate to={`${routes.emails.path}/inbox`} />}
        />
        <Route path={routes.main.path} element={<Login />} />
      </Route>
    )
  );

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </Suspense>
  );
};

export default App;
