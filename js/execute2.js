
const storedToDos = localStorage.getItem('orden');
var almacenado = JSON.parse(storedToDos);
const mostrar= document.getElementById("Mostrar_orden")
var sumatoria=0

for(i=0;i<almacenado.length;i++)
{   
    var almacenado_split  
    almacenado_split= (almacenado[i][0]).split(":") 
    total_a_pagar= parseFloat(almacenado_split[1])*parseFloat(almacenado_split[2])
    sumatoria=sumatoria+total_a_pagar
    mostrar.innerHTML=mostrar.innerHTML + ` 
    <tr>
    <td>`+almacenado_split[0]+` </td>
    <td>`+almacenado_split[1]+` </td>
    <td>`+almacenado_split[2]+` </td>
    <td>`+total_a_pagar+` </td>
    </tr>
     ` 
    if(i==(almacenado.length-1)){
        mostrar.innerHTML=mostrar.innerHTML + 
        `<tr>
        <td><strong>Total</strong></td>
        <td></td>
        <td></td>
        <td><strong>`+sumatoria+`</strong></td>
        </tr>`
    }

} 