import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Main from "./layouts/Main";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { API, setAuthToken } from "./lib/api";
import { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { AUTH_CHECK, AUTH_ERROR } from "./stores/RootReducer";
import { useSelector } from "react-redux";
import { RootState } from "./stores/type/rootState";
import { toast } from "react-toastify";

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const auth = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function authCheck() {
    try {
      setAuthToken(localStorage.token)
      const response = await API.get('/auth/check')
      dispatch(AUTH_CHECK(response.data.user))
      setIsLoading(false)
    } catch (err) {
      dispatch(AUTH_ERROR())
      setIsLoading(false)
      navigate('/auth/login')
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      authCheck()
    } else {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const sse = new EventSource("http://localhost:5000/api/v1/notifications")

    sse.onmessage = () => {
      toast("Ada notifikasi baru, silahkan refresh browser untuk melihatnya!")
    }
  }, [])

  function IsLogin() {
    if (!auth.username) {
      return <Navigate to={"/auth/login"} />;
    } else {
      return <Outlet />;
    }
  }

  function IsNotLogin() {
    if (auth.username) {
      return <Navigate to={"/"} />;
    } else {
      return <Outlet />;
    }
  }

  return (
    <>
      {isLoading ? null :
        <Routes>
          <Route path="/" element={<IsLogin />}>
            <Route
              element={
                <Main>
                  <Home />
                </Main>
              }
              path="/"
            />
          </Route>
          <Route path="/" element={<IsNotLogin />}>
            <Route element={<Login />} path="/auth/login" />
            <Route element={<Register />} path="/auth/register" />
          </Route>
        </Routes>
      }
    </>
  );
}

