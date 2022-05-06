import { html } from "../lib.js";

const homeTemplate = () => html`
<section id="welcomePage">
    <div id="welcome-message">
        <h1>Welcome to Petar Peev</h1>
        <h1>Music Application !!!</h1>
    </div>

    <div class="music-img">
        <img src="../images/sexy-dj.jpg">
    </div>
</section>`;

export async function homePage(ctx) {

    ctx.render(homeTemplate());
};