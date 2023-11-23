((images) => {
	images.forEach(img => img.src = img.dataset.src)
})(document.querySelectorAll('img[data-src]'))