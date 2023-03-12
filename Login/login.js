async function login(e) {
    e.preventDefault();
    let loginDetails = {
        email: e.target.email.value,
        password: e.target.password.value
    };
    try{
        const res = await axios.post('http://localhost:3000/user/login', loginDetails);
        if(res.status === 200){
            console.log(res);
            window.location.href = '../index.html';
        }
        else{
            throw new Error(res);
        }
    }
    catch(error) {
        document.body.innerHTML += `<h1>Error: ${res.message}</h1>`;
        console.log(err);
    }
}