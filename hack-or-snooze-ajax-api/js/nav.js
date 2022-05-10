"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

/** Handling the submission of the new story form. */
function navStorySubmit(evt) {
  console.debug("navStorySubmit", evt);
  hidePageComponents();
  $allStoriesList.show();
  $submitForm.show();
}

$navStorySubmit.on("click", navStorySubmit);

function navFavorites(evt) {
  console.debug("navFavorites", evt);
  hidePageComponents();
  putFavoritesOnPage();
}

$body.on("click", "#nav-favorites", navFavorites);

function navUserStories(evt) {
  console.debug("navUserStories", evt);
  hidePageComponents();
  putUserStoriesOnPage();
  $ownStories.show();
}

$body.on("click", "#nav-user-submitted", navUserStories);

function navProfile(evt) {
  console.debug("navProfile");
  hidePageComponents();
  $userProfile.show();
}

$navUserProfile.on("click", navProfile);