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

            dataAsJson.feed.entry.forEach((entry, index)=>{
                var  movie = {}
                movie.id = index,
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

    function renderMovies (state, into){

        return into.innerHTML = `
        <div id="getmovies" align="center">
                        <h2>Movies at the Dendy</h2>
                        <h3>Now Showing</h3>
                        <p>261-263 King St, Newtown</p>
                        
                    </div>
            <ul class="list-unstyled">
                    ${state.movies.movies.map((movie)=>{
                        if (!movie.seen){
                            return renderMovie(movie)
                        }
                    }).join('')}
            </ul>
         `
        }
  
    function renderMovie(movie) {
            return(
                `<li data-id="${movie.id}"> ${movie.title} <span> ${movie.sessions} </span><span class="remove-movie"> X </span></li>`
            )
         }
     function removeMovie(event) {
         var elem = closest(event.delegateTarget, '[data-id]')
         var id = elem.attributes[0].value

        firebase.database().ref('movies/movies/'+id).update({
            seen: true
        });
     }    

    /*EXECUTION*/
    getMovies();

    delegate('body','click','.remove-movie', removeMovie)

})() //endof iffe

