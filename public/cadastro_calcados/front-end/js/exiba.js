
document.querySelectorAll('.foto__input').forEach(inputElement => {
    inputElement.addEventListener('change', event => {
        const file = event.target.files[0];
        const previewElement = inputElement.getAttribute('data-index') == '1' ? document.getElementById('preview-image') : document.getElementById('preview-image-3d');

        if (file) {
            const reader = new FileReader();

            reader.onload = e => {
                previewElement.style.backgroundImage = `url('${e.target.result}')`;
                previewElement.style.backgroundSize = 'cover';
                previewElement.style.color = 'transparent';
            };

            reader.readAsDataURL(file);
        }
    });
});

