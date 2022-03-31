import { checkAuth, getWorkshops, logout } from '../fetch-utils.js';
import { renderWorkshop } from '../render-utils.js';

checkAuth();

const workshopsListEl = document.querySelector('.workshop-list');

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});


window.addEventListener('load', async () => {

    const workshops = await getWorkshops();

    for (let workshop of workshops){

        const workshopEl = renderWorkshop(workshop);

        workshopsListEl.append(workshopEl);



    }
    
});

