<?php

//db connection details
$host = '127.0.0.1'; //can also use localhost this is loopback address that I use as a personal  preference
$dbname = "outlook-task";
$user = "root";
$pass = ""; //root admin password is blank in Xampp


//connect to database and catch error
try {
    $db = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
}

catch(PDOException $e) {
    echo $e->getMessage();
}

?>