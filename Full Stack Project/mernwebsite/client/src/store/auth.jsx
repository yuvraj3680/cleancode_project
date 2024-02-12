import { createContext, useContext, useState ,useEffect} from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

  const [token , setToken]=useState(localStorage.getItem("token"));

  // const [user , setUser]= useState("");
 
  //function to stored the token in local storage
  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };

   let isLoggedIn= !! token;
   console.log("isLoggedIn",isLoggedIn);

  //tackling the logout functionality

  const LogoutUser = ()=>{
    setToken("");
    return localStorage.removeItem("token");
  }

  // JWT Authomtication - to get the currently loggged user

  // const userAuthentication = async ()=>{
  //   try {
  //     const response = await fetch("http://localhost:5000/api/auth/user", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }); 
  //     if (response.ok) {
  //       const data = await response.json();
  //         console.log("user data" , data.userData) 
  //       // our main goal is to get the user data 👇
  //       setUser(data.userData);
  //     } else {
  //       console.error("Error fetching user data");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

    
  // useEffect(() => {
  //   userAuthentication();
  // }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS,LogoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};