  function registeruser(e){
    e.preventDefault();
    const user = {
        name : e.target.name.value,
        email : e.target.email.value,
        phone : e.target.phone.value,
        password : e.target.password.value
    };
    axios.post("http://localhost:3000/register", user).then(res=>{
       if(res.data.errorMsg){
           alert(res.data.errorMsg);
       }
       else{
        alert("Success..")
       }
    })
}