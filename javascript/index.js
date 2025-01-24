const tableUsers = document.getElementById("tableUsers");
const nameUser = document.getElementById("nameUser");
const lastNameUser = document.getElementById("lastNameUser");
const idDocumentUser = document.getElementById("idDocumentUser");
const addressUser = document.getElementById("addressUser");
const phoneNumberUser = document.getElementById("phoneNumberUser");
const emailUser = document.getElementById("emailUser");
const btnSaveUser = document.getElementById("btnSaveUser");


showAllUsers();


/*** API consume ***/

//show all users
showAllUsers();

async function showAllUsers(){
  tableUsers.innerHTML =''
  await fetch('http://localhost:8080/api/users/findAll')
  .then(response => response.json())
  .then(users => {
    console.log(users)

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
          '<button type="button" class="btn btn-warning">Editar</button>'+
          '<button type="button" class="btn btn-danger">Borrar</button>'+
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

/** Modal save user ***/
const OpenModal = document.querySelector("#btnOpenModal");
const closeModal = document.querySelector("#btnCloseModal");
const modal = document.querySelector("#modal");

OpenModal.addEventListener("click",()=>{
  modal.showModal();
});

closeModal.addEventListener("click",()=>{
  modal.close();
});