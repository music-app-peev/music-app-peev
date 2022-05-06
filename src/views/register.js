import { register } from "../api/data.js";
import { html } from "../lib.js";

const registerTemplate = (onSubmit) => html`
<section id="registerPage">
    <form @submit=${onSubmit}>
        <fieldset>
            <legend>Register</legend>

            <label for="username" class="vhide">Username</label>
            <input id="username" class="username" name="username" type="text" placeholder="Username">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <label for="conf-pass" class="vhide">Confirm Password:</label>
            <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

            <button type="submit" class="register">Register</button>

            <p class="field">
                <span>If you already have profile click <a href="/login">here</a></span>
            </p>
        </fieldset>
    </form>
</section>`;

export async function registerPage(ctx) {

    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const username = formData.get('username').trim();
        const password = formData.get('password').trim();
        const rePass = formData.get('conf-pass').trim();


        if (username == "" || password == "" || rePass == "") {
            alert('All fields are required!');
            return ctx.render(registerTemplate(onSubmit));
        };
        if (password != rePass) {
            alert('Passwords don\'t match!');
            return ctx.render(registerTemplate(onSubmit));
        };

        await register(username, password);

        ctx.updateUserNav();

        ctx.page.redirect('/');
    };
};