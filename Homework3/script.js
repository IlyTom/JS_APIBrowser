let likeCount = localStorage.getItem('likeCount') || 0;  
const countElement = document.getElementById('count');  
const photoElement = document.getElementById('photo');  
const photographerElement = document.getElementById('photographer');  
const likeButton = document.getElementById('likeButton');  
const keyInput = document.getElementById('key');  

// Устанавливаем начальное количество лайков  
countElement.innerText = likeCount;  

// Получение случайного фото  
async function fetchRandomPhoto(accessKey) {  
    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`);  
    const data = await response.json();  

    photoElement.src = data.urls.regular;  
    photographerElement.innerText = `Автор: ${data.user.name}`;  
}  

// Увеличение счетчика при нажатии на кнопку  
likeButton.addEventListener('click', () => {  
    likeCount++;  
    countElement.innerText = likeCount;  
    localStorage.setItem('likeCount', likeCount);  
});  

// Обработчик нажатия на Enter или иконку кнопки  
keyInput.addEventListener('keyup', (event) => {  
    if (event.key === 'Enter') {  
        const accessKey = keyInput.value.trim();  
        if (accessKey) {  
            fetchRandomPhoto(accessKey);  
        }  
    }  
});  