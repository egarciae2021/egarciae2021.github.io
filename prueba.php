<?php
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        /*Creating variables*/
        $name = $_POST["name"];
        $address = $_POST["address"];
        $age = $_POST["age"];


        $dbhost = "localhost"; /*most of the time it's localhost*/
        $username = "yourusername";
        $password = "yourpassword";
        $dbname = "mydatabase";

        $mysql = mysqli_connect($dbhost, $username, $password, $dbname); //It connects
        $query = "INSERT INTO yourtable (name,address,age) VALUES $name, $address, $age";
        mysqli_query($mysql, $query);
    }
?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Account</title>

</head>
<body>

    <form method="post">
        <input name="name" type="text"/>
        <input name="address" type="text"/>
        <input name="age" type="text"/>
        <button>go</button>
    </form>
</body>
</html>