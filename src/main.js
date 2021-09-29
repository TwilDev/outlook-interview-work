

//on DOM load create new vue instance
window.onload = function() {

    var application = new Vue({
      //mounted element
        el: '#app',
        data: {
            toDoItems: [{}],
            task: {},
            allData:''
        },
        methods: {
          greet(e) {
            console.log("Hello World")
          },
          //gets items via axiom call and populates page
          fetchAllItems: function() {
            //using axios to send async call to php file - previously used ajax so I'm slightly new to this and there may be a better way at approaching this
            axios.post('http://127.0.0.1/outlook-work/ajax/operation.php', {
              action:'init'
            }).then(function(response){
              //set retrieved data to allData to be appended to the DOM
              application.allData = response.data;
              console.log((response.data));
            });
          }
        },
        //on create vue instance fetch all items from DB and show on pageload
        created: function() {
          this.fetchAllItems();
        }
      })
      
}
