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


// Global TMDB API
const	baseImgUrl = "https://image.tmdb.org/t/p/w200_and_h300_bestv2",
			tvApiKey = "83b69fac3083f5a6ee97e1a82975d97f";


// Delete Show From List
const deletinator = () => {
	const toDelete = document.querySelectorAll('.remove-btn');
	toDelete.forEach(element => {
		element.addEventListener('click', function() {
			let deleteLi = this.parentNode,
					dataId = deleteLi.getAttribute('data-id'),
					showsReference = database.ref('shows/' + dataId);
			showsReference.remove();
		})
	})
}
