// const url = "https://minticloud.uis.edu.co/c3s32formador/"
const url = "http://localhost:8080/"

function  sendRequest(endPoint, method, data){
    let request = new XMLHttpRequest();
    request.open(method, url+endPoint);
    request.responseType = 'json';
    request.setRequestHeader('Content-Type','application/json');
    request.send(data ? JSON.stringify(data): data);
    return request
}