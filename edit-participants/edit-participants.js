import { checkAuth, getWorkshops, logout, editParticipant, getParticipants } from '../fetch-utils.js';

const selectEl = document.querySelector('select');
const formEl = document.querySelector('form');
const nameInput = document.querySelector('#nameinput');


const params = new URLSearchParams(window.location.search);



checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

formEl.addEventListener('submit', async (e) => {
    e.preventDefault();


    const data = new FormData(formEl);

    await editParticipant(params.get('id'), data.get('name'), data.get('workshop_id'));
    window.location.href = '../workshops';


    
});


window.addEventListener('load', async () => {

    const workshops = await getWorkshops();
    const participant = await getParticipants(params.get('id'));

    console.log(params.get('id'));


    nameInput.value = participant.name;



    for (let workshop of workshops){
        const workshopNames = document.createElement('option');
        workshopNames.textContent = workshop.topic;
        workshopNames.value = workshop.id;

        selectEl.append(workshopNames);

        if (workshop.id === participant.workshop_id){
            workshopNames.selected = true;


        }

    }
    
});



