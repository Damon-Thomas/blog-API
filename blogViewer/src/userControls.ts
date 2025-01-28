async function loggedInVerifier(){
    try{
    const response = await fetch("http://localhost:3000/users/protected", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }});
    const json = await response.json();
    const user = json.user;
    return user;}
    catch(error){
        console.log('Error', error);
    }
}

export {
    loggedInVerifier,
}