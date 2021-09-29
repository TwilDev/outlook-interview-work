<?php

//determines operation for task

//prereq
require_once('../includes/db.php');
require_once('../classes/TaskClass.php');


//get received data from axios request
$received_data = json_decode(file_get_contents("php://input"));
$data = array();

if ($received_data->action == "init") {

    $taskObj = new task($db);
    //Call method to get all tasks and return value
    echo $result = $taskObj->getTasks(); 
}


?>