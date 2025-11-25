// Three.js effects for floating 3D elements

document.addEventListener('DOMContentLoaded', function() {
    // Check if Three.js is available
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded, skipping 3D effects');
        return;
    }
    
    // Initialize Three.js scene
    let scene, camera, renderer;
    let geometry, material, mesh;
    let objects = [];
    
    init();
    animate();
    
    function init() {
        const container = document.getElementById('threejs-container');
        
        if (!container) return;
        
        // Scene
        scene = new THREE.Scene();
        
        // Camera
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
        
        // Renderer
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0); // Transparent background
        container.appendChild(renderer.domElement);
        
        // Create floating geometries
        createFloatingElements();
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
        
        // Handle window resize
        window.addEventListener('resize', onWindowResize);
        
        // Mouse interaction
        document.addEventListener('mousemove', onMouseMove);
    }
    
    function createFloatingElements() {
        // Create various jewellery-inspired shapes
        const geometries = [
            new THREE.RingGeometry(0.3, 0.5, 32),
            new THREE.SphereGeometry(0.4, 32, 32),
            new THREE.TorusGeometry(0.5, 0.2, 16, 100),
            new THREE.OctahedronGeometry(0.4, 0),
            new THREE.ConeGeometry(0.3, 0.6, 32)
        ];
        
        const colors = [0xd4af37, 0xc19a6b, 0xf0e6d2, 0xe5e5e5, 0xffd700];
        
        for (let i = 0; i < 15; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            material = new THREE.MeshPhongMaterial({
                color: color,
                shininess: 100,
                transparent: true,
                opacity: 0.6
            });
            
            mesh = new THREE.Mesh(geometry, material);
            
            // Random position
            mesh.position.x = (Math.random() - 0.5) * 20;
            mesh.position.y = (Math.random() - 0.5) * 20;
            mesh.position.z = (Math.random() - 0.5) * 10;
            
            // Random rotation
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;
            
            // Store initial positions for floating animation
            mesh.userData = {
                initialX: mesh.position.x,
                initialY: mesh.position.y,
                initialZ: mesh.position.z,
                speedX: (Math.random() - 0.5) * 0.002,
                speedY: (Math.random() - 0.5) * 0.002,
                speedZ: (Math.random() - 0.5) * 0.002,
                rotationSpeedX: (Math.random() - 0.5) * 0.01,
                rotationSpeedY: (Math.random() - 0.5) * 0.01
            };
            
            scene.add(mesh);
            objects.push(mesh);
        }
    }
    
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    function onMouseMove(event) {
        // Parallax effect based on mouse position
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
        objects.forEach((object, index) => {
            // Subtle movement based on mouse position
            object.position.x = object.userData.initialX + mouseX * 2;
            object.position.y = object.userData.initialY + mouseY * 2;
        });
    }
    
    function animate() {
        requestAnimationFrame(animate);
        
        // Animate objects
        objects.forEach(object => {
            // Floating animation
            object.position.x += Math.sin(Date.now() * 0.001 + object.userData.initialX) * 0.001;
            object.position.y += Math.cos(Date.now() * 0.001 + object.userData.initialY) * 0.001;
            
            // Rotation
            object.rotation.x += object.userData.rotationSpeedX;
            object.rotation.y += object.userData.rotationSpeedY;
        });
        
        renderer.render(scene, camera);
    }
});