"use strict";

const $showsList = $("#shows-list");
const $episodesList = $("#episodes-list");
const $episodesArea = $("#episodes-area");
const $queryForm = $("#search-form");
const missing_url = "https://tinyurl.com/missing-tv";


//searching for shows by term and populating the show list area.


async function getShowsByTerm(term) {
  const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${term}`);

  let shows = response.data.map(info => {
    let show = info.show;
    return {
      id: show.id,
      name: show.name,
      summary: show.summary,
      image: show.image ? show.image.medium : missing_url,
    };
  });

  return shows;
};

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media" data-show-id="${show.id}">
           <img 
              src="${show.image}" 
              class="show-img">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div class="summary"><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>  
       </div>
      `);

    $showsList.append($show);
  }
}

async function searchForShowAndDisplay() {
  const term = $("#search-query").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$queryForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});

//getting episodes of the selected show and populating the info in the episodes list area.

async function getEpisodesOfShow(id) {
  const response = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`);

  return response.data.map(e => ({
    id: e.id,
    name: e.name,
    season: e.season,
    number: e.number,
  }));
}

function populateEpisodes(episodes) {
  $episodesList.empty();

  for (let episode of episodes) {
    const $episode = $(
      `<li>
      ${episode.name}
      (season ${episode.season}, episode ${episode.number})
      </li>`
    );

    $episodesList.append($episode);
  };

  $episodesArea.show();
};

async function searchEpisodesAndDisplay(e) {
  const showId = $(e.target).closest(".Show").data("show-id");
  const episodes = await getEpisodesOfShow(showId);
  populateEpisodes(episodes);
}

$showsList.on("click", ".Show-getEpisodes", searchEpisodesAndDisplay);
