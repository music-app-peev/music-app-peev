import { searchSong } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const searchTemplate = (onSearch) => html`
<section id="searchPage">
    <h1>Search by Artist Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired song's name">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>

</section>`;

const searchingTemp = (songs, onSearch) => html`
<section id="searchPage">
    <h1>Search by Artist Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired song's name">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>

    ${songs.length == 0 
    ? html`<p class="no-result"><h2>No results !!!</h2></p>`
    : html`${songs.map(songCard)}`}

</section>`;

const songCard = (song) => html`
<!--Show after click Search button-->
<div class="search-result">
    <!--If have matches-->
    <div class="card-box">
        <img src=${song.imgUrl}>
        <div>
            <div class="text-center">
            <div class="text-center">
            <p class="artist">Artist: <span style="color: white">${song.artist}</span></p>
            <p class="name">Song Name: <span style="color: white">${song.name}</span></p>
            <p class="genre">Genre: <span style="color: white">${song.genre}</span></p>
            <p class="year">Song Year: <span style="color: white">${song.year}</span></p>
            <iframe width="280" height="155" src="https://www.youtube.com/embed/${song.playUrl.split('=')[1]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
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
        console.log(search);

        if (search == "") {
            return alert('Empty input');
        } else {
            const songs = await searchSong(search);
            
            console.log(songs);

            ctx.render(searchingTemp(songs.results, onSearch));
        };
    };
};