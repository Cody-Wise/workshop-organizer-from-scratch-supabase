import { checkAuth, createParticipant, getWorkshops, logout } from '../fetch-utils.js';

const selectEl = document.querySelector('select');
const formEl = document.querySelector('form');



checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

formEl.addEventListener('submit', async (e) => {
    e.preventDefault();


    const data = new FormData(formEl);

    await createParticipant(data.get('name'), data.get('workshop_id'));
    formEl.reset();

    
});


window.addEventListener('load', async () => {

    const workshops = await getWorkshops();

    for (let workshop of workshops){
        const workshopNames = document.createElement('option');
        workshopNames.textContent = workshop.topic;
        workshopNames.value = workshop.id;

        selectEl.append(workshopNames);

    }
    
});



