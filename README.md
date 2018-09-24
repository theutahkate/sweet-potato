# Sweet Potato
Track Your Shows

## Overview
You know the thing where you watch multiple shows but you can't always remember which ones you're following at any given time, and you don't know if there's a new episode coming up or if it's a repeat or if the show's gone on hiatus while you weren't looking?
Sweet Potato lets you search for TV shows, add them to the list of shows you're following, and see when the next episode is for each show in your list, so you never have to suffer the pain of disorganized TV viewing again.

### API
Sweet Potato uses the [The Movie Database](https://www.themoviedb.org)'s [API](https://www.themoviedb.org/documentation/api?language=en-US) to search for shows and to find detailed information about selected shows.

### Firebase
Sweet Potato uses [Firebase](https://firebase.google.com/) to store detailed information for each show on the list.

## How Sweet Potato?
### How To Use
Search for shows using the search input. Click 'Add to List' if you want to, well, add the show to the list. A short version of the list (title only) will be to the right of the search results &mdash; click 'More Details' to see the detailed version of the list.

### How It Works
On click of the search submit button, Sweet Potato formats a search query from user input and uses the search method of the tmdb api to retrieve search results. While building search results listings, Sweet Potato stores the tmdb show id in a `data-id` attribute.

On click of the add button, Sweet Potato uses the tmdb show id to build another call to the tmdb api, for the specific show. From here, Sweet Potato saves title, tmdb show id, path to show poster, and an object with next episode details to the database. At this point, the show title is added to the short version of the list, and an event listener to delete the show from the list and database is added.

On the detailed list view, Sweet Potato reads from firebase, using the detailed show information to build a show listing with show title, image, human-readable next episode air date, next episode title and overview. As with the short list, an event listener is added to allow user to delete the show from the list and database.

## Future Directions/Technical hurdles
* The main technical hurdle was and is how to keep firebase keys secure without a backend (which defeats part of the purpose of using firebase in the first place)
* Near Future: Currently, there is no mechanism for the next episode air date to update once the episode has aired, so that's the very next thing to tackle.
* Near Future: Add popular shows to the page so there's something nice to look at before the user has searched.
* Near Future: Order shows by next episode air date
* Near Future: Add an at-a-glance view with just title and next episode air date
* More Future-y Future: Add user authentication
* More Future-y Future: Investigate if Firebase can handle or simulate dynamic routing, for users to be able to create multiple lists
