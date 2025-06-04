// Three.js Blob Animation
let scene, camera, renderer, blob;
let animationFrameId;

function init() {
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    document.body.appendChild(renderer.domElement);
    
    // Create blob geometry
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.8,
        shininess: 100
    });
    
    blob = new THREE.Mesh(geometry, material);
    scene.add(blob);
    
    // Add lighting
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    // Start animation
    animate();
}

function animate() {
    animationFrameId = requestAnimationFrame(animate);
    
    // Animate blob
    if (blob) {
        blob.rotation.x += 0.01;
        blob.rotation.y += 0.01;
        blob.scale.x = 1 + Math.sin(Date.now() * 0.001) * 0.2;
        blob.scale.y = 1 + Math.sin(Date.now() * 0.001) * 0.2;
        blob.scale.z = 1 + Math.sin(Date.now() * 0.001) * 0.2;
    }
    
    renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Clean up function
function cleanup() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    if (renderer) {
        renderer.dispose();
        document.body.removeChild(renderer.domElement);
    }
}

// Initialize on load
window.addEventListener('load', init);
window.addEventListener('resize', onWindowResize);
window.addEventListener('unload', cleanup); 