<?php 

//task class manages all operations for tasks within the application
class task {

	//declaring DB
	protected $db =  null;	
	
	//Class constructor - getting access to the DB
	public function __construct($db) {
		$this->db = $db;
	}

    //method to retrieve all tasks from DB upon application load
    public function getTasks() {

        //Define query and prepare using db
        $query = "SELECT * FROM task";
        $pdo = $this->db->prepare($query);
        //execute and fetch associated values to result 
        $pdo->execute();
        $result = $pdo->fetchAll(PDO::FETCH_ASSOC);
        //return result in JSON format
        echo json_encode($result);  

    }

    //method to add new task to the database
    public function addNewTask($task) {

        //Define query and prepare using db
        $query = "INSERT into task (task_name) VALUES (:task_name)";
        //prepare query and bind values to avoid injections
        $pdo = $this->db->prepare($query);
        $pdo->bindParam(':task_name', $task);
        //execute query and return last ID
        $pdo->execute();
        return($this->db->lastInsertId());
    }

    public function deleteTask($task_id) {

    }

}

?>