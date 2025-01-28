//Variables Globales
const tablaProductosHTML = document.getElementById('tablaProductos')
const nameUser =  document.getElementById('nameUser')
const lastName =  document.getElementById('lastName')
const idDocument =  document.getElementById('idDocument')
const address =  document.getElementById('address')
const phoneNumber =  document.getElementById('phoneNumber')
const emailUser = document.getElementById("emailUser");
const btnGuardar =  document.getElementById('btnGuardar')
let modalTitle = document.getElementById('modalTitle')
let idProductoModificar = 0



//Acciones Guardar Producto
btnGuardar.addEventListener('click',()=>{
  if(modalTitle.innerText === "Modificar producto"){
    crearProducto(idProductoModificar)
      
  }
  else if(modalTitle.innerText === "Crear producto"){
      crearProducto(0)
  }
})


//Eliminar Producto
async function eliminarProducto(id) {
  await fetch("http://localhost:8080/api/users/delete/" + id, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log(res);
      alert("Producto eliminado");
      obtenerProductos();
    })
    .catch((err) => {
      console.log(err);
      alert("Lo sentimos no pudimos eliminar el producto");
    });
}



//Update user
function modificarProducto(id) {
  modalTitle.innerText = "Modificar producto";
  modal.style.display = "block";
  idProductoModificar = id;
  resetModal();
  let producto = listaProductos.filter(producto => producto.id === id)
  console.log(producto[0]);
  nameUser.value = producto[0].name
  lastName.value = producto[0].lastName
  idDocument.value = producto[0].idDocument
  address.value = producto[0].address
  phoneNumber.value = producto[0].phoneNumber
  emailUser.value = producto[0].email
}


async function crearProducto(id) {
  let productoGuardar = {
    id:id,
    name: nameUser.value,
    lastName: lastName.value,
    idDocument: idDocument.value,
    address: address.value,
    phoneNumber: phoneNumber.value,
    email:emailUser.value
  };
  console.log(productoGuardar);

  await fetch("http://localhost:8080/api/users/save", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productoGuardar),
  })
    .then((producto) => {
      console.log(producto);
      alert("Usuario registrado");
      modal.style.display = "none";
      obtenerProductos();
      resetModal();
    })
    .catch((e) => {
      console.log(e);
      alert("Error: " + e);
    });
}



//show all users
obtenerProductos()
let listaProductos = []
async function obtenerProductos(){
    tablaProductosHTML.innerHTML = ''
    await fetch('http://localhost:8080/api/users/findAll')
        .then(response =>  response.json())
        .then(productos => {
            console.log(productos)
            listaProductos = productos
            for(let producto of productos){

                tablaProductosHTML.innerHTML +=
                '<tr>'+
                '    <th scope="row">'+producto.id+'</th>'+
                '    <td>'+producto.name+'</td>'+
                '    <td>'+producto.lastName+'</td>'+
                '    <td>'+producto.idDocument+'</td>'+
                '    <td>'+producto.address+'</td>'+
                '    <td>'+producto.phoneNumber+'</td>'+
                '    <td>'+producto.email+'</td>'+
                '    <td>'+
                '        <input type="button" class="btn btn-outline-danger" value="Eliminar" onclick=eliminarProducto('+producto.id+')>'+
                '        <input type="button" class="btn btn-primary" value="Modificar" onclick=modificarProducto('+producto.id+')>'+
                '    </td>'+
                '</tr>'
            }
        })
        .catch((e)=>{
            console.log(e);
            alert("Error: " + e)
        })
}










//Reset Modal
function resetModal() {
  nameUser.value = ""
  lastName.value = ""
  idDocument.value = ""
  address.value = ""
  phoneNumber.value = ""
  emailUser.value = ""
}

//Modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modalTitle.innerText = "Nuevo usuario";
  modal.style.display = "block";
};
span.onclick = function () {
  modal.style.display = "none";
  resetModal();
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    resetModal();
  }
};














const id = 0;

async function prueba(id) {
  //let productoGuardar
  let productoModif = {
    id:id,
    name: nameUser.value,
    lastName: lastName.value,
    idDocument: idDocument.value,
    address: address.value,
    phoneNumber: phoneNumber.value,
    email:emailUser.value
  };
  console.log(productoGuardar);

  await fetch("http://localhost:8080/api/users/update/"+ id, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productoModif),
  })
    .then((producto) => {
      console.log(producto);
      alert("Usuario registrado");
      modal.style.display = "none";
      obtenerProductos();
      resetModal();
    })
    .catch((e) => {
      console.log(e);
      alert("Error: " + e);
    });
}