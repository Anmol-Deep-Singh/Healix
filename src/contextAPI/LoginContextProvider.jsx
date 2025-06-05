import { createContext,useState } from "react";

export const LoginContext = createContext(null);

export const LoginContextProvider = (props) => {
    const [user, setuser] = useState('ditto');
    return(
        <LoginContext.Provider value = { { user } }>
            { props.children }
        </LoginContext.Provider>
    )
} 