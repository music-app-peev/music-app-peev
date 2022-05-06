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
            <p class="artist">Artist: ${song.artist}</p>
            <p class="name">Song Name: ${song.name}</p>
            <p class="genre">Genre: ${song.genre}</p>
            <p class="year">Song Year: ${song.year}</p>
            <p class="btn-group"><a href=${song.playUrl}>Play</a></p>
        </div>
        ${getUserData()
          ? html`<div class="btn-group"><a href="/details/${song.objectId}" id="details">Details</a></div>`
          : null} 
    </div>
</div>`;

export async function allSongsPage(ctx) {

    const songs = await getAllSongs();

    console.log(songs);

    ctx.render(allSongsTemplate(songs.results));
};