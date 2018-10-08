const mediaHandler = {
  init() {
    return this.observeImages(this.lazyImages);
  },
  observeImages(images) {
    if ('IntersectionObserver' in window) {
      const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.srcset = lazyImage.dataset.srcset;
            lazyImage.parentNode.classList.remove('lazy-img');
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });

      images.forEach((lazyImage) => {
        lazyImageObserver.observe(lazyImage);
      });

    } else {
      console.error('IntersectionObserver is not supported!');
    }
  },
  get lazyImages() {
    return Array.from(document.querySelectorAll('.lazy-img img'));
  }
};

export default mediaHandler;