// Initialize Firebase


firebase.initializeApp(config);

const database = firebase.database();

// DOM Elements
const addShowForm = document.getElementById("addShowForm"),
			titleInput = document.getElementById("addShowTitle"),
			addShowSubmit = document.getElementById("addShowSubmit"),
			ul = document.querySelector(".show__list");
let showTitle = "";

console.log(ul);

addShowForm.addEventListener("submit", function() {
	event.preventDefault();
	showTitle = titleInput.value;

	let dbReference = firebase.database().ref('shows');
  dbReference.push({
    show: showTitle,
  });

  addShowTitle = "";
})

database.ref("shows").on("value", function(results) {
	console.log(results)
	ul.innerHTML = "";
	let allShows = results.val();
	for (var showID in allShows) {
		let li = document.createElement('li'),
				listTitle = allShows[showID].show;
		li.innerHTML = `<h3 class="show__title">${listTitle}</h3>`;
		ul.appendChild(li);
	}
})








