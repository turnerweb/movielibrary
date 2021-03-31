//open sidebar 

const label = document.querySelector('.sidebar__label');

label.addEventListener('click', (e) => {
    e.target.classList.toggle('sidebar__label--open');
    document.querySelector('.sidebar').classList.toggle('sidebar--open');
});