const signUpForm  = document.querySelector('#signup-form');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

signUpForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    let userObj = {
        name: name.value,
        email: email.value,
        password: password.value
    };
    axios.post('http://localhost:3000/user/signup', userObj)
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        document.body.innerHTML += "<h1>Error: Something went wrong!!!!</h1>";
        console.log(err);
    });
}