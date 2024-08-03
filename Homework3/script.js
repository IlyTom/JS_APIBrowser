let likeCount = localStorage.getItem('likeCount') || 0;  
let photoHistory = JSON.parse(localStorage.getItem('photoHistory')) || [];  
const countElement = document.getElementById('count');  
const photoElement = document.getElementById('photo');  
const photographerElement = document.getElementById('photographer');  
const likeButton = document.getElementById('likeButton');  
const keyInput = document.getElementById('key');  
const historyElement = document.createElement('div');  

// Устанавливаем начальное количество лайков  
countElement.innerText = likeCount;  
historyElement.innerHTML = '<h2>История просмотров</h2>';  
document.body.appendChild(historyElement);  

// Функция для отображения истории  
function displayPhotoHistory() {  
    historyElement.innerHTML = '<h2>История просмотров</h2>';  
    photoHistory.forEach(photo => {  
        const img = document.createElement('img');  
        img.src = photo.urls.thumb; // Для уменьшенной версии  
        img.alt = `Автор: ${photo.user.name}`;  
        img.style.width = '100px';  
        img.style.margin = '5px';  
        historyElement.appendChild(img);  
    });  
}  

// Получение случайного фото  
async function fetchRandomPhoto(accessKey) {  
    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`);  
    const data = await response.json();  

    photoElement.src = data.urls.regular;  
    photographerElement.innerText = `Автор: ${data.user.name}`;  

    // Сохраняем в историю, если фото не было ранее  
    if (!photoHistory.some(photo => photo.id === data.id)) {  
        photoHistory.push(data);  
        localStorage.setItem('photoHistory', JSON.stringify(photoHistory));  
        displayPhotoHistory();  
    }  
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

// Отображаем историю загрузки при загрузке страницы  
displayPhotoHistory();