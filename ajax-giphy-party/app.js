const $searchInput = $("#searchBar");
const $gifs = $("#gifs");

function gifAdd(response) {
    let resultLength = response.data.length;
    if (resultLength) {
        let randIdx = Math.floor(Math.random() * resultLength);
        let $newColumn = $("<div>", { class: "column" });
        let $newGif = $("<img>", { src: response.data[randIdx].images.original.url, class: "gif" });

        $newColumn.append($newGif);
        $gifs.append($newColumn);
    };
};

$("form").on("submit", async function (e) {
    e.preventDefault();
    let gifSearch = $searchInput.val();
    $searchInput.val("");

    const response = await axios.get("http://api.giphy.com/v1/gifs/search", { params: { q: gifSearch, api_key: "LMJSvS2XQNHMJI7lsMKARUiAxI8T4y5g" } });
    gifAdd(response.data);
});

$("#resetButton").on("click", function () {
    $gifs.empty();
});