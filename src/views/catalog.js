import { getAllSongs } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const allSongsTemplate = (songs) => html`
<section id="catalogPage">
    <h1>All Songs</h1>

    ${songs.length == 0 
    ? html`<p>No Songs in Catalog!</p>`
    : html`${songs.map(songCard)}`} 
    
</section>`;

const songCard = (song) => html`
<div class="card-box">
    <img src=${song.imgUrl}>
    <div>
        <div class="text-center">
            <p class="artist">Artist: <span style="color: white">${song.artist}</span></p>
            <p class="name">Song: <span style="color: white">${song.name}</span></p>
            <p class="genre">Genre: <span style="color: white">${song.genre}</span></p>
            <p class="year">Year: <span style="color: white">${song.year}</span></p>
            <!-- <p class="btn-group"><a href=${song.playUrl}>Play</a></p> -->
            <iframe width="280" height="155" src="https://www.youtube.com/embed/${song.playUrl.split('=')[1]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        ${getUserData()
          ? html`<div class="btn-group"><a href="/details/${song.objectId}" id="details">Details</a></div>`
          : null} 
    </div>
</div>`;

export async function allSongsPage(ctx) {

    const songsRequest = await getAllSongs();

    let songs = songsRequest.results.sort((a,b) => b.updatedAt.localeCompare(a.updatedAt));

    // console.log(songs);

    ctx.render(allSongsTemplate(songs));
};