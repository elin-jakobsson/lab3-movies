window.addEventListener('load', everything);

function everything(event) {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAqSM_lE8Xo03XFY8mil4xJLCSc9ke2LQY",
    authDomain: "movie-lab3.firebaseapp.com",
    databaseURL: "https://movie-lab3.firebaseio.com",
    projectId: "movie-lab3",
    storageBucket: "",
    messagingSenderId: "946108198789"
  };
  firebase.initializeApp(config);

  //Firebase conection
  let db = firebase.database();

  var offline = '';

  // Movie object to databse
  let movieObject = {
    title: "No name",
    director: "No name",
    year: 0000,
    img: "img/movie-logo.jpg",
    raiting: 0
  }


  // Add Form input
  let titleInput = document.getElementById('movTitle');
  let director = document.getElementById('movDirector');
  let year = document.getElementById('movYear');
  let movImg = document.getElementById('movSrc')

  let addBtn = document.getElementById('addBtn');
  let clearBtn = document.getElementById('clearBtn');


  //SLIDER JS
  let rating = document.getElementById("myRange");
  let ratingVal = document.getElementById("demo");
  ratingVal.innerHTML = rating.value;

  rating.oninput = function() {
    ratingVal.innerHTML = this.value;
  }


  //add a movie to the database
  addBtn.addEventListener('click', function(event) {
    movieObject.title = titleInput.value.toLowerCase();
    movieObject.director = director.value.toLowerCase();
    movieObject.year = year.value;
    movieObject.raiting = rating.value;

    if (movImg.value.length > 1) {
      movieObject.img = movImg.value;
    }

    db.ref('/movies').push(movieObject, function(error) {
      if (error) {
        alert('The Movie didnt save, please try again');
      } else {
        alert('Data saved successfully')
        titleInput.value = '';
        director.value = '';
        year.value = '';
        movImg.value = '';
        rating.value = 0;
      }
    });
  });

  // Clear If regreat add witout send
  clear.addEventListener('click', function(event) {
    titleInput.value = '';
    director.value = '';
    year.value = '';
    movImg.value = '';
    rating.value = 0;
  });

  console.log('offline before snap' + offline);
  db.ref('/').on('value', function(snapshot) {
    let data = snapshot.val();
    //console.log(data);
    offline = data;
      console.log(offline);
    for (let key in data) {
      console.log(data[key]);
    }

  });

console.log('offline after snap'+ offline);







} // END of Everything
