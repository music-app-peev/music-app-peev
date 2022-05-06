import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllSongs() {
    return api.get('/classes/Songs');
};

export async function createSong(song) {
    return api.post('/classes/Songs', song);
};

export async function getSongById(id) {
    return api.get(`/classes/Songs?where={"objectId": "${id}"}`);
};

export async function editSong(id, song) {
    return api.put('/classes/Songs/' + id, song);
};

export async function deleteSong(id) {
    return api.del('/classes/Songs/' + id);
};

export async function searchSong(query) {
    // return api.get(`/data/albums?where=name%20LIKE%20%22${query}%22`);
};

