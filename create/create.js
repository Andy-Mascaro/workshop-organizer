import { checkAuth, logout, getWorkshops, createPartaker } from '../fetch-utils.js';



const logoutButton = document.getElementById('logout');
const form = document.querySelector('.partaker-form');

form.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(form);
    const workshopId = formData.get('workshop-id');
    const name = formData.get('partaker-name');
    await createPartaker({ name: name, workshop_id: workshopId });

    form.reset();
});

window.addEventListener('load', async () => {
    const select = document.querySelector('select');
    const workshops = await getWorkshops();
console.log(workshops);
    for (let workshop of workshops) {
        const option = document.createElement('option');

        option.value = workshop.id;
        option.textContent = workshop.name;

        select.append(option);
    }
});

checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
