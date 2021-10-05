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
          });
        },
        //Validates input to ensure that blank data cannot be added to the database
        validateTaskInput: function(e) {
          //get error element 
          const err = document.getElementsByClassName('form-error')[0];

          //check task_name data if not empty call addNewTask
          if (!application.task.task_name) {
            //display error
            err.innerHTML = "Please enter a task";
          } else {
            //check if error is displayed and remvoe if true
            if (err.innerHTML !== "") {
              err.innerHTML = "";
            }
            //call add task
            this.addNewTask();
          }
        },
        //takes a new task and adds it to the database and displays on page
        addNewTask: function(e) {
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
            application.task = {};
            //on error
          }).catch(function(err){
            var formErr = document.getElementsByClassName('form-error')[0];
            formErr.innerHTML = err.response.data.error;
          });
        },
        //handles deleting tasks from the database and removes them from the UI
        deleteTask: function(e) {
          //use a confirm for delete validation
          let v = confirm("Are you sure you want to delete this task?");
          if (v) {
            //if confirmed use axios to call delete operation
            axios.post('/outlook-work/ajax/operation.php', {
              action: 'delete',
              //get the parent id as a reference to the task in the database via event target
              task_id : e.target.parentElement.id
            }).then(function(response){
              console.log(response.data);
              //on success iterate through array of tasks and splice out the object containing the id of the deleted task
              if (response.data == 1) {
                for (let i=application.allData.length - 1; i >= 0; --i) {
                  if (application.allData[i].task_id == e.target.parentElement.id) {
                    application.allData.splice(i, 1);
                  }
                }
              }
              //on error 
            }).catch(function(err) {
              var formErr = document.getElementsByClassName('form-error')[0];
              formErr.innerHTML = err.response.data.error;
            })
          }
        },
        //Changes the next of the task to be crossed out when checking radio button
        testIfChecked: function(e) {
          // get the parent node of the entire checkbox
          var el = e.target.parentNode;
          //define the target sibling
          var targetSibling;
          //while there is a valid element traverse dom assign the first element of type task-text to targetSibling
          while (el) {
            if (el.matches('.task-text')) {
              targetSibling = el;
              break;
            }
            //mark the active element as the next sibling
            el = el.nextElementSibling;
          }
          // Edit the style of the next paragraph tag and add style line-through
          if (targetSibling.style.textDecoration === "line-through") {
            targetSibling.style.textDecoration = "none";
          } else {
            targetSibling.style.textDecoration = "line-through";
          }
          
        },
      },
      //on create vue instance fetch all items from DB and show on pageload
      created: function() {
        this.fetchAllItems();
      }
    })
      
}
