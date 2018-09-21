// Initialize Firebase

firebase.initializeApp(config);

const database = firebase.database();

// API

let searchApi = query => {

	let data = "{}";

	const	baseImgUrl = "https://image.tmdb.org/t/p/w200_and_h300_bestv2",
				tvApiKey = "83b69fac3083f5a6ee97e1a82975d97f";
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

			let h3 = element.previousElementSibling,
					tmdbId = h3.getAttribute("data-id");

			getShowApi(tmdbId);
		})
	})
}

database.ref("shows").on("value", (results) => {
	const showUl = document.querySelector('.tv-show__list');
	showUl.innerHTML = "";
	let allShows = results.val();
	for (var showID in allShows) {
		let showLi = document.createElement('li'),
				listTitle = allShows[showID].show,
				nextEp = allShows[showID].next_ep,
				imgSrc = allShows[showID].img;

    showLi.className = 'li__card';
		showLi.innerHTML = `<img class='li__card--img' src='${imgSrc}'>
												<div class='li__card--content'>
													<h3>${listTitle}</h3>
													<p>${nextEp}</p>
												</div>`;
		showUl.appendChild(showLi);
	}
})

let getShowApi = showApiId => {
	console.log(showApiId)

	const	baseImgUrl = "https://image.tmdb.org/t/p/w400_and_h600_bestv2",
				tvApiKey = "83b69fac3083f5a6ee97e1a82975d97f";

	let data = "{}",
			url = `https://api.themoviedb.org/3/tv/${showApiId}?api_key=${tvApiKey}&language=en-US`;
	console.log(url)

	let xhr = new XMLHttpRequest();
	// xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () {
	  if (this.readyState === this.DONE) {
	    data = JSON.parse(this.responseText);

	    console.log(data)
	    let showTitle = data.name,
					imgDefault = 'http://placekitten.com/g/400/600',
					imgSrc = `${baseImgUrl}${data.poster_path}` || imgDefault,
					// desc = data.overview,
					next_ep = data.next_episode_to_air || 'No episode scheduled';
					// genres = [];
	    let dbReference = firebase.database().ref('shows');
		  dbReference.push({
		    show: showTitle,
		    tmdb_id: showApiId,
		    img: imgSrc,
		    status: status,
		    next_ep: next_ep
		  });
	  }
	});

	xhr.open("GET", url);

	xhr.send(data);
}
