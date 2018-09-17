// Initialize Firebase

firebase.initializeApp(config);

const database = firebase.database();

// DOM Elements
const addShowForm = document.getElementById("addShowForm"),
			titleInput = document.getElementById("addShowTitle"),
			addShowSubmit = document.getElementById("addShowSubmit"),
			ul = document.querySelector(".show__list");
let showTitle = "";

addShowForm.addEventListener("submit", () => {
	event.preventDefault();
	showTitle = titleInput.value;

	let dbReference = firebase.database().ref('shows');
  dbReference.push({
    show: showTitle,
  });

  addShowTitle = "";
})

database.ref("shows").on("value", (results) => {
	ul.innerHTML = "";
	let allShows = results.val();
	for (var showID in allShows) {
		let li = document.createElement('li'),
				listTitle = allShows[showID].show;
		li.innerHTML = `<h3 class="show__title">${listTitle}</h3>`;
		ul.appendChild(li);
	}
})


// API

let searchApi = query => {

	let data = "{}";

	const	baseImgUrl = "https://image.tmdb.org/t/p/w200_and_h300_bestv2",
				baseUrl = "https://api.themoviedb.org/3/search/tv?api_key=",
				middleUrl = "&language=en-US&query=",
				endUrl = "&page=1";
	let url = `${baseUrl}${tvApiKey}${middleUrl}${query}${endUrl}`;


	let xhr = new XMLHttpRequest();
	// xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () {
	  if (this.readyState === this.DONE) {
	    data = JSON.parse(this.responseText).results;

	    const	ul = document.querySelector('.search__list');

			data.forEach(function(element) {
				console.log(element)
				const li = document.createElement('li');
				let searchTitle = element.name,
						searchImg = baseImgUrl + element.poster_path;
	 			li.innerHTML = `<img src='${searchImg}'><h3>${searchTitle}</h3>`;
	 			ul.appendChild(li);

	 		})
	  }
	});

	xhr.open("GET", url);

	xhr.send(data);
}

searchForm.addEventListener("submit", () => {
	event.preventDefault();
	const searchForm = document.getElementById("searchForm"),
				searchTitle = document.getElementById("searchTitle");
	let searchQuery = searchTitle.value,
			queryString = searchQuery.replace(/ /g, "%20");

	searchApi(queryString);
});





