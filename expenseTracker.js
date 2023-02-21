const myForm = document.querySelector('#expenses-form');
const expenseDesc = document.querySelector('#name');
const expenseAmount = document.querySelector('#amount');
const category = document.querySelector('#category');
const expenseList = document.querySelector('#expenseList');
const msg = document.querySelector('.msg');

myForm.addEventListener('submit', onSubmit);

var count = 0;
// retrieving stored usersDetails from local storage
var totalExpenseCount = localStorage.length;
if(totalExpenseCount!=0){
    count = +Object.keys(localStorage)[0];
    let i = +Object.keys(localStorage)[totalExpenseCount-1];
    while(i<=count){
        let expenseObj_deserialized = JSON.parse(localStorage.getItem(i));
        console.log(expenseObj_deserialized);
        showUserOnScreen(expenseObj_deserialized);
        i++;
    }
}

function onSubmit(e){
    e.preventDefault();
    if(expenseDesc.value === '' || expenseAmount.value === ''){
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';

        setTimeout(() => msg.remove(), 3000);
    }
    else{
        var totalExpenseCount = localStorage.length;
        if(totalExpenseCount==0){
            count=0;
        }else{
            count = +Object.keys(localStorage)[0];
        }
        count++;

        let expenseObj = {
            expenseId: count,
            expenseDesc : expenseDesc.value,
            amount : expenseAmount.value,
            category: category.value,
        }
        let expenseObj_serialized = JSON.stringify(expenseObj);
        localStorage.setItem(count, expenseObj_serialized);
        showUserOnScreen(expenseObj);
    }
}

function showUserOnScreen(obj){
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${obj.expenseDesc} : ${obj.amount} : ${obj.category}`));

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
            expenseList.removeChild(li);
            localStorage.removeItem(obj.expenseId);
        }
    }

    // edit event
    edtBtn.onclick = () =>{
        expenseList.removeChild(li);
        localStorage.removeItem(obj.expenseId);
        expenseDesc.value = obj.expenseDesc;
        expenseAmount.value = obj.amount;
        category.value = obj.category;
    }
    
    li.appendChild(delBtn);
    li.appendChild(edtBtn);
    expenseList.appendChild(li);
}