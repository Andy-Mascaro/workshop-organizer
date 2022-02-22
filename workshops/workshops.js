import { checkAuth, deletePartaker, getWorkshops, logout } from '../fetch-utils.js';

checkAuth();

const workshopsEl = document.querySelector('.workshops-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', ()=> {
    logout();
});

async function displayWorkshops(workshops) {
    workshopsEl.textContent = '';
    // const workshops = await getWorkshops();

    for (let workshop of workshops) {
        const workshopEl = document.createElement('div');
        const nameEl = document.createElement('h3');
        const partakersEl = document.createElement('div');

        partakersEl.classList.add('partakers');
        workshopEl.classList.add('family');

        nameEl.textContent = workshop.name;

        for (let partaker of workshop.partakers) {
            const partakerEl = document.createElement('div');

            partakerEl.classList.add('partaker');
            partakerEl.textContent = partaker.name;

            partakerEl.addEventListener('click', async () => {
                await deletePartaker(partaker.id);

                const updateWorkshops = await getWorkshops();
                displayWorkshops(updateWorkshops);
            });
            partakersEl.append(partakerEl);
        }

        workshopEl.append(nameEl, partakersEl);
        workshopsEl.append(workshopEl);

    }


}

window.addEventListener('load', async () => {
    const workshops = await getWorkshops();

    displayWorkshops(workshops);
});
