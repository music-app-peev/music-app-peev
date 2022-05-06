import { searchSong } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const searchTemplate = (onSearch) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired song's name">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>

</section>`;

const searchingTemp = (songs, onSearch) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired song's name">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>

    ${songs.length == 0 
    ? html`<p class="no-result">No result.</p>`
    : html`${songs.map(albumCard)}`}

</section>`;

const albumCard = (song) => html`
<!--Show after click Search button-->
<div class="search-result">
    <!--If have matches-->
    <div class="card-box">
        <img src=${song.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${song.name}</p>
                <p class="artist">Artist: ${song.artist}</p>
                <p class="genre">Genre: ${song.genre}</p>
                <p class="price">Price: $${song.price}</p>
                <p class="date">Release Date: ${song.releaseDate}</p>
            </div>
            ${getUserData()
          ? html`<div class="btn-group"><a href="/details/${song.id}" id="details">Details</a></div>`
          : null} 
        </div>
    </div>
</div>`;

export async function searchPage(ctx) {

    ctx.render(searchTemplate(onSearch));

  async  function onSearch(event) {

        const search = document.getElementById('search-input').value.trim();
        // console.log(search);

        if (search == "") {
            return alert('Empty input');
        } else {
            const songs = await searchSong(search);
            // console.log(albums);

            ctx.render(searchingTemp(songs, onSearch));
        };
    };
};