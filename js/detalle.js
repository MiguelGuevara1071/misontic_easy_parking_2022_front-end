function loadData(){
    let request = sendRequest('detalle/list', 'GET', '')
    let table = document.getElementById('detalle-facturas-table');
    table.innerHTML = "";
    request.onload = function(){
        
        let data = request.response;
        console.log(data);
        data.forEach((element, index) => {
            table.innerHTML += `
                <tr>
                    <th>${element.id_detalle}</th>
                    <td>${element.plaza.codigo_plaza}</td>
                    <td>${element.factura.id_factura}</td>
                    <td>${element.factura.fecha_ingreso}</td>
                    <td>${element.factura.hora_entrada}</td>
                    <td>${element.factura.hora_salida}</td>
                    <td>${element.factura.tipo_vehiculo}</td>
                    <td>${element.factura.placa_vehiculo}</td>
                    <td>${element.valor_pago}</td>
                    <td>
                        <button type="button" class="btn btn-success text-white" onclick='window.location = "/form_detalles.html?id=${element.id_detalle}"'>Editar</button>
                        <button type="button" class="btn btn-danger text-white" onclick='deleteDetalle(${element.id_detalle})'>Eliminar</button>
                        <button type="button" class="btn btn-primary text-white" onclick='window.location = "/form_generarTiquet.html?id=${element.id_detalle}"'>Tiquet</button>
                    </td>
                </tr>
                `
        });
    }
    request.onerror = function(){
        table.innerHTML = `
            <tr>
                <td colspan="10">Error al recuperar los datos.</td>
            </tr>
        `;
    }
}

function loadDetalles(id_detalle){
    let request = sendRequest('detalle/list/'+id_detalle, 'GET', '')
    let id = document.getElementById('id_detalle')
    let idPlaza = document.getElementById('id_plaza')
    let idFactura = document.getElementById('id_factura')
    let valorPago = document.getElementById('valor_pago')
    request.onload = function(){
        
        let data = request.response
        id.value = data.id_detalle
        idPlaza.value = data.plaza.id_plaza
        idFactura.value = data.factura.id_factura
        valorPago.value = data.valor_pago
    }
    request.onerror = function(){
        alert("Error al recuperar los datos.");
    }
}

function deleteDetalle(id_detalle){
    let request = sendRequest('detalle/'+id_detalle, 'DELETE', '')
    request.onload = function(){
        loadData()
    }
}

function saveDetalle(){
    let id = document.getElementById('id_detalle').value
    let idPlaza = document.getElementById('id_plaza').value
    let idFactura = document.getElementById('id_factura').value
    let valorPago = document.getElementById('valor_pago').value
    let data = {'id_detalle': id,
                'plaza':{'id_plaza': idPlaza},
                'factura':{'id_factura': idFactura},
                'valor_pago' : valorPago}
    let request = sendRequest('detalle/', id ? 'PUT' : 'POST', data)
    request.onload = function(){
        window.location = 'detalles.html';
    }
    request.onerror = function(){
        alert('Error al guardar los cambios.')
    }
}

function loadDetallesTiquet(id_detalle){
    let request = sendRequest('detalle/list/'+id_detalle, 'GET', '')
    let id = document.getElementById('id_detalle')
    let codigoPlaza = document.getElementById('codigo_plaza')
    let idFactura = document.getElementById('id_factura')
    let fecha = document.getElementById('fecha_ingreso')
    let horaEntrada = document.getElementById('hora_entrada')
    let horaSalida = document.getElementById('hora_salida')
    let tipoVehiculo = document.getElementById('tipo_vehiculo')
    let placa_vehiculo = document.getElementById('placa_vehiculo')
    let valorPago = document.getElementById('valor_pago')
    request.onload = function(){
        
        let data = request.response
        id.value = data.id_detalle
        codigoPlaza.value = data.plaza.codigo_plaza
        idFactura.value = data.factura.id_factura
        fecha.value = data.factura.fecha_ingreso
        horaEntrada.value = data.factura.hora_entrada
        horaSalida.value = data.factura.hora_salida
        tipoVehiculo.value = data.factura.tipo_vehiculo
        placa_vehiculo.value = data.factura.placa_vehiculo
        valorPago.value = data.valor_pago
    }
    request.onerror = function(){
        alert("Error al recuperar los datos.");
    }
}