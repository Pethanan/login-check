import React, {useState, useEffect} from "react";

const AuthContext = React.createContext(
    {isLoggedIn:false,
    onLogout: () =>{},
    onLogin: (email, pwd)=>{}}
);

export const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
  useEffect(()=>{
    const loginVerification = localStorage.getItem("isLoggedIn")
    if(loginVerification==="1")
    {
      setIsLoggedIn(true);
    }
  }, []);
    const loginHandler = (email, password) => {
        localStorage.setItem("isLoggedIn", "1")
        setIsLoggedIn(true);
      };
    
      const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn")
        setIsLoggedIn(false);
      };

      return <AuthContext.Provider value={{isLoggedIn:isLoggedIn, onLogin:loginHandler, onLogout:logoutHandler}}>{props.children}</AuthContext.Provider>
    
};
export default AuthContext;