const myForm = document.querySelector('#expenses-form');
const expenseDesc = document.querySelector('#name');
const expenseAmount = document.querySelector('#amount');
const category = document.querySelector('#category');
const expenseList = document.querySelector('#expenseList');
const msg = document.querySelector('.msg');

myForm.addEventListener('submit', onSubmit);

// retrieving stored expenses when DOM loads
window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/expense', { headers: {'Authorization': token }})
    .then((response) => {
        for(expenseObj of response.data){
            showUserOnScreen(expenseObj);
        }
    })
    .catch(err => {
        myForm.innerHTML = '<h1>Error: Something went wrong!!!!</h1>';
        console.log(err);
    })
})

function onSubmit(e){
    e.preventDefault();
    if(expenseDesc.value === '' || expenseAmount.value === ''){
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';

        setTimeout(() => msg.remove(), 3000);
    }
    else{
        let expenseObj = {
            description : expenseDesc.value,
            amount : expenseAmount.value,
            category: category.value,
        }
        const token = localStorage.getItem('token');
        if(document.querySelector('#submitBtn').value === 'Update'){
            const expenseId = document.querySelector('#expenseId').value;
            axios
              .put('http://localhost:3000/expense/'+expenseId, expenseObj, { headers: {'Authorization': token }})
              .then((response) => {
                showUserOnScreen(response.data);
              })
              .catch((err) => {
                document.body.innerHTML += "Error: Something went wrong!!!!";
                console.log(err);
              });

        }
        else{
            axios.post('http://localhost:3000/expense/addExpense', expenseObj, { headers: {'Authorization': token }})
            .then((response) => {
                showUserOnScreen(response.data);
            })
            .catch(err => {
                document.body.innerHTML += 'Error: Something went wrong!!!!';
                console.log(err)
            });
        }
        expenseDesc.value = '';
        expenseAmount.value = '';
        category.value = '';
    }
}

function showUserOnScreen(obj){
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${obj.description} : ${obj.amount} : ${obj.category}`));

    // create delete btn element
    var delBtn = document.createElement('button');
    delBtn.className = 'delete';
    var delText = document.createTextNode('Delete');
    delBtn.appendChild(delText);

    // create edit btn element
    var edtBtn = document.createElement('button');
    edtBtn.className = 'edit';
    var edtText = document.createTextNode('Edit');
    edtBtn.appendChild(edtText);
    
    // delete event
    delBtn.onclick = () =>{
        if(confirm('Are you sure ?')){
            axios
              .delete("http://localhost:3000/expense/" + obj.id, { headers: {'Authorization': token }})
              .then((response) => expenseList.removeChild(li))
              .catch((err) => console.log(err));
        }
    }

    // edit event
    edtBtn.onclick = () =>{
        expenseList.removeChild(li);
        expenseDesc.value = obj.description;
        expenseAmount.value = obj.amount;
        category.value = obj.category;
        const idElem = document.createElement('input');
        idElem.type = 'hidden';
        idElem.id = 'expenseId';
        idElem.value = obj.id;
        myForm.children[6].children[0].value = 'Update';
        myForm.appendChild(idElem);

    }
    
    li.appendChild(delBtn);
    li.appendChild(edtBtn);
    expenseList.appendChild(li);
}