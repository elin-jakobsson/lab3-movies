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

  var offline;
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
    movieObject.title = titleInput.value.toLowerCase();
    movieObject.director = director.value.toLowerCase();
    movieObject.year = year.value;
    movieObject.raiting = raiting.value;

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
        raiting.value = 50;
        raitingVal.innerHTML = 50;
      }
    });
  });

  // Clear If regreat add witout send
  clear.addEventListener('click', function(event) {
    titleInput.value = '';
    director.value = '';
    year.value = '';
    movImg.value = '';
    raiting.value = 50;
    raitingVal.innerHTML = 50;
  });


  db.ref('/movies').once('value', function(snapshot) {
    data = snapshot.val();

    dataList = [];
    for (let x in data) {
      //  console.log(x);
      data[x].key = x;
      dataList.push(data[x])
    }

    //console.log('list is ',dataList);
    dataList.sort(function(a, b) {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });

    print(dataList);

  });

  db.ref('/movies').on('child_added', function(snapshot) {

    let child = snapshot.val();
    let key = snapshot.key;
    child.key = key;
    dataList.push(child);

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

    print(dataList);

  });


  offline;

  document.getElementById('title-a-b').addEventListener('click', function() {
    dataList.sort(function(a, b) {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });
    print(dataList);
  });

  document.getElementById('title-b-a').addEventListener('click', function() {
    dataList.sort(function(a, b) {
      if (a.title < b.title) return 1;
      if (a.title > b.title) return -1;
      return 0;
    });
    print(dataList);
  });

  document.getElementById('direct-a-b').addEventListener('click', function() {
    dataList.sort(function(a, b) {
      if (a.director < b.director) return -1;
      if (a.director > b.director) return 1;
      return 0;
    });
    print(dataList);
  });

  document.getElementById('direct-b-a').addEventListener('click', function() {
    dataList.sort(function(a, b) {
      if (a.director < b.director) return 1;
      if (a.director > b.director) return -1;
      return 0;
    });
    print(dataList);
  });

  function print(data) {
    data;
    let newData = pagination(data);
    document.getElementById('movieDisplay').innerHTML = '';
    for (let z in newData) {
      //console.log(dataList[key]);
      let obj = newData[z];
      //console.log(obj.director);

      let div = document.createElement('div');
      div.id = obj.key;
      div.className = 'movieItem';
      div.innerHTML = `
    <img src=${obj.img} alt="movie image of ${obj.title}" >
      <div class='item1'>
        <ul class='ul-movitem'>
            <li class='li-title'>${obj.title}</li>
            <li>(${obj.year})</li>
            <li>Director: ${obj.director}</li>
            <li>Raiting: ${obj.raiting}/100</li>
        </ul>
        <div class='item2'>
        <button class='changeBtn' type="button" name="button">Change</button>
        <button class='closeBtn' type="button" name="button">Delete</button>
        </div>
      </div> `;


      let changeBtn = div.getElementsByTagName('button')[0];
      let deleteBtn = div.getElementsByTagName('button')[1];

      changeBtn.addEventListener('click', function(event) {
        let objId = event.target.parentElement.parentElement.parentElement.id
        let divItem = document.getElementById(objId);

        //document.getElementsByClassName('changeMovie')[0].style.display= 'block';


        divItem.innerHTML = `<form class='changeInput'>
        <label for="title">Title</label>
        <input type="text" name="title" value="">
        <label for="direct">Director</label>
        <input type="text" name="direct" value="">
        <label for="year">Year</label>
        <input id="movYear" type="number" min='1' max="5000" name="" value="">
        <div class="slidecontainerTwo">
          <input type="range" min="0" max="100" value="50" class="slider" id="myRange">
          <p>Value: <span id="demo"></span></p>
        </div>
        <label for="image">Movie poster <em>Optional</em> </label>
        <input id="movSrc" type="text" name="" value="">
        </form>
        <div class="saveDiv">
          <button  type="button" name="button">Go back</button>
          <button  type="button" name="button">Add</button>
        </div>
        `
        let goBackBtn = div.getElementsByTagName('button')[0];
        let saveBtn = div.getElementsByTagName('button')[1];

        goBackBtn.addEventListener('click', function(event){
          console.log(event.target.parentElement.parentElement.id);
        });
        saveBtn.addEventListener('click', function(event){
          console.log(event.target.parentElement.parentElement.id);
        });


        console.log(objId);
      });


      deleteBtn.addEventListener('click', function(event) {
        objDeleteId = event.target.parentElement.parentElement.parentElement.id
        data;
        let itemRemoved;

        itemRemoved = data.filter(function(el) {
          return el.key !== objDeleteId;
        });

        data = itemRemoved;
        print(data);

        db.ref('/movies/' + objDeleteId).remove();

      });


      document.getElementById('movieDisplay').appendChild(div);
    }




  }

  /*function findSpecific(data) {
    if (data.key.includes(objDeleteId, 0)) {
      return data;
    }
  }*/

  document.getElementById('next').addEventListener('click', function(event) {
    if (page < pages && page > 0) {
      // data
      page += 1;
      //pagination(data)
      //console.log(page);
      dataList;
      //  console.log(dataList);
      print(dataList);
    } else {
      //console.log(page);
      //console.log('didnt work');
      document.getElementById('next').disabled;
      document.getElementById('next').style.color = 'gray';
    }
  });

  document.getElementById('previous').addEventListener('click', function(event) {
    if (page >= pages || page < pages && page != 1) {
      page -= 1;
      //console.log(page);
      dataList;
      //  console.log(dataList);
      print(dataList);
    } else {
      //console.log(page);
      //  console.log('didnt work');

    }
  });

  // Pagination
  function pagination(data) {

    // Default

    // sid 1: 0 1 2 3
    //sid 2: 4 5 6 7
    let slicestart = (page - 1) * itemsPerPage;
    let slice = data.slice(slicestart, slicestart + itemsPerPage);

    //  console.log(slice);
    //p==1 listitems 0*4=0  - 4
    //p==2 1*4=4

    pages = Math.ceil(data.length / itemsPerPage);
    document.getElementById('allPages').innerText = pages;
    document.getElementById('onPage').innerText = page;

    //console.log('slice is', slice);
    return slice;
    //Filter alla som har den här nyckeln visas

  }


  //Search form
  let search = document.getElementById('inputSearch');
  //let searchBtn = document.getElementById('searchBtn');

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


  function find(data) {
    //  console.log(search.value);

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
