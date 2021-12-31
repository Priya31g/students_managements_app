import { useContext } from "react"
import { Redirect } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { Route } from "react-router-dom";

export const PrivateRoute=({children,path,push})=>{
    const {token} =useContext(AuthContext);

    if(!token){
        return <Redirect to="/login" push={path}/>
    }
    return (
        <Route path ={path}>
            {children}
        </Route>
    )
}