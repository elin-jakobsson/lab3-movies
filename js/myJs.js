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

  //var offline;
  let data;
  let dataList = [];
  let objDeleteId;

  //page
  let pages;
  let page = 1;
  const itemsPerPage = 6;


  // Movie object to databse
  let movieObject = {
    title: "No name",
    director: "No name",
    year: 0000,
    img: "img/movie-logo.jpg",
    raiting: 50
  }


  // Add Form input
  let titleInput = document.getElementById('movTitle');
  let director = document.getElementById('movDirector');
  let year = document.getElementById('movYear');
  let movImg = document.getElementById('movSrc')

  let addBtn = document.getElementById('addBtn');
  let clearBtn = document.getElementById('clearBtn');


  //SLIDER JS
  let raiting = document.getElementById("myRange");
  let raitingVal = document.getElementById("demo");
  raitingVal.innerHTML = raiting.value;

  raiting.addEventListener("input", function(event) {
    raitingVal.innerHTML = this.value;

  });


  //add a movie to the database
  addBtn.addEventListener('click', function(event) {
    movieObject;
    if (titleInput.value.length > 0 && director.value.length > 0 && year.value.length > 0) {
      movieObject.title = titleInput.value.toLowerCase();
      movieObject.director = director.value.toLowerCase();
      movieObject.year = year.value;

      movieObject.raiting = raiting.value;

      if (movImg.value != "") {
        movieObject.img = movImg.value;
      }else {
        movieObject.img =  "img/movie-logo.jpg";
      }

      db.ref('/movies').push(movieObject, function(error) {
        if (error) {
          //  alert('The Movie didnt save, please try again');
        } else {
          //  alert('Data saved successfully')
          titleInput.value = '';
          director.value = '';
          year.value = '';
          movImg.value = '';
          raiting.value = 50;
          raitingVal.innerHTML = 50;
        }
      });
    } else {
      alert('Please add a the name of the title, the director and relase date, before adding to the movie list');

    }

  }); // END of add button

  // Clear If regreat add witout send
  clear.addEventListener('click', function(event) {
    titleInput.value = '';
    director.value = '';
    year.value = '';
    movImg.value = '';
    raiting.value = 50;
    raitingVal.innerHTML = 50;
  });


  function mySort(dataList) {
    if (document.getElementById('title-a-b').checked) {
      dataList.sort(function(a, b) {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
    }
    if (document.getElementById('title-b-a').checked) {
      dataList.sort(function(a, b) {
        if (a.title < b.title) return 1;
        if (a.title > b.title) return -1;
        return 0;
      });
    }
    if (document.getElementById('direct-a-b').checked) {
      dataList.sort(function(a, b) {
        if (a.director < b.director) return -1;
        if (a.director > b.director) return 1;
        return 0;
      });
    }
    if (document.getElementById('direct-b-a').checked) {
      dataList.sort(function(a, b) {
        if (a.director < b.director) return 1;
        if (a.director > b.director) return -1;
        return 0;
      });
    }
    if (document.getElementById('new').checked) {
      dataList.sort(function(a, b) {
        if (a.year < b.year) return 1;
        if (a.year > b.year) return -1;
        return 0;
      });
    }
    if (document.getElementById('old').checked) {
      dataList.sort(function(a, b) {
        if (a.year < b.year) return -1;
        if (a.year > b.year) return 1;
        return 0;
      });
    }
  }

  // ON WINDOW LOAD
  db.ref('/movies').once('value', function(snapshot) {
    data = snapshot.val();
    //console.log(data);
    // Loop trough firebase object that exist in the begining
    dataList = [];
    for (let x in data) {
      data[x].key = x;
      dataList.push(data[x])
    }
  //  console.log(dataList);
    // Default sort
    dataList.sort(function(a, b) {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });

    print(dataList);
  });

  // ON CHILD ADDED
  db.ref('/movies').on('child_added', function(snapshot) {

    let child = snapshot.val();
    let key = snapshot.key;
    child.key = key;
    dataList.push(child);

    mySort(dataList);
    print(dataList);

  }); // end of child added


  // SORT Listeners
  document.getElementById('title-a-b').addEventListener('click', function() {
    dataList.sort(function(a, b) {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });
    page = 1;
    print(dataList);
  });

  document.getElementById('title-b-a').addEventListener('click', function() {
    dataList.sort(function(a, b) {
      if (a.title < b.title) return 1;
      if (a.title > b.title) return -1;
      return 0;
    });
    page = 1;
    print(dataList);
  });

  document.getElementById('direct-a-b').addEventListener('click', function() {
    dataList.sort(function(a, b) {
      if (a.director < b.director) return -1;
      if (a.director > b.director) return 1;
      return 0;
    });
    page = 1;
    print(dataList);
  });

  document.getElementById('direct-b-a').addEventListener('click', function() {

    dataList.sort(function(a, b) {
      if (a.director < b.director) return 1;
      if (a.director > b.director) return -1;
      return 0;
    });
    page = 1;
    print(dataList);
  });
  document.getElementById('new').addEventListener('click', function() {
    dataList.sort(function(a, b) {
      if (a.year < b.year) return 1;
      if (a.year > b.year) return -1;
      return 0;
    });
    page = 1;
    print(dataList);
  });
  document.getElementById('old').addEventListener('click', function() {
    dataList.sort(function(a, b) {
      if (a.year < b.year) return -1;
      if (a.year > b.year) return 1;
      return 0;
    });
    page = 1;
    print(dataList);
  });


  // PRINT FUNCTION
  function print(data) {
    //console.log('datalist beginning of print ', dataList.length);
    let newData = pagination(data);
    document.getElementById('movieDisplay').innerHTML = '';

    // START PRINT
    for (let z in newData) {
      let obj = newData[z];

      let div = document.createElement('div');
      div.id = obj.key;
      div.className = 'movieItem';
      div.innerHTML = `
      <img src=${obj.img} alt="movie image of ${obj.title}" >
      <div class='item1'>
        <ul class='ul-movitem'>
            <li class='li-title'>${obj.title}</li>
            <li class='li-year'>(${obj.year})</li>
            <li class='li-direct'><span>Director:</span> ${obj.director}</li>
            <li class='li-rait'> ${obj.raiting}/100</li>
        </ul>
        <div class='item2'>
        <button class='changeBtn' type="button" name="button">Change</button>
        <button class='closeBtn' type="button" name="button">Delete</button>
        </div>
      </div> `;

      let changeBtn = div.getElementsByTagName('button')[0];
      let deleteBtn = div.getElementsByTagName('button')[1];

      // CHANGE BUTTON
      changeBtn.addEventListener('click', function(event) {
        let objId = event.target.parentElement.parentElement.parentElement.id
        let divItem = document.getElementById(objId);

        // CHANGE HTML Object
        divItem.className = 'changeItem';
        divItem.innerHTML = `<form class='changeInput'>
        <h3>Input a diffrent movie</h3>
        <br>
        <label for="title">Title</label>
        <input id='changeTitle' type="text" name="title" value="">
        <label for="direct">Director</label>
        <input id='changeDirect' type="text" name="direct" value="">
        <label for="year">Year</label>
        <input id="changeYear" type="number" min='1' max="5000" name="" value="">
        <div class="slidecontainerTwo">
          <input type="range" min="0" max="100" value="50" class="slider" id="myRangeTwo">
          <p>Value: <span id="demoTwo">50</span></p>
        </div>
        <label for="image">Movie poster <em>Optional</em> </label>
        <input id="changeSrc" type="text" name="" value="">
        <div class="saveDiv">
        <button class='goback' type="button" name="button">Go back</button>
        <button class='addChange' type="button" name="button">Save</button>
        </div>
        </form>
        `;

        //SLIDER in CHANGE
        let rateTwo = document.getElementById("myRangeTwo");
        let rateTwoVal = document.getElementById("demoTwo");
        rateTwoVal.innerHTML = rateTwo.value;

        rateTwo.addEventListener("input", function(event) {
          rateTwoVal.innerHTML = this.value;
        });

        let goBackBtn = div.getElementsByTagName('button')[0];
        let saveBtn = div.getElementsByTagName('button')[1];

        //GO BACK BUTTON in Change
        goBackBtn.addEventListener('click', function(event) {
          //  console.log(event.target.parentElement.parentElement.id);
          print(dataList);
        });

        //SAVE BUTTON in Change
        saveBtn.addEventListener('click', function(event) {

          let saveId = event.target.parentElement.parentElement.parentElement.id;
          movieObject;
          let changedTitle = document.getElementById('changeTitle');
          let changedDirector = document.getElementById('changeDirect');
          let changedYear = document.getElementById('changeYear');
          let changedMovImg = document.getElementById('changeSrc')
          //  console.log(changedTitle);

          if (changedTitle.value != "") {
            movieObject.title = changedTitle.value.toLowerCase();
          }
          if (changedDirector.value != "") {
            movieObject.director = changedDirector.value.toLowerCase();
          }
          if (changedYear.value != "") {
            movieObject.year = changedYear.value;
          }

          movieObject.raiting = rateTwo.value;

          if (changedMovImg.value != "") {
            movieObject.img = changedMovImg.value;
          }else {
            movieObject.img =  "img/movie-logo.jpg";
          }
          

          db.ref('/movies/' + saveId).set(movieObject, function(error) {
            if (error) {
              //  alert('The Movie didnt save, please try again');
            } else {
              //  alert('Data saved successfully')

            }
          });

          let change = dataList.filter(function(el) {
            return el.key !== changedkey;
          })

          dataList = change;
          childChanged.key = changedkey;
          dataList.push(childChanged);

          mySort(dataList);
          print(dataList);

        });

      });

      deleteBtn.addEventListener('click', function(event) {
        objDeleteId = event.target.parentElement.parentElement.parentElement.id
        data;
        let itemRemoved;
        itemRemoved = data.filter(function(el) {
          return el.key !== objDeleteId;
        });
        //  console.log(itemRemoved);
        dataList = itemRemoved;
        print(dataList);
        db.ref('/movies/' + objDeleteId).remove();
      });

      document.getElementById('movieDisplay').appendChild(div);
    }
    //console.log('datalist ending of print ', dataList.length);
  } // END of function print



  // Child-changed
  var childChanged;
  var changedkey;
  db.ref('/movies/').on('child_changed', function(snapshot) {

    childChanged = snapshot.val();

    changedkey = snapshot.key;
    /*  let change = dataList.filter(function(el){
        return el.key !== changedkey;
      })

      dataList = change;
      childChanged.key = changedkey;
      dataList.push(childChanged);

      print(dataList);*/

  });


  //Pagination Listeners
  document.getElementById('next').addEventListener('click', function(event) {
    if (page < pages && page > 0) {
      page += 1;
      dataList;

      print(dataList);
    } else {
      //document.getElementById('next').disabled;
      //document.getElementById('next').style.color = 'gray';
    }
  });

  document.getElementById('previous').addEventListener('click', function(event) {
    if (page >= pages || page < pages && page != 1) {
      page -= 1;
      dataList;
      print(dataList);
    } else {
      //document.getElementById('previous').disabled;
      //document.getElementById('previous').style.color = 'gray';
    }
  });

  // Pagination
  function pagination(data) {
    // sid 1: 0 1 2 3
    //sid 2: 4 5 6 7
    let slicestart = (page - 1) * itemsPerPage;
    let slice = data.slice(slicestart, slicestart + itemsPerPage);

    pages = Math.ceil(data.length / itemsPerPage);
    document.getElementById('allPages').innerText = pages;
    document.getElementById('onPage').innerText = page;

    return slice;
  }


  //Search form
  let search = document.getElementById('inputSearch');

  search.addEventListener('keyup', function(event) {
    searchVal = event.target.value.toLowerCase();
    dataList;
    let filterlist;

    if (search.value !== '') {
      page = 1;
      filterlist = dataList.filter(find);
      print(filterlist);
    } else {
      page = 1;
      print(dataList);
    }
  });

  // Prevent enter submit in filter
  search.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
      //  console.log('prevent enter');
      event.preventDefault();
    }
  });


  // FIND FUNCTION for filter
  function find(data) {
    if (data.title.includes(search.value, 0)) {
      return data;
    }
    if (data.director.includes(search.value, 0)) {
      return data;
    }
    if (data.year.includes(search.value, 0)) {
      return data;
    }
  }


} // END of Everything
