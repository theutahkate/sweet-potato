const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

database.ref("shows").on("value", (results) => {
	const showUl = document.querySelector('.tv-show__list');
	showUl.innerHTML = "";
	let allShows = results.val();
	for (var showID in allShows) {
		let showLi = document.createElement('li'),
				listTitle = allShows[showID].show,
				nextEpInfo = allShows[showID].next_ep,
				nextEpDate = dateFormatter(nextEpInfo.air_date),
				nextEpHtml = '',
				imgSrc = allShows[showID].img;
    showLi.className = 'li__card';

    if (typeof nextEpInfo === 'string') {
    	nextEpHtml = '<p>No new episodes scheduled</p>';
    } else {
			nextEpHtml = `<p>${nextEpDate}</p>
										<p>${nextEpInfo.name}</p>
										<p>${nextEpInfo.overview}</p>`;
    }

		showLi.innerHTML = `<img class='li__card--img' src='${imgSrc}'>
												<div class='li__card--content' data-id='${showID}'>
													<span class="remove-btn"><i class="fa fa-times-circle-o" aria-hidden="true"></i></span>
													<h3>${listTitle}</h3>
													<h4>Next Episode:</h4>
													${nextEpHtml}
												</div>`;
		showUl.appendChild(showLi);
	}
	deletinator();
})

function dateFormatter(dateObj) {
	let date = new Date(dateObj),
			weekday = dayOfWeek[date.getDay()],
			month = date.getMonth()+1;
			displayDate = `${weekday}, ${month}/${date.getDate()}/${date.getFullYear()}`;
  return displayDate;
}
