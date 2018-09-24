// Initialize Firebase
const config = {
  apiKey: "AIzaSyDwUZfYgy-JVo_Ivl-tuFyA9ZwGp2Pyz50",
  authDomain: "sweet-potato-307fc.firebaseapp.com",
  databaseURL: "https://sweet-potato-307fc.firebaseio.com",
  projectId: "sweet-potato-307fc",
  storageBucket: "sweet-potato-307fc.appspot.com",
  messagingSenderId: "416504696211"
};

firebase.initializeApp(config);

const database = firebase.database();

database.ref("shows").on("value", (results) => {
	const showUl = document.querySelector('.tv-show__list');
	showUl.innerHTML = "";
	let allShows = results.val();
	for (var showID in allShows) {
		let showLi = document.createElement('li'),
				listTitle = allShows[showID].show,
				nextEpInfo = allShows[showID].next_ep,
				nextEpHtml = '',
				imgSrc = allShows[showID].img;

    showLi.className = 'li__card';
    showLi.setAttribute('data-id', `${showID}`);

    if (typeof nextEpInfo === 'string') {
    	nextEpHtml = '<p>No new episodes scheduled</p>';
    } else {
    	nextEpHtml = `<p>${nextEpInfo.air_date}</p>
										<p>${nextEpInfo.name}</p>
										<p>${nextEpInfo.overview}</p>`;
    }

		showLi.innerHTML = `<img class='li__card--img' src='${imgSrc}'>
												<div class='li__card--content'>
													<span class="remove-btn"><i class="fa fa-times-circle-o" aria-hidden="true"></i></span>
													<h3>${listTitle}</h3>
													<h4>Next Episode:</h4>
													${nextEpHtml}
												</div>`;
		showUl.appendChild(showLi);
	}
	deletinator();
})

const deletinator = () => {
	const toDelete = document.querySelectorAll('.remove-btn');
	toDelete.forEach(element => {
		element.addEventListener('click', function() {
			let deleteLi = this.parentNode.parentNode,
					dataId = deleteLi.getAttribute('data-id'),
					showsReference = database.ref('shows/' + dataId);
			console.log(dataId);
			showsReference.remove();
		})
	})
}