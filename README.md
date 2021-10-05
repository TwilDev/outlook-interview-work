# Simple ToDo Interview task for Outlook 

<h2>Tech Stack:</h2>

<ul>
<li>Vue.js</li>
<li>PHP</li>
<li>MySQL</li>
<li>SCSS</li>
</ul>

The current application is a simple CRUD application, supporting the creation and deletion of tasks. 
While there is currently no implementation for user logins and individual task lists, primarily due to time limitations, backend architecture can support this in the future.

<h3>ERD for User design</h3>

![ERD Diagram](https://github.com/TwilDev/outlook-interview-work/blob/master/assets/images/outlook-db-erd.jpg?raw=true)

Initial design accomodated for this as displayed in the above ERD. <br>Similar methods to those found in NuoTask (link: https://github.com/TwilDev/NuoTask) would be used to store
hashed passwords utilising built in PHP functions, with current systems allowing tasks to be added to the page but not to the database unless the user is logged in. 

An example of this hashing code can be seen in the example below:

![PHP password hashing code](https://github.com/TwilDev/outlook-interview-work/blob/master/assets/images/example_pass.jpg?raw=true)

The backend was hosted individually utilising XAMPP, the database file can be found in the root directory called outlook-task.sql 

To quickly host the application this file can be imported via XAMPP or alternative web server supporting PHP and MySQL. If the database is not being hosted on the local machine
or your default username/password has been manually configured; the connection information can be altered in the following PHP file (./includes/db.php) shown below:

![dbconn code](https://github.com/TwilDev/outlook-interview-work/blob/master/assets/images/dbconn.jpg?raw=true)
