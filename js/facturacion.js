function loadData(){
    let request = sendRequest('factura/list', 'GET', '')
    let table = document.getElementById('facturas-table');
    table.innerHTML = "";
    request.onload = function(){
        
        let data = request.response;
        console.log(data);
        data.forEach((element, index) => {
            table.innerHTML += `
                <tr>
                    <th>${element.id_factura}</th>
                    <td>${element.fecha_ingreso}</td>
                    <td>${element.hora_entrada}</td>
                    <td>${element.hora_salida}</td>
                    <td>${element.tipo_vehiculo}</td>
                    <td>${element.placa_vehiculo}</td>
                    <td>
                        <button type="button" class="btn btn-success text-white" onclick='window.location = "/form_facturas.html?id=${element.id_factura}"'>Editar</button>
                        <button type="button" class="btn btn-danger text-white" onclick='deleteFactura(${element.id_factura})'>Eliminar</button>
                    </td>
                </tr>
                `
        });
    }
    request.onerror = function(){
        table.innerHTML = `
            <tr>
                <td colspan="7">Error al recuperar los datos.</td>
            </tr>
        `;
    }
}

function loadFacturas(id_factura){
    let request = sendRequest('factura/list/'+id_factura, 'GET', '')
    let id = document.getElementById('id_factura')
    let fecha = document.getElementById('fecha_ingreso')
    let horaIngreso = document.getElementById('hora_entrada')
    let horaSalida = document.getElementById('hora_salida')
    let tipoVehiculo = document.getElementById('tipo_vehiculo')
    let placaVehiculo = document.getElementById('placa_vehiculo')

    request.onload = function(){
        
        let data = request.response
        id.value = data.id_factura
        fecha.value = data.fecha_ingreso
        horaIngreso.value = data.hora_entrada
        horaSalida.value = data.hora_salida
        tipoVehiculo.value = data.tipo_vehiculo
        placaVehiculo.value = data.placa_vehiculo
    }
    request.onerror = function(){
        alert("Error al recuperar los datos.");
    }
}

function deleteFactura(id_factura){
    let request = sendRequest('factura/'+id_factura, 'DELETE', '')
    request.onload = function(){
        loadData()
    }
}

function saveFactura(){
    let id = document.getElementById('id_factura').value
    let fecha = document.getElementById('fecha_ingreso').value
    let horaIngreso = document.getElementById('hora_entrada').value
    let horaSalida = document.getElementById('hora_salida').value
    let tipoVehiculo = document.getElementById('tipo_vehiculo').value
    let placaVehiculo = document.getElementById('placa_vehiculo').value
    let data = {'id_factura': id,'fecha_ingreso': fecha,'hora_entrada': horaIngreso, 'hora_salida' : horaSalida,
                'tipo_vehiculo' : tipoVehiculo, 'placa_vehiculo' : placaVehiculo}
    let request = sendRequest('factura/', id ? 'PUT' : 'POST', data)
    request.onload = function(){
        window.location = 'facturacion.html';
    }
    request.onerror = function(){
        alert('Error al guardar los cambios.')
    }
}