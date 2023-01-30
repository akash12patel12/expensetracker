const config = {
  headers : {
    'Authorization' : localStorage.getItem('token')
  }
}



function submitExpense(e) {
  e.preventDefault();
  const newExpense = {
    desc: e.target.desc.value,
    amount: e.target.amount.value,
    cat: e.target.cat.value,
  };

  axios.post("http://localhost:3000/addex",newExpense , config).then((res) => {
    listExpenses();
  });
}








listExpenses();

async function listExpenses() {
  document.getElementById("expenselist").innerHTML = `  <tr>
   
    <th>Description</th>
    <th>Category</th>
    <th>Amount</th>
    <th>Delete</th>
    <th>Edit</th>
</tr>`;
  axios.get("http://localhost:3000/getAll", config).then((all) => {
    // all.data is the array of all expenses
    console.log(all.data);
    all.data.forEach((expense) => {
      document.getElementById("expenselist").innerHTML =
        document.getElementById("expenselist").innerHTML +
        `<tr id="${expense.id}">
        
        <td>${expense.desc}</td>  
        <td>${expense.cat}</td>
        <td>${expense.amount}</td>
        <td><button class="btn btn-danger " onclick="deleteExpense(${expense.id})">Delete</button></td>
        <td><button class="btn btn-warning " onclick="editExpense(${expense.id})">Edit</button></td>
    </tr> `;
    });
  });
}


//delete

function deleteExpense(id){
  axios.post('http://localhost:3000/delete', {id : id}, config).then(response=>{
    console.log(response);
    listExpenses();
  })
}





