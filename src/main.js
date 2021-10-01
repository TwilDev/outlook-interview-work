

//on DOM load create new vue instance
window.onload = function() {

    var application = new Vue({
      //mounted element
        el: '#app',
        data: {
            task: {},
            allData: [{}]
        },
        methods: {
          //gets items via axiom call and populates page
          fetchAllItems: function() {
            //using axios to send async call to php file - previously used ajax so I'm slightly new to this and there may be a better way at approaching this
            axios.post('/outlook-work/ajax/operation.php', {
              action:'init'
            }).then(function(response){
              //set retrieved data to allData to be appended to the DOM
              application.allData = response.data;
              console.log((application.allData));
            });
          },
          //takes a new task and adds it to the database and displays on page
          addNewTask: function(e) {
            //Reset form and disable button when inputting
            document.getElementById('task-input').value = "";
            //use axios for async call to add operation
            axios.post('/outlook-work/ajax/operation.php', {
              action:'add',
              task_name: application.task.task_name
            }).then(function(response){
              //create object with database id and task body
              let addObj = {
                id: response.data, task_name: application.task.task_name
              };
              //push Obj to allData to display on page
              application.allData.push(addObj);
            });
            //TODO  
            /*
              if returning unsuccessfully return an error message
            */
          },
          deleteTask: function(e) {
            let v = confirm("Are you sure you want to delete this task?");
            if (v) {
            /*
              get parent element id as it is shared with the id of the database
              make axios call to delete
              return and remvoe from list or if not add error message
              
            */
              axios.post('/outlook-work/ajax/operation.php', {
                action:'delete',
                task_id: application.task.task_name
              }).then(function(response){
                //create object with database id and task body
                let addObj = {
                  id: response.data, task_name: application.task.task_name
                };
                //push Obj to allData to display on page
                application.allData.push(addObj);
              });
            }
          }
        },
        //on create vue instance fetch all items from DB and show on pageload
        created: function() {
          this.fetchAllItems();
        }
      })
      
}
