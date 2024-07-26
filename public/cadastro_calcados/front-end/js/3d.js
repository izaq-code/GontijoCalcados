function handle3DFilePreview(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    const container = document.getElementById('threejs-container');
    let scene, camera, renderer, loader;

    // Initialize Three.js
    function initThreeJS() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
        camera.position.z = 5;

        const animate = function () {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();
    }

    initThreeJS();

    input.addEventListener('change', () => {
        const file = input.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            loader = new THREE.GLTFLoader();
            loader.load(url, (gltf) => {
                scene.clear(); // Clear previous content
                scene.add(gltf.scene);
                URL.revokeObjectURL(url);
                preview.style.display = 'block';
            });
        } else {
            preview.style.display = 'none';
        }
    });
}

handle3DFilePreview('input-imagem-3d-calcado', 'file-preview-3d');
