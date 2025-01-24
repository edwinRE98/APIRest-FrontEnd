const tableUsers = document.getElementById("tableUsers");
const nameUser = document.getElementById("nameUser");
const lastNameUser = document.getElementById("lastNameUser");
const idDocumentUser = document.getElementById("idDocumentUser");
const addressUser = document.getElementById("addressUser");
const phoneNumberUser = document.getElementById("phoneNumberUser");
const emailUser = document.getElementById("emailUser");
const btnSaveUser = document.getElementById("btnSaveUser");
let saveUserModal = document.getElementById("titleModal");
let updateUserModal = document.getElementById("titleModal");

function updateUser(id){
  updateUser.innerText = "dgergegfg";
  //console.log(id);
  let user = usersList.filter(user => user.idDocument === id);
  console.log(user[0]);
}

/*** API consume ***/

//show all users
showAllUsers();

let usersList = []

async function showAllUsers(){
  tableUsers.innerHTML =''
  await fetch('http://localhost:8080/api/users/findAll')
  .then(response => response.json())
  .then(users => {
    console.log(users)
    usersList = users;
    for(let user of users){
      tableUsers.innerHTML +=
      '<tr>'+
        '<td>'+user.id+'</td>'+
        '<td>'+user.name+'</td>'+
        '<td>'+user.lastName+'</td>'+
        '<td>'+user.idDocument+'</td>'+
        '<td>'+user.address+'</td>'+
        '<td>'+user.phoneNumber+'</td>'+
        '<td>'+user.email+'</td>'+
        '<td>'+
          '<button class="btn btn-warning" id="editUserModal" onclick="updateUser('+user.id+')">Editar</button>'+
          '<button class="btn btn-danger">Borrar</button>'+
        '</td>'+
      '</tr>'
    }
  });
}

//Save user
btnSaveUser.addEventListener('click',()=>{
  saveUser()
})

async function saveUser(){
  let userQ = {
    name:nameUser.value,
    lastName:lastNameUser.value,
    idDocumen:idDocumentUser.value,
    address:addressUser.value,
    phoneNumber:phoneNumberUser.value,
    email:emailUser.value
  }
  console.log(userQ)
  
  fetch('http://localhost:8080/api/users/save',{
    method: 'POST',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(userQ)
  })
  .then((user)=>{
    console.log(user)
    alert("Usuario registrado")
    showAllUsers();
  })
  .catch((e)=>{
    console.log(e)
    alert(e);
    showAllUsers();
  })
}

/** Modal***/
const newUserModal = document.querySelector("#newUserModal");
const editUserModal = document.querySelector("#editUserModal");
const closeModal = document.querySelector("#btnCloseModal");
const modal = document.querySelector("#modal");

newUserModal.addEventListener("click",()=>{
  saveUserModal.innerText = "Nuevo usuario"
  modal.showModal();
});

editUserModal.addEventListener("click",()=>{
  updateUserModal.innerText = "Nuevo usuario"
  modal.showModal();
});

closeModal.addEventListener("click",()=>{
  modal.close();
});