window.onload = function() {
    checkLogin();
    checkLogout();
    payment();
    console.log(checkLogin())
  };

 const selectRegister = document.querySelector('.select-register');
 const selectLogin = document.querySelector('.select-login');
 const formRegister = document.querySelector('.form-register');
 const formLogin = document.querySelector('.form-login');

  selectRegister.onclick =  () => {

        selectRegister.classList.add('select');
        selectLogin.classList.remove('select');

        formRegister.classList.add('login-active')
        formLogin.classList.remove('login-active');

  }

  selectLogin.onclick = () => {

    selectRegister.classList.remove('select');
    selectLogin.classList.add('select');
    
    formLogin.classList.add('login-active'); 
    formRegister.classList.remove('login-active');
}



const login = document.querySelector('.login');
const formWrap = document.querySelector('#form-wrap');
const loginOverlay = document.querySelector('.login-overlay');
const loginClose = document.querySelector('.login-close');
const userIcon = document.querySelector('.user-icon');
const userInfor = document.querySelector('.user-infor');

login.onclick = () => {
    formWrap.classList.add('transform');
    loginOverlay.style.display = 'block';
}

loginOverlay.onclick = () => {
    formWrap.classList.remove('transform');
    loginOverlay.style.display = `none`;
}

loginClose.onclick = () => {
    formWrap.classList.remove('transform');
    loginOverlay.style.display = `none`;
}

userIcon.onclick = () => {
    userIcon.classList.toggle('active');
    userInfor.classList.toggle('show');
}


// Validate register
const $ = function(id) {
    return document.getElementById(id);
}

const validEmail = function(email){
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

$('register-submit').onclick = function() {
    let listUser= localStorage.getItem('listUser') ? JSON.parse(localStorage.getItem('listUser')) : [];

    let registerName = $('register-name').value;
    let registerEmail = $('register-email').value;
    let registerPassword = $('register-password').value;
    let registerConfirmPassword = $('register-password-confirm').value;

    // validate name
    isValid = true;
    if(!registerName){
        $('register-name-error').innerHTML = 'Please enter name';
        isValid = false;
    }else{
        $('register-name-error').innerHTML = '';
    }

    // validate email


    if(!registerEmail){
        $('register-email-error').innerHTML = 'Please enter email';
        isValid = false;
    }else if(!validEmail(registerEmail)){
        $('register-email-error').innerHTML = 'Please enter correct email format';
        isValid = false;
    }else{
        $('register-email-error').innerHTML = '';
    }

    listUser.map((item) => {
        if(registerEmail === item.email){
            $('register-email-error').innerHTML = 'Email already used, please enter another email email';
            isValid = false;
        }
    });

    // validate Password

    if(!registerPassword || registerPassword.length < 6 || registerPassword.length > 20){
        $('register-password-error').innerHTML = 'Please enter a password between 6 and 20 characters';
        isValid = false;
    }else{
        $('register-password-error').innerHTML = '';
    }

    // validate confirm Password

    if(registerConfirmPassword !== registerPassword){
        $('confirm-password-error').innerHTML = 'Please confirm password as above';
        isValid = false;
    }else if(!registerConfirmPassword){
        $('confirm-password-error').innerHTML = '';
        isValid = false;
    }else{
        $('confirm-password-error').innerHTML = ''
    }

    if(isValid){
        $('register-note').innerHTML = 'Congratulations on successful registration, please login';

        listUser.push(
            {
                name: registerName,
                email: registerEmail,
                password: registerPassword,
                token: 0 
            }
        )

        localStorage.setItem('listUser', JSON.stringify(listUser));
            $('register-name').value ='';
            $('register-email').value ='';
            $('register-password').value ='';
            $('register-password-confirm').value ='';
    }
}

$('login-submit').onclick = function(){
    let loginEmail = $('login-email').value;
    let loginPassword = $('login-password').value;

    let isLogin = true;
    
    if(!loginEmail){
        $('login-email-error').innerHTML = 'Please enter email';
        isValid = false;

    }else if(!validEmail(loginEmail)){
        $('login-email-error').innerHTML = 'Please enter correct email format';
        isLogin= false;
    }else{
        $('login-email-error').innerHTML = '';
    }
    
    if(!loginPassword){
        $('login-password-error').innerHTML = 'Please enter password';
        isLogin = false;
    }else{
        $('login-password-error').innerHTML = '';
    }

    if(isLogin){
        let listUser = JSON.parse(localStorage.getItem('listUser'));
        
        listUser.map((item) => {
            if(loginEmail === item.email && loginPassword == item.password){
                item.token = 1;
                localStorage.setItem('listUser', JSON.stringify(listUser));
                $('login-note').innerHTML = 'Congratulations, you have successfully logged in';
                formWrap.classList.remove('transform');
                loginOverlay.style.display = `none`;
                checkLogin();
            }else{
                $('login-note').innerHTML = 'Email or password is wrong';
            }
        });
    }
}

const checkLogin = function(){
    let listUser = JSON.parse(localStorage.getItem('listUser'));
    let logging = false;
    listUser.map((item) => {
        if(item.token === 1){
            login.style.display = 'none';
            document.querySelector('.user').style.display = 'block';
            document.querySelector('.user-icon-name').innerHTML = item.name;
            document.querySelector('.user-infor-name').innerHTML = 'Hi ' + item.name;
            checkLogout();
            logging = true;;
        }
    });
    return logging;
}

const checkLogout = function(){
    let listUser = JSON.parse(localStorage.getItem('listUser'));
    const userLogout = document.querySelector('.user-logout');

    userLogout.onclick = () => {
        listUser.map((item) => {
            if(item.token === 1){
                item.token = 0;
                localStorage.setItem('listUser', JSON.stringify(listUser));
                login.style.display = 'block';
                document.querySelector('.user').style.display = 'none';
            }
        });
    }
}

