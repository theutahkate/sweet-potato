// SEARCH SHOWS
const searchForm = document.getElementById("searchForm");

searchForm.addEventListener("submit", () => {
	event.preventDefault();
	const searchTitle = document.getElementById("searchTitle");
	let searchQuery = searchTitle.value,
			queryString = searchQuery.replace(/ /g, "%20");

	searchApi(queryString);
});

let searchApi = query => {
	let results = "{}",
			url = `https://api.themoviedb.org/3/search/tv?api_key=${tvApiKey}&language=en-US&query=${query}&page=1`,
			xhr = new XMLHttpRequest();

	xhr.addEventListener("readystatechange", function () {
	  if (this.readyState === this.DONE) {
	    results = JSON.parse(this.responseText).results;
	    buildSearchResults(results);
	  }
	});

	xhr.open("GET", url);
	xhr.send(results);
}

let buildSearchResults = data => {
	const	ul = document.querySelector('.search__list'),
				baseImgUrl = "https://image.tmdb.org/t/p/w200_and_h300_bestv2";

  ul.innerHTML = '';

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
	addinator();
}


// ADD SHOW

let addinator = () => {
	let buttons = document.querySelectorAll(".add-btn");
	buttons.forEach( element => {
		element.addEventListener("click", function() {
			event.preventDefault();

			let h3 = element.previousElementSibling,
					tmdbId = h3.getAttribute("data-id");

			getShowApi(tmdbId);
		})
	})
}

let getShowApi = showApiId => {
	let results = "{}",
			url = `https://api.themoviedb.org/3/tv/${showApiId}?api_key=${tvApiKey}&language=en-US`,
			xhr = new XMLHttpRequest();

	xhr.addEventListener("readystatechange", function () {
	  if (this.readyState === this.DONE) {
	    results = JSON.parse(this.responseText);
	    sendShowToDb(results, showApiId);
	  }
	});

	xhr.open("GET", url);
	xhr.send(results);
}

let sendShowToDb = data => {
	let showTitle = data.name,
			imgDefault = 'http://placekitten.com/g/200/300',
			imgSrc = `${baseImgUrl}${data.poster_path}` || imgDefault,
			tmdbId = data.id,
			next_ep = data.next_episode_to_air || 'No episode scheduled';
			// genres = [];
  let dbReference = firebase.database().ref('shows');
  dbReference.push({
    show: showTitle,
    tmdb_id: tmdbId,
    img: imgSrc,
    next_ep: next_ep
  });
}


// SHOWS LIST - SHORT

database.ref("shows").on("value", (results) => {
	const showUl = document.querySelector('.side-shows__list');
	showUl.innerHTML = "";
	let allShows = results.val();
	for (var showID in allShows) {
		let showLi = document.createElement('li'),
				listTitle = allShows[showID].show;

		showLi.setAttribute('data-id', `${showID}`);
		showLi.innerHTML = `<h3>${listTitle}</h3><span class="remove-btn"><i class="fa fa-times-circle-o" aria-hidden="true"></i></span>`;
		showUl.appendChild(showLi);
	}
	deletinator();
})
