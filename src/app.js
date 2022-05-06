import { page } from './lib.js';
import { homePage } from './views/home.js';
import decorateContext, { updateUserNav } from "./middlewares/decorateContext.js";
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { allSongsPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { searchPage } from './views/search.js';
// import { mySongsPage } from './views/mySongs.js';

page(decorateContext);

page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalog', allSongsPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/search', searchPage);

updateUserNav();
page.start();

