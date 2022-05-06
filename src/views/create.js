import { createSong } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const createTemplate = (onSubmit) => html`
<section class="createPage">
    <form @submit=${onSubmit}>
        <fieldset>
            <legend>Add Song</legend>
            <div class="container">
                <label for="name" class="vhide">Song name</label>
                <input id="name" name="name" class="name" type="text" placeholder="Song name">

                <label for="artist" class="vhide">Artist</label>
                <input id="artist" name="artist" class="artist" type="text" placeholder="Artist">

                <label for="year" class="vhide">Release date</label>
                <input id="year" name="year" class="year" type="text" placeholder="Year">

                <label for="genre" class="vhide">Genre</label>
                <input id="genre" name="genre" class="genre" type="text" placeholder="Genre">

                <label for="imgUrl" class="vhide">Image Url</label>
                <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" placeholder="Image Url">

                <label for="playUrl" class="vhide">Song Url</label>
                <input id="playUrl" name="playUrl" class="playUrl" type="text" placeholder="Song Url">

                <label for="description" class="vhide">Description</label>
                <textarea name="description" class="description" placeholder="Description"></textarea>

                <button class="add-album" type="submit">Add New Song</button>
            </div>
        </fieldset>
    </form>
</section>`;

export async function createPage(ctx) {

    ctx.render(createTemplate(onSubmit));
    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const name = formData.get('name').trim();
        const artist = formData.get('artist').trim();
        const year = formData.get('year').trim();
        const genre = formData.get('genre').trim();
        const imgUrl = formData.get('imgUrl').trim();
        const playUrl = formData.get('playUrl').trim();
        const description = formData.get('description').trim();

        if (name == "" || imgUrl == "" || year == "" || artist == "" || genre == "" || playUrl == "") {
            return alert('All fields are required!');
        };

        const userData = getUserData();
        const ownerId = userData.id

        await createSong({
            name,
            artist,
            year,
            genre,
            imgUrl,
            playUrl,
            description,
            ownerId
        });
        ctx.updateUserNav();

        ctx.page.redirect('/catalog');
    };
};