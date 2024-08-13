import { createContext, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("asm03-user")) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const history = useHistory();
  useEffect(() => {
    const fetchUser = async () => {
      dispatch({ type: "LOGIN_START" });
      try {
        const response = await fetch(
          "https://asm3-nodejs-backend.onrender.com/users/session",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const responseData = await response.json();
        if (response.ok) {
          dispatch({ type: "LOGIN_SUCCESS", payload: responseData.user });
        } else {
          console.log("Navigating to login page");
          history.push("/login");
          console.log("After navigation");
        }
      } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error.message });
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
