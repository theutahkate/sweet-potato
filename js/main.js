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

  titleInput = "";
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

	const	baseImgUrl = "https://image.tmdb.org/t/p/w200_and_h300_bestv2";

	let url = `https://api.themoviedb.org/3/search/tv?api_key=${tvApiKey}&language=en-US&query=${query}&page=1`;


	let xhr = new XMLHttpRequest();
	// xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () {
	  if (this.readyState === this.DONE) {
	    data = JSON.parse(this.responseText).results;

	    const	ul = document.querySelector('.search__list');

			data.forEach( (element) => {
				const li = document.createElement('li');
				let searchImg = baseImgUrl + element.poster_path,
						searchTitle = element.name;
						id = element.id;

        li.className = 'li__card';
				li.innerHTML = `<img class='li__card--img' src='${searchImg}'>
													<div class='li__card--content'>
													<h3 data-id='${id}'>${searchTitle}</h3>
													<button class="fa fa-plus add-btn">Add To List</button>
												</div>`;
	 			ul.appendChild(li);
	 		})
 			buttonator();
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

let buttonator = () => {
	let buttons = document.querySelectorAll(".add-btn");
	buttons.forEach( element => {
		element.addEventListener("click", function() {
			event.preventDefault();
			let parentDiv = element.parentNode,
					h3 = element.previousElementSibling,
					imgTag = parentDiv.previousElementSibling;
					showTitle = h3.innerHTML,
					tmdbId = h3.getAttribute('data-id'),
					imgSrc = imgTag.getAttribute('src');
			console.log(imgTag)
			console.log(h3)
			console.log(parentDiv)

		let dbReference = firebase.database().ref('shows');
	  dbReference.push({
	    show: showTitle,
	    tmdb_id: tmdbId,
	    img: imgSrc
	  });

		})
	})
}


let getShowApi = showApiId => {
	console.log(showApiId)

	const	tvApiKey = "83b69fac3083f5a6ee97e1a82975d97f";

	let data = "{}",
			url = `https://api.themoviedb.org/3/tv/${showApiId}?api_key=${tvApiKey}&language=en-US`;
	console.log(url)

	let xhr = new XMLHttpRequest();
	// xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () {
	  if (this.readyState === this.DONE) {
	    data = JSON.parse(this.responseText);

	    console.log(data)
			// getstatus, next_episode_to_air, genres, overview?

	  }
	});

	xhr.open("GET", url);

	xhr.send(data);
}



