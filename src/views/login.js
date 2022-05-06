import { login } from "../api/data.js";
import { html } from "../lib.js";

const loginTemplate = (onSubmit) => html`
    <section id="loginPage">
        <form @submit=${onSubmit}>
            <fieldset>
                <legend>Login</legend>
    
                <label for="username" class="vhide">Username</label>
                <input id="username" class="username" name="username" type="text" placeholder="Username">
    
                <label for="password" class="vhide">Password</label>
                <input id="password" class="password" name="password" type="password" placeholder="Password">
    
                <button type="submit" class="login">Login</button>
    
                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>`;

export async function loginPage(ctx) {

    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        // event.target.querySelector('#submitBtn').disabled = true;

        const username = formData.get('username').trim();
        const password = formData.get('password').trim();

        if (username == "" || password == "") {
            alert('All fields are required!')
            // event.target.querySelector('#submitBtn').disabled = false;
            return ctx.render(loginTemplate(onSubmit));
        };

        await login(username, password);
        ctx.updateUserNav();

        ctx.page.redirect('/');
    };
};