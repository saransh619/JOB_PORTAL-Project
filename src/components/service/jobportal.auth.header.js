export const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if(user && user.jwtToken){
        // console.log("user", user);
        // console.log("user.jwtToken", user.jwtToken);
        return{
           
            Authorization: `Bearer ${user.jwtToken}`
        }
    }else{
        return {}
    }
}

export const authToken = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if(user && user.jwtToken){
        return `${user.jwtToken}`;
    }else{
        return "";
    }
}

export const authHeaderMultiPart = () =>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user && user.jwtToken){
        return{
            // 'Content-Type': 'application/json',
            // Authorization: `Bearer ${user.jwtToken}`,
            'Content-Type': 'multipart/form-data'
        };
    }else{
        return {};
    }
}