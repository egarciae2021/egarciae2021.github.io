<?php 
     $serverName = "localhost";
     $connectionInfo = array( "Database"=>"web", "UID"=>"sa", "PWD"=>"Atento2019*");
     $conn = sqlsrv_connect( $serverName, $connectionInfo );
     $sql = "select top 5 substring(razon_sociaL,1,23) AS INICIAL ,pedido_minimo from empresas"; 
     $stmt = sqlsrv_query( $conn, $sql); 
    
    $array1=[];
    $array3=[];
    while( $obj = sqlsrv_fetch_object( $stmt)) {
    $array1=['razon_social' => $obj->INICIAL,'pedido_minimo' => $obj->pedido_minimo];
    array_push($array3,$array1);
    $array1=[];
    }
    echo json_encode(array("data"=>array_values($array3)));

?>