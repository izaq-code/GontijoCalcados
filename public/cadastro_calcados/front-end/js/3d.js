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



document.addEventListener('DOMContentLoaded', function() {
    function handleImagePreview(inputId, previewId) {
        const input = document.getElementById(inputId);
        const preview = document.getElementById(previewId);
        const previewImg = preview.querySelector('img');

        input.addEventListener('change', () => {
            const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    previewImg.src = reader.result;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else {
                preview.style.display = 'none';
            }
        });
    }

    function handle3DFilePreview(inputId, previewId) {
        const input = document.getElementById(inputId);
        const preview = document.getElementById(previewId);
        const previewText = preview.querySelector('p');
        
        input.addEventListener('change', () => {
            const file = input.files[0];
            if (file) {
                previewText.textContent = file.name;
                preview.style.display = 'block';
                // Adicione lógica para carregar e exibir o arquivo 3D, se necessário
            } else {
                previewText.textContent = 'Nenhum arquivo 3D selecionado';
                preview.style.display = 'none';
            }
        });
    }

    handleImagePreview('input-imagem-calcado', 'image-preview-calcado');
    handle3DFilePreview('input-imagem-3d-calcado', 'file-preview-3d');
});

