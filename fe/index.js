function registeruser(e) {
  e.preventDefault();
  const user = {
    name: e.target.name.value,
    email: e.target.email.value,
    phone: e.target.phone.value,
    password: e.target.password.value,
  };
  axios.post("http://localhost:3000/register", user).then((res) => {
    if (res.data.errorMsg) {
      alert(res.data.errorMsg);
    } else {
      alert("Success..");
    }
  });
}

function loginuser(e) {
  e.preventDefault();
  const user = {
    email: e.target.email.value,
    password: e.target.password.value,
  };
  axios
    .post("http://localhost:3000/login", user)
    .then((res) => {
    
      if (res.status === 200) {
        const token = res.data.token;
        localStorage.setItem('token' , token);
        window.location.href = "appPage.html";

      }
    })
    .catch((err) => {
      console.log(err);
    });
}

////  Functions to switch from login to signup and backwards
function enablesignup() {
  document.getElementById("signupform").hidden = false;
  document.getElementById("loginform").hidden = true;
}
function enablelogin() {
  document.getElementById("loginform").hidden = false;
  document.getElementById("signupform").hidden = true;
}
