function loadData(){
    let request = sendRequest('plaza/list', 'GET', '')
    let table = document.getElementById('plazas-table');
    table.innerHTML = "";
    request.onload = function(){
        
        let data = request.response;
        console.log(data);
        data.forEach((element, index) => {
            table.innerHTML += `
                <tr>
                    <th>${element.id_plaza}</th>
                    <td>${element.codigo_plaza}</td>
                    <td>${element.estado}</td>
                    <td>
                        <button type="button" class="btn btn-success text-white" onclick='window.location = "/form_plazas.html?id=${element.id_plaza}"'>Editar</button>
                        <button type="button" class="btn btn-danger text-white" onclick='deletePlaza(${element.id_plaza})'>Eliminar</button>
                    </td>
                </tr>
                `
        });
    }
    request.onerror = function(){
        table.innerHTML = `
            <tr>
                <td colspan="4">Error al recuperar los datos.</td>
            </tr>
        `;
    }
}

function loadPlazas(id_plaza){
    let request = sendRequest('plaza/list/'+id_plaza, 'GET', '')
    let id = document.getElementById('id_plaza')
    let codigo = document.getElementById('codigo_plaza')
    let estado = document.getElementById('estado')
    request.onload = function(){
        
        let data = request.response
        id.value = data.id_plaza
        codigo.value = data.codigo_plaza
        estado.value = data.estado
    }
    request.onerror = function(){
        alert("Error al recuperar los datos.");
    }
}

function deletePlaza(id_plaza){
    let request = sendRequest('plaza/'+id_plaza, 'DELETE', '')
    request.onload = function(){
        loadData()
    }
}

function savePlaza(){
    let id = document.getElementById('id_plaza').value
    let codigo = document.getElementById('codigo_plaza').value
    let estado = document.getElementById('estado').value
    let data = {'id_plaza': id,'codigo_plaza': codigo,'estado': estado}
    let request = sendRequest('plaza/', id ? 'PUT' : 'POST', data)
    request.onload = function(){
        window.location = 'plazas.html';
    }
    request.onerror = function(){
        alert('Error al guardar los cambios.')
    }
}