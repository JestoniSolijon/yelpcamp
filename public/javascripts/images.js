function previewMultiple(event) {
    const images = document.getElementById("image");
    for (i = 0; i < images.files.length; i++) {
        const urls = URL.createObjectURL(event.target.files[i]);
        document.getElementById("formFile").innerHTML += '<img src="' + urls + '">';
        document.getElementById('img-filename').innerHTML += `<span>${images.files[i].name} </span>`
    }
}