function saveToLocalStorage(event) {
  event.preventDefault();
  const unique = Math.floor(1000*Math.random());
  const amount = event.target.expense_amount.value;
  const description = event.target.expense_description.value;
  const category = event.target.expense_category.value;

  let expense_Details = {
    amount,
    description,
    category,
    unique
  };
  localStorage.setItem(
    expense_Details.unique,
    JSON.stringify(expense_Details)
  );
  showExpenseOnScreen(expense_Details);
}

window.addEventListener("DOMContentLoaded", () => {
  const L_S_Obj = localStorage;
  const L_S_Keys = Object.keys(L_S_Obj);
  for (var i = 0; i < L_S_Keys.length; i++) {
    const key = L_S_Keys[i];
    const ExpDetailsString = L_S_Obj[key];
    const Exp_Details_obj = JSON.parse(ExpDetailsString);
    showExpenseOnScreen(Exp_Details_obj);
  }
});

function showExpenseOnScreen(user) {
  const parentNode = document.getElementById("users");
  const childHTML = `<li id='${user.unique}' style="background-color:lightcyan; font-size:20px; font-family:sans-serif">₹${user.amount} - ${user.description} - ${user.category} 
  <button onclick=editUser('${user.amount}','${user.description}','${user.category}','${user.unique}') style="background-color:lightgreen; border-radius:5px;">Edit Expense</button> 
<button onclick=deleteUser('${user.unique}') style="background-color:lightsalmon; border-radius:5px;">Delete Expense</button></li>`;
  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function deleteUser(unique) {
  localStorage.removeItem(unique);
  removeUserFromScreen(unique);
}

function removeUserFromScreen(unique) {
  const parentNode = document.getElementById("users");
  const childNodeToBeDeleted = document.getElementById(unique);
  if (childNodeToBeDeleted) {
    parentNode.removeChild(childNodeToBeDeleted);
  }
}

function editUser(amount, description, category,unique) {
  document.getElementById("amount").value = amount;
  document.getElementById("description").value = description;
  document.getElementById("items").value = category;
  deleteUser(unique);
}
