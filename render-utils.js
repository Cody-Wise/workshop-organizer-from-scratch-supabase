export function renderWorkshop(workshop){

    const workshopsEl = document.createElement('div');
    const topicEl = document.createElement('h3');


    workshopsEl.classList.add('workshops');

    topicEl.textContent = workshop.topic;

    workshopsEl.append(topicEl);

    for (let participant of workshop.participants){
        const participantlink = document.createElement('a');

        participantlink.classList.add('participant-link');

        participantlink.textContent = participant.name;

        participant.href = `../edit-participant/?id=${participant.id}`;

        workshopsEl.append(participantlink);


    }

    return workshopsEl;

}