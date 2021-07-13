/*
    * - We need the url/key/fetch call
    * - create app function, and fetch :white_check_mark:
    * - listen for a button click
    * - DECLARE AN APP OBJ :white_check_mark:
    * - we need a form or some type of user input?
    * - We need to capture user input from our form
    * - RANDOM MOVIE BUTTON
    * - depending on the user input 
    * - then random go through that object and put on html
*/


// First creating our namspace for the application
const yikeMovieApp = {}
// holding our content in memory
yikeMovieApp.baseUrl = "https://api.themoviedb.org/3"
yikeMovieApp.apiKey = "695ac71fce5922ab995f1f6b063ba94f"

// hold all of our generes in memory
yikeMovieApp.genres = [];

//fetch function
yikeMovieApp.fetchMovieGenre = () => {
    const url = new URL(`${yikeMovieApp.baseUrl}/genre/movie/list`);
    url.search = new URLSearchParams({
        api_key: yikeMovieApp.apiKey
    })
    fetch(url)
        .then((res) => {
            console.log(res)
            return res.json();
        })
        .then((data) => {
            yikeMovieApp.genres = data.genres;
            yikeMovieApp.displayGenres(yikeMovieApp.genres);
        })
}

// Displaying the new genres to the dropdown menu

yikeMovieApp.displayGenres = (listOfGenres) => {
    // getting the select element from the screen
    const selectEl = document.getElementById("genres");

    // loop through the list of gernes and append to the select element
    listOfGenres.forEach((genre) => {
        // create a variable for option 
        const newOptionEl = document.createElement("option");
        // provide the option with values
        newOptionEl.textContent = genre.name;
        newOptionEl.setAttribute("value", genre.id);
        // append the values to the select element
        selectEl.append(newOptionEl);
    })
}

// add an event listener to the form
// so that we can get the users information

yikeMovieApp.getUserInformation = () => {
    const formEl = document.querySelector("form")
    formEl.addEventListener("submit", (event) => {
        event.preventDefault();
        const userSelection = event.target[0].value;
        console.log(event.target[0].value);
        yikeMovieApp.susan(userSelection)
    })
}

// create function to grab all movies within a genre
// susan  = fetch movies by genre plz
yikeMovieApp.susan = (genre) => {
    const url = new URL(`${yikeMovieApp.baseUrl}/discover/movie`)
    url.search = new URLSearchParams({
        api_key: yikeMovieApp.apiKey,
        with_genres: genre
    })
    fetch(url)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        yikeMovieApp.userSelectedMovies = data.results;
        yikeMovieApp.jennifer(yikeMovieApp.userSelectedMovies);
    })
}
// render to the content to the page
yikeMovieApp.jennifer = (movies) => {
    const moviesList = document.getElementById("movies") 
    moviesList.innerHTML = ""
    movies.forEach((movie) => {
        // Create a new list item
        const newListItem= document.createElement("li")
        // Create a new image
        const newListPhoto = document.createElement("img")
        // Append Image information to the image
        const movieImage = `https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`
        newListPhoto.setAttribute("src", movieImage)
        newListPhoto.setAttribute("alt", `This is a poster for the movie: ${movie.title}`)
        // Create new paragraph elements and add in the content
        const newListTitle = document.createElement("p")
        newListTitle.textContent = movie.title
        const newListOverview = document.createElement("p")
        newListOverview.textContent = movie.overview
        const newListMetric = document.createElement("p")
        newListMetric.textContent = `Average rating of: ${movie.vote_average}; from ${movie.vote_count} users`
        //Add new content to the new list item 
        newListItem.appendChild(newListPhoto)
        newListItem.appendChild(newListTitle)
        newListItem.appendChild(newListOverview)
        newListItem.appendChild(newListMetric)
        // Add content to the screen!
        moviesList.append(newListItem)
    })
}

// random movie button
yikeMovieApp.safi = () => {

}
// init paul
yikeMovieApp.paul = () => {
    yikeMovieApp.fetchMovieGenre();
    yikeMovieApp.getUserInformation();
};


// Init function
yikeMovieApp.paul();