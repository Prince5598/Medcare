const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = (()=>{
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (()=>{
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});
signupLink.onclick = (()=>{
  signupBtn.click();
  return false;
});

function validateForm() {
  var email = document.getElementById("email").value;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var confirmpass = document.getElementById("confirmpass").value;
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
  
  var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  
  var usernameRegax = /^[A-Za-z@][A-Za-z0-9_@]{7,29}$/;

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return false;
  }
  if(!usernameRegax.test(username)){
    alert("invalid username, at least 8 characters required");
    return false;
  }
  if (!passwordRegex.test(password)) {
    alert("Please enter a valid password (at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number)");
    return false;
  }
  
  if(password !== confirmpass){
    alert("Both password must be equall!");
    return false;
  }
  return true;
}
