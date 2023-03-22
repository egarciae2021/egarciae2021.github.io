<?php
    $nombre="'".$_POST["nombre"]."'";
    $correo="'".$_POST["correo_electronico"]."'";
    $clave="'".$_POST["contra"]."'";
    $celular=$_POST["celular"];
    $provincia="'".$_POST["provincia"]."'";
    $distrito="'".$_POST["distrito"]."'";
    $direccion=$_POST["direccion"];
    
    $numero_casa=$_POST["numero_casa"];
    $piso=$_POST["piso"];
    $cadena=$direccion." ".$numero_casa.",piso ".$piso;
    $cadena="'".$cadena."'";
    $bloqueado=0;
    $cadena=$nombre.",".$correo.",".$bloqueado.",".$clave.",".$cadena.",".$distrito.",".$provincia.",".$celular;

    $serverName = "localhost";
     $connectionInfo = array( "Database"=>"web", "UID"=>"sa", "PWD"=>"Atento2019*");
     $conn = sqlsrv_connect( $serverName, $connectionInfo );
 

     if((strlen($nombre)<3)||(strlen($correo)<3)||(strlen($clave)<3||(strlen($celular)<3)||(strlen($provincia)<3))||(strlen($distrito)<3)||(strlen($direccion)<3)){
      echo json_encode("Completa todos los campos");
     }
    else{
        $sql = "insert into usuarios (nombre,correo,bloqueado,contra,direccion,distrito,provincia,celular) values (".$cadena.")"; 
        $stmt = sqlsrv_query( $conn, $sql);
        echo json_encode("Registrado Correctamente ,¡Bienvenido!");
}
?>