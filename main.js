/*json created from g search html file http://goo.gl/SNKDqg
main category is .theatre -  not achieved*/
/*-------------*/
/*
open state function 
create button to fetch results
set variables
set functions to gather and write and sort data
only 120 minutes of detail on films starting e.g. 10:30 - 12:30
set functions to render data out to app interface
hand held devices only
start at line 20

https://drive.google.com/folderview?id=0ByEj7hd86PNZWGFfZWpzdERvUUk&usp=sharing drive folderview
https://docs.google.com/spreadsheets/d/1vC-VXQwd9mRI5fs2yPBRd3HM3jrEfwbUC0HRAOoQ50s/edit?usp=sharing
https://docs.google.com/spreadsheets/d/1vC-VXQwd9mRI5fs2yPBRd3HM3jrEfwbUC0HRAOoQ50s/edit?usp=sharing
1vC-VXQwd9mRI5fs2yPBRd3HM3jrEfwbUC0HRAOoQ50s
https://docs.google.com/spreadsheets/d/1vC-VXQwd9mRI5fs2yPBRd3HM3jrEfwbUC0HRAOoQ50s/edit?usp=sharing
*/
/*CONFIG*/
(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyArHrUg6HI-xyaN-iJwCIFRlgFYfZ53mIQ",
        authDomain: "cinemanow-52fae.firebaseapp.com",
        databaseURL: "https://cinemanow-52fae.firebaseio.com",
        storageBucket: ""
    };
    firebase.initializeApp(config);

    var into = document.querySelector('#container')
    var state = {}

    /*FUNCTIONS*/

    firebase.database().ref('movies/').on('value', function(snapshot) {
        state.movies = snapshot.val();
        renderMovies(state, into)
    });

    function getMovies() {
        fetch('https://spreadsheets.google.com/feeds/list/1vC-VXQwd9mRI5fs2yPBRd3HM3jrEfwbUC0HRAOoQ50s/od6/public/values?alt=json').then((response) => {
            return response.json()
        }).then((dataAsJson) => {
            var movies = []

            dataAsJson.feed.entry.forEach((entry)=>{
                var  movie = {}
                movie.title = entry.gsx$titles.$t,
                movie.rating = entry.gsx$rating.$t,
                movie.duration = entry.gsx$duration.$t,
                movie.sessions = entry.gsx$session1.$t,
                movie.seen = false
                movies.push(movie);
            })

            firebase.database().ref('movies/').set({
                movies: movies
            });
            //renderMovies(state/*, into*/);
        })
    }
    /*firebase.database().ref('tasks/').set({
        abc123: {
            title: 'Overwrite data',
            done: true
        }
    });*/
    function renderMovies(state, into) {

        console.log(state);
        /*stat.movies.movie.foreach*/


        // return into.innerHTML = `
        //     <div id="getmovies">${data.getmovies}<button>${data}</button></div>
        //     <div id="results">${data.results}</div>
        // `
    } 

    /*EXECUTION*/
    getMovies();

})() //endof iffe



/*delegate('#container', 'click', 'button', () => {  }
    render(state, container) })*/