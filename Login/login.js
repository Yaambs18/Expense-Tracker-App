async function login(e) {
    e.preventDefault();
    let loginDetails = {
        email: e.target.email.value,
        password: e.target.password.value
    };
    try{
        const res = await axios.post('http://localhost:3000/user/login', loginDetails);
        console.log(res);
        if(res.status === 200){
            alert(res.data.message);
            console.log(res);
            window.localStorage.setItem('token', res.data.token);
            window.location.href = '../index.html';
        }
        else{
            console.log(res);
            throw new Error(res);
        }
    }
    catch(error) {
        document.body.innerHTML += `<h1>Error: ${error.message}</h1>`;
        console.log(error);
    }
}