// import { searchAlbum } from "../api/data.js";
// import { html } from "../lib.js";
// import { getUserData } from "../util.js";

// const searchTemplate = (onSearch) => html`
// <section id="searchPage">
//     <h1>Search by Name</h1>

//     <div class="search">
//         <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
//         <button @click=${onSearch} class="button-list">Search</button>
//     </div>

//     <h2>Results:</h2>


// </section>`;

// const searchingTemp = (albums, onSearch) => html`
// <section id="searchPage">
//     <h1>Search by Name</h1>

//     <div class="search">
//         <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
//         <button @click=${onSearch} class="button-list">Search</button>
//     </div>

//     <h2>Results:</h2>

//     ${albums.length == 0 
//     ? html`<p class="no-result">No result.</p>`
//     : html`${albums.map(albumCard)}`}

// </section>`;

// const albumCard = (album) => html`
// <!--Show after click Search button-->
// <div class="search-result">
//     <!--If have matches-->
//     <div class="card-box">
//         <img src=${album.imgUrl}>
//         <div>
//             <div class="text-center">
//                 <p class="name">Name: ${album.name}</p>
//                 <p class="artist">Artist: ${album.artist}</p>
//                 <p class="genre">Genre: ${album.genre}</p>
//                 <p class="price">Price: $${album.price}</p>
//                 <p class="date">Release Date: ${album.releaseDate}</p>
//             </div>
//             ${getUserData()
//           ? html`<div class="btn-group"><a href="/details/${album._id}" id="details">Details</a></div>`
//           : null} 
//         </div>
//     </div>
// </div>`;

// export async function searchPage(ctx) {

//     ctx.render(searchTemplate(onSearch));

//   async  function onSearch(event) {

//         const search = document.getElementById('search-input').value.trim();
//         // console.log(search);

//         if (search == "") {
//             return alert('Empty input');
//         } else {
//             const albums = await searchAlbum(search);
//             // console.log(albums);

//             ctx.render(searchingTemp(albums, onSearch));
//         };
//     };
// };