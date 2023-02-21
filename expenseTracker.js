const myForm = document.querySelector('#expenses-form');
const expenseDesc = document.querySelector('#name');
const expenseAmount = document.querySelector('#amount');
const category = document.querySelector('#category');
const expenseList = document.querySelector('#expenseList');
const msg = document.querySelector('.msg');

myForm.addEventListener('submit', onSubmit);

function onSubmit(e){
    e.preventDefault();
    var count = 0;
    if(expenseDesc.value === '' || expenseAmount.value === ''){
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';

        setTimeout(() => msg.remove(), 3000);
    }
    else{
        count++;
        console.log(expenseDesc.value);
        console.log(expenseAmount.value);
        console.log(category.value);

        let expenseObj = {
            expenseDesc : expenseDesc.value,
            amout : expenseAmount.value,
            category: category.value,
        }
        let expenseObj_serialized = JSON.stringify(expenseObj);
        localStorage.setItem(count, expenseObj_serialized);
        showUserOnScreen(expenseObj);

        expenseDesc.value = '';
        expenseAmount.value = '';
    }
}

function showUserOnScreen(obj){
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${expenseDesc.value} : ${expenseAmount.value} : ${category.value}`));

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
            userList.removeChild(li);
            localStorage.removeItem(obj.email);
        }
    }

    // edit event
    edtBtn.onclick = () =>{
        userList.removeChild(li);
        localStorage.removeItem(obj.email);
        nameInput.value = obj.name;
        emailInput.value = obj.email;
    }
    
    li.appendChild(delBtn);
    li.appendChild(edtBtn);
    expenseList.appendChild(li);
}