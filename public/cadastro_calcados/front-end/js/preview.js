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

        handleImagePreview('input-imagem-calcado', 'image-preview-calcado');
        handleImagePreview('input-imagem-3d-calcado', 'image-preview-3d');



