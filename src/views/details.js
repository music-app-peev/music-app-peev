import { deleteSong, getSongById } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (song, isOwner, onDelete) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src=${song.imgUrl}>
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h2>Artist: ${song.artist}</h3>
                <h1>Song: ${song.name}</h1>
                <h4>Year: ${song.year}</h4>
                <h4>Genre: $${song.genre}</h4>
                <h4>Song URL: <a>${song.playUrl}</h4>
                <!-- <p>Description: ${song.description}</p> -->
            </div>
            <!-- Only for registered user and creator of the album-->
            ${isOwner ? html`
            <div class="actionBtn">
                <a href="/edit/${song.objectId}" class="edit">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
            </div>`
               : null}
        </div>
    </div>
</section>`;


export async function detailsPage(ctx) {

    const song = await getSongById(ctx.params.id);
    // console.log(song.results[0]);
    const userData = getUserData();

    const isOwner = userData && userData.id == song.results[0].ownerId;

    ctx.render(detailsTemplate(song.results[0], isOwner, onDelete));

    async function onDelete() {
        const choice = confirm(`Are You Sure You Want To Delete "${song.results[0].name}" ?`);
        if (choice) {
            await deleteSong(ctx.params.id);
            ctx.page.redirect('/catalog');
        };
    };
};