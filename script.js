
let currentViz = 1;
const totalViz = 5;

document.getElementById('nextBtn').addEventListener('click', () => {
    document.getElementById(`viz${currentViz}`).classList.remove('active');

    currentViz = currentViz < totalViz ? currentViz + 1 : 1;

    document.getElementById(`viz${currentViz}`).classList.add('active');
});
