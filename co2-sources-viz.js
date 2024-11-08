
const canvas = document.getElementById('viz1Canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth - 600, window.innerHeight - 400 );
document.body.appendChild(renderer.domElement);
const viz1Div = document.getElementById('viz1');
viz1Div.appendChild(canvas);

renderer.setClearColor(0xffffff, 1); 


window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const emissionSources = [
    { name: 'Electricity & Heat', percentage: 0.31, color: 0xff5733 },
    { name: 'Agriculture', percentage: 0.11, color: 0x33ff57 },
    { name: 'Transportation', percentage: 0.15, color: 0x3375ff },
    { name: 'Forestry', percentage: 0.06, color: 0xff33a6 },
    { name: 'Manufacturing', percentage: 0.12, color: 0xff9933 },
];

const bubbles = [];
const bubbleGeometry = new THREE.SphereGeometry(0.5, 32, 32);

emissionSources.forEach(source => {
    const bubbleCount = Math.floor(source.percentage * 1000);

    for (let i = 0; i < bubbleCount; i++) {
        const bubbleMaterial = new THREE.MeshBasicMaterial({
            color: source.color,
            transparent: true,
            opacity: 0.8
        });

        const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
        bubble.position.set(
            (Math.random() - 0.5) * 20,  // More centered in the scene
            Math.random() * 10 - 0.2,      // Slight random height
            (Math.random() - 0.5) * 20   // More centered in the scene
        );
        bubble.scale.set(source.percentage + 0.5, source.percentage + 0.5, source.percentage + 0.5);

        bubble.userData = {
            moveDirection: new THREE.Vector3(
                (Math.random() - 0.5) * 0.01, // Small random movement in x
                (Math.random() - 0.5) * 0.01, // Small random movement in y
                (Math.random() - 0.5) * 0.01  // Small random movement in z
            ),
            speed: 0.002 + source.percentage * 0.002 
        };

        scene.add(bubble);
        bubbles.push(bubble);
    }
});

camera.position.set(0, 5, 20);

function animate() {
    requestAnimationFrame(animate);

    bubbles.forEach(bubble => {
        bubble.position.add(bubble.userData.moveDirection.multiplyScalar(bubble.userData.speed));

        if (bubble.position.x > 5 || bubble.position.x < -5) {
            bubble.userData.moveDirection.x = -bubble.userData.moveDirection.x; 
        }
        if (bubble.position.y > 5 || bubble.position.y < -5) {
            bubble.userData.moveDirection.y = -bubble.userData.moveDirection.y; 
        }
        if (bubble.position.z > 5 || bubble.position.z < -5) {
            bubble.userData.moveDirection.z = -bubble.userData.moveDirection.z; 
        }
    });

    scene.rotation.y += 0.001;

    renderer.render(scene, camera);
}

animate();
