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
const loginClose = document.querySelector('.login-close')

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


// Validate register
const $ = function(id) {
    return document.getElementById(id);
}

$('register-submit').onclick = function() {
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

    const validEmail = function(email){
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }

    if(!registerEmail){
        $('register-email-error').innerHTML = 'Please enter email';
        isValid = false;
    }else if(!validEmail(registerEmail)){
        $('register-email-error').innerHTML = 'Please enter correct email format';
        isValid = false;
    }else{
        $('register-email-error').innerHTML = '';
    }

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

        let listUser= localStorage.getItem('listUser') ? JSON.parse(localStorage.getItem('listUser')) : [];

        listUser.push(
            {
                name: registerName,
                email: registerEmail,
                password: registerPassword
            }
        )

        localStorage.setItem('listUser', JSON.stringify(listUser));
            $('register-name').value =''
            $('register-email').value =''
            $('register-password').value =''
            $('register-password-confirm').value =''


    }
}

