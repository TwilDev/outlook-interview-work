<?php

//determines operation for task

//prereq
require_once('../includes/db.php');
require_once('../classes/TaskClass.php');

//get received data from axios request
$operation = json_decode(file_get_contents("php://input"));


if ($operation->action) {

    //if received data contains an action create an instance of task for task operations
    $taskObj = new task($db);

    //determines
    switch ($operation->action) {
        case "init": 
            //$taskObj = new task($db);
            //Call method to get all tasks and return value
            echo $result = $taskObj->getTasks(); 
            break;
        case "add":
            //Call method to add a new task
            echo $result = $taskObj->addNewTask($operation->task_name);
            break;
        case "delete":
            //Call method to delete task
            echo $result = $taskObj->deleteTask($operation->task_id);
            break;
        default: 
            //if not met
            echo $result = "No operable action received";
    }

} else {

    echo "An Error occured";

}





?>