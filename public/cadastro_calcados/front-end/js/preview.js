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
    const container = document.getElementById('threejs-container');
    let scene, camera, renderer, loader;

    function initThreeJS() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

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
            previewText.textContent = `Arquivo 3D selecionado: ${file.name}`;
            preview.style.display = 'block';

            const url = URL.createObjectURL(file);
            loader = new THREE.GLTFLoader();
            loader.load(url, (gltf) => {
                scene.clear(); // Clear previous content
                scene.add(gltf.scene);
                camera.position.set(0, 1, 3); // Ajuste a posição da câmera conforme necessário
                URL.revokeObjectURL(url);
            });
        } else {
            previewText.textContent = 'Nenhum arquivo 3D selecionado';
            preview.style.display = 'none';
        }
    });
}

handleImagePreview('input-imagem-calcado', 'image-preview-calcado');
handle3DFilePreview('input-imagem-3d-calcado', 'file-preview-3d');
