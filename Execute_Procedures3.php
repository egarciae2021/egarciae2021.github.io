<?php
    $correo=$_POST["correo"];
    
    $serverName = "localhost\DESARROLLO";
     $connectionInfo = array( "Database"=>"master", "UID"=>"sa", "PWD"=>"Atento2019*");
     $conn = sqlsrv_connect( $serverName, $connectionInfo );
     $sql = "exec procedimiento1 "."'".$correo." '"; 
     $stmt = sqlsrv_query( $conn, $sql); 
    
     $sql = "select correo,contra from usuarios where correo="."'".$correo."'";
     $stmt = sqlsrv_query( $conn, $sql); 
     if((strlen($correo)<3)){
        echo json_encode("No has ingresado un correo valido");
     }


    else{
        $array1=[];
        $array3=[];
        while( $obj = sqlsrv_fetch_object( $stmt)) {
        $array1=['Correo' => $obj->correo];
        array_push($array3,$array1);
        $array1=[];
        }
        if(empty($array3)){
            echo json_encode("El correo ingresado no existe");
        }
        else{
            echo json_encode("Se envio el correo con la nueva clave");
        }
    }

?>