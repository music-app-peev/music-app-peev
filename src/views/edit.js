import { editSong, getSongById } from "../api/data.js";
import { html } from "../lib.js";


const editTemplate = (song, onSubmit) => html`
<section class="editPage">
    <form @submit=${onSubmit}>
        <fieldset>
            <legend>Edit Song</legend>

            <div class="container">
                <label for="name" class="vhide">Song name</label>
                <input id="name" name="name" class="name" type="text" .value=${song.name}>

                <label for="artist" class="vhide">Artist</label>
                <input id="artist" name="artist" class="artist" type="text" .value=${song.artist}>

                <label for="year" class="vhide">Release date</label>
                <input id="year" name="year" class="year" type="text" .value=${song.year}>

                <label for="genre" class="vhide">Genre</label>
                <input id="genre" name="genre" class="genre" type="text" .value=${song.genre}>

                <label for="imgUrl" class="vhide">Image Url</label>
                <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" .value=${song.imgUrl}>

                <label for="playUrl" class="vhide">Song Url</label>
                <input id="playUrl" name="playUrl" class="playUrl" type="text" .value=${song.playUrl}>

                <label for="description" class="vhide">Description</label>
                <textarea name="description" class="description" .value=${song.description}></textarea>

                <button class="edit-album" type="submit">Edit Song</button>
            </div>
        </fieldset>
    </form>
</section>`;

export async function editPage(ctx) {
    const song = await getSongById(ctx.params.id);

    // console.log(song.results);

    ctx.render(editTemplate(song.results[0], onSubmit));

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

        await editSong(ctx.params.id, {
            name,
            artist,
            year,
            genre,
            imgUrl,
            playUrl,
            description
        });

        ctx.updateUserNav();

        ctx.page.redirect('/details/' + ctx.params.id);
    };
};