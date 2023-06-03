function loadRegistroVehiculos(){
    let request = sendRequest('factura/list', 'GET', '')
    let divDia = document.getElementById('ingreso-vehiculos-dia');
    let divSemana = document.getElementById('ingreso-vehiculos-semana');
    let divMes = document.getElementById('ingreso-vehiculos-mes');
    divDia.innerHTML = "";
    request.onload = function(){
        
        let data = request.response;
        console.log(data);
        let contador = 0
        data.forEach((element, index) => {
            contador += 1
            console.log(contador)
        });
        divDia.innerHTML += `
            <h5 class="card-title">Total flujo de vehiculos dia</h5>
            <hr>
            <p class="card-text">El total de ingreso de vehiculos durante el dia fue de:</p>
            <a href="#" class="btn btn-primary">${contador}</a>
        `;
        divSemana.innerHTML = `
            <h5 class="card-title">Total flujo de vehiculos semana</h5>
            <hr>
            <p class="card-text">El total de ingreso de vehiculos durante la semana fue de:</p>
            <a href="#" class="btn btn-dark text-white">${contador}</a>
        `;
        divMes.innerHTML = `
            <h5 class="card-title">Total flujo de vehiculos mes</h5>
            <hr>
            <p class="card-text">El total de ingreso de vehiculos durante el mes fue de:</p>
            <a href="#" class="btn btn-success">${contador}</a>
        `;
    }
    request.onerror = function(){
        div.innerHTML = `
            <p class="card-text">Error al calcular ingresos</p>
        `;
    }
}

function loadRegistroIngresos(){
    let request = sendRequest('detalle/list', 'GET', '')
    let divDia = document.getElementById('ingreso-efectivo-dia');
    let divSemana = document.getElementById('ingreso-efectivo-semana');
    let divMes = document.getElementById('ingreso-efectivo-mes');
    divDia.innerHTML = "";
    request.onload = function(){
        
        let data = request.response;
        console.log(data);
        let ingresosTotales = 0
        data.forEach((element, index) => {
            ingresosTotales += element.valor_pago
            console.log(ingresosTotales)
        });
        divDia.innerHTML += `
            <h5 class="card-title">Total de ingresos dia</h5>
            <hr>
            <p class="card-text">El total de ingresos obtenidos durante el dia por el parqueadero fueron de:</p>
            <a href="#" class="btn btn-primary">$ ${ingresosTotales}</a>
        `;
        divSemana.innerHTML = `
            <h5 class="card-title">Total de ingresos semana</h5>
            <hr>
            <p class="card-text">El total de ingresos obtenidos durante la semana por el parqueadero fueron de:</p>
            <a href="#" class="btn btn-dark text-white">$ ${ingresosTotales}</a>
        `;
        divMes.innerHTML = `
            <h5 class="card-title">Total de ingresos mes</h5>
            <hr>
            <p class="card-text">El total de ingresos obtenidos durante el mes por el parqueadero fueron de:</p>
            <a href="#" class="btn btn-success">$ ${ingresosTotales}</a>
        `;
    }
    request.onerror = function(){
        div.innerHTML = `
            <p class="card-text">Error al calcular ingresos</p>
        `;
    }
}