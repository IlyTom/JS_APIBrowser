const images = [  
    './img/img1.jpg',  
    './img/img2.jpg',  
    './img/img3.png'   
];  

let currentIndex = 0;  

const slide = document.getElementById('slide');  
const dots = document.querySelectorAll('.dot');  

function updateSlide() {  
    slide.src = images[currentIndex];  
    dots.forEach((dot, index) => {  
        dot.classList.toggle('active', index === currentIndex);  
    });  
}  

document.getElementById('prev').addEventListener('click', () => {  
    currentIndex = (currentIndex - 1 + images.length) % images.length;  
    updateSlide();  
});  

document.getElementById('next').addEventListener('click', () => {  
    currentIndex = (currentIndex + 1) % images.length;  
    updateSlide();  
});  

dots.forEach(dot => {  
    dot.addEventListener('click', (e) => {  
        currentIndex = parseInt(e.target.getAttribute('data-index'));  
        updateSlide();  
    });  
});  

  
updateSlide();