<?php
 

    $user=$_POST["Usuario"];
    $clave=$_POST["Contraseña"];
    $serverName = "localhost";
     $connectionInfo = array( "Database"=>"web", "UID"=>"sa", "PWD"=>"Atento2019*");
     $conn = sqlsrv_connect( $serverName, $connectionInfo );
     $sql = "select * from accesos_generales  where contra='".$clave."' and correo = '".$user."'"; 
     $stmt = sqlsrv_query( $conn, $sql); 
     if((strlen($user)<3)||(strlen($clave)<3)){
        echo json_encode("Usario o Clave incorrectos");
    }
    else{
    $array1=[];
    $array3=[];
    while( $obj = sqlsrv_fetch_object( $stmt)) {
    $array1=['Name' => $obj->Name,'Genero' => $obj->Gender];
    array_push($array3,$array1);
    $array1=[];
    }
    echo json_encode(array("data"=>array_values($array3)));
}
?>