// Состояние приложения
const state = {
    currentFilter: 'all',
    currentView: 'grid',
    isLoading: true,
    images: []
};

// Unsplash API ключ (публичный, для демо)
const UNSPLASH_ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE'; // Замените на свой ключ или оставьте для демо

// Коллекции Unsplash по категориям
const UNSPLASH_COLLECTIONS = {
    nature: '1257282',      // Природа
    architecture: '317099',  // Архитектура
    abstract: '1114848'     // Абстракция
};

// Демо-данные (если API не работает)
const DEMO_IMAGES = {
    nature: [
        {
            id: 'nature1',
            title: 'Горный пейзаж',
            description: 'Снежные вершины гор на закате. Природа в своем величии.',
            category: 'nature',
            date: '2024-03-15',
            urls: {
                regular: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&fit=crop',
                small: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&fit=crop'
            },
            user: { name: 'John Doe' }
        },
        {
            id: 'nature2',
            title: 'Лесная тропа',
            description: 'Тропинка, ведущая вглубь соснового леса.',
            category: 'nature',
            date: '2024-03-08',
            urls: {
                regular: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&fit=crop',
                small: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&fit=crop'
            },
            user: { name: 'Jane Smith' }
        },
        {
            id: 'nature3',
            title: 'Озеро в горах',
            description: 'Кристально чистая вода горного озера.',
            category: 'nature',
            date: '2024-03-01',
            urls: {
                regular: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&fit=crop',
                small: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&fit=crop'
            },
            user: { name: 'Mike Johnson' }
        },
        {
            id: 'nature4',
            title: 'Водопад',
            description: 'Мощный водопад в тропическом лесу.',
            category: 'nature',
            date: '2024-02-20',
            urls: {
                regular: 'https://images.unsplash.com/photo-1512273222628-4daea6e55abb?w=800&fit=crop',
                small: 'https://images.unsplash.com/photo-1512273222628-4daea6e55abb?w=400&fit=crop'
            },
            user: { name: 'Anna Wilson' }
        }
    ],
    architecture: [
        {
            id: 'arch1',
            title: 'Современная архитектура',
            description: 'Стеклянный небоскреб в деловом районе города.',
            category: 'architecture',
            date: '2024-03-10',
            urls: {
                regular: 'https://images.unsplash.com/photo-1487956382158-bb926046304a?w=800&fit=crop',
                small: 'https://images.unsplash.com/photo-1487956382158-bb926046304a?w=400&fit=crop'
            },
            user: { name: 'Robert Brown' }
        },
        {
            id: 'arch2',
            title: 'Старинный мост',
            description: 'Каменный мост через реку, построенный в XIX веке.',
            category: 'architecture',
            date: '2024-03-05',
            urls: {
                regular: 'https://images.unsplash.com/photo-1500316124030-4cffa46f10f0?w=800&fit=crop',
                small: 'https://images.unsplash.com/photo-1500316124030-4cffa46f10f0?w=400&fit=crop'
            },
            user: { name: 'Emily Davis' }
        },
        {
            id: 'arch3',
            title: 'Модерн библиотека',
            description: 'Современная библиотека с открытым пространством.',
            category: 'architecture',
            date: '2024-02-28',
            urls: {
                regular: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&fit=crop',
                small: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&fit=crop'
            },
            user: { name: 'Thomas Miller' }
        },
        {
            id: 'arch4',
            title: 'Оперный театр',
            description: 'Знаменитое архитектурное сооружение с уникальной крышей.',
            category: 'architecture',
            date: '2024-02-18',
            urls: {
                regular: 'https://images.unsplash.com/photo-1547821066-9e5c9c8b0c6d?w=800&fit=crop',
                small: 'https://images.unsplash.com/photo-1547821066-9e5c9c8b0c6d?w=400&fit=crop'
            },
            user: { name: 'Sarah Taylor' }
        }
    ],
    abstract: [
        {
            id: 'abs1',
            title: 'Абстрактная композиция',
            description: 'Геометрические формы и градиентные переходы.',
            category: 'abstract',
            date: '2024-03-12',
            urls: {
                regular: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=800&fit=crop',
                small: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&fit=crop'
            },
            user: { name: 'David Wilson' }
        },
        {
            id: 'abs2',
            title: 'Цифровой арт',
            description: 'Футуристическая абстракция с элементами кода.',
            category: 'abstract',
            date: '2024-03-14',
            urls: {
                regular: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&fit=crop',
                small: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&fit=crop'
            },
            user: { name: 'Lisa Anderson' }
        },
        {
            id: 'abs3',
            title: 'Цветовые волны',
            description: 'Плавные переходы цветов в абстрактной манере.',
            category: 'abstract',
            date: '2024-02-25',
            urls: {
                regular: 'https://images.unsplash.com/photo-1543857778-c4a1a569e1d8?w=800&fit=crop',
                small: 'https://images.unsplash.com/photo-1543857778-c4a1a569e1d8?w=400&fit=crop'
            },
            user: { name: 'James Martin' }
        },
        {
            id: 'abs4',
            title: 'Техно-арт',
            description: 'Абстракция, вдохновленная технологиями будущего.',
            category: 'abstract',
            date: '2024-02-15',
            urls: {
                regular: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&fit=crop',
                small: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&fit=crop'
            },
            user: { name: 'Karen Lee' }
        }
    ]
};

// DOM элементы
const galleryEl = document.getElementById('gallery');
const filterButtons = document.querySelectorAll('.btn-filter');
const viewButtons = document.querySelectorAll('.btn-view');
const showingCountEl = document.getElementById('showingCount');
const totalCountEl = document.getElementById('totalCount');
const resetBtn = document.getElementById('resetBtn');
const emptyStateEl = document.getElementById('emptyState');
const gridViewBtn = document.getElementById('gridViewBtn');
const listViewBtn = document.getElementById('listViewBtn');
const modalEl = document.getElementById('imageModal');
const modalCloseEl = document.getElementById('modalClose');
const modalImageEl = document.getElementById('modalImage');
const modalTitleEl = document.getElementById('modalTitle');
const modalDescriptionEl = document.getElementById('modalDescription');
const modalCategoryEl = document.getElementById('modalCategory');
const modalDateEl = document.getElementById('modalDate');

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Установим текущий год в футере
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Покажем прелоадер
    showPreloader();
    
    // Загрузим изображения
    loadImages();
    
    // Назначим обработчики событий
    setupEventListeners();
});

// Показать прелоадер
function showPreloader() {
    galleryEl.innerHTML = `
        <div class="preloader">
            <div class="loader"></div>
            <p>Загружаем фотографии из Unsplash...</p>
        </div>
    `;
}

// Загрузка изображений
async function loadImages() {
    state.isLoading = true;
    
    try {
        // Если есть ключ API - загружаем с Unsplash
        if (UNSPLASH_ACCESS_KEY !== 'YOUR_ACCESS_KEY_HERE') {
            await loadFromUnsplashAPI();
        } else {
            // Используем демо-данные
            useDemoImages();
        }
    } catch (error) {
        console.error('Ошибка загрузки изображений:', error);
        // В случае ошибки используем демо-данные
        useDemoImages();
    }
    
    state.isLoading = false;
    renderGallery();
}

// Загрузка с Unsplash API
async function loadFromUnsplashAPI() {
    const allImages = [];
    
    // Загружаем изображения для каждой категории
    for (const [category, collectionId] of Object.entries(UNSPLASH_COLLECTIONS)) {
        try {
            const response = await fetch(
                `https://api.unsplash.com/collections/${collectionId}/photos?per_page=4&client_id=${UNSPLASH_ACCESS_KEY}`
            );
            
            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
            
            const photos = await response.json();
            
            // Преобразуем данные Unsplash в наш формат
            const formattedPhotos = photos.map((photo, index) => ({
                id: `${category}${index + 1}`,
                title: getDefaultTitle(category, index),
                description: getDefaultDescription(category, index),
                category: category,
                date: getRandomDate(),
                urls: {
                    regular: photo.urls.regular,
                    small: photo.urls.small
                },
                user: { name: photo.user.name }
            }));
            
            allImages.push(...formattedPhotos);
        } catch (error) {
            console.warn(`Не удалось загрузить ${category}:`, error);
            // Добавляем демо-изображения для этой категории
            allImages.push(...DEMO_IMAGES[category]);
        }
    }
    
    state.images = allImages;
    totalCountEl.textContent = allImages.length;
}

// Использовать демо-изображения
function useDemoImages() {
    const allImages = [
        ...DEMO_IMAGES.nature,
        ...DEMO_IMAGES.architecture,
        ...DEMO_IMAGES.abstract
    ];
    
    state.images = allImages;
    totalCountEl.textContent = allImages.length;
}

// Генерация заголовков по умолчанию
function getDefaultTitle(category, index) {
    const titles = {
        nature: ['Горный пейзаж', 'Лесная тропа', 'Озеро в горах', 'Водопад'],
        architecture: ['Современная архитектура', 'Старинный мост', 'Модерн библиотека', 'Оперный театр'],
        abstract: ['Абстрактная композиция', 'Цифровой арт', 'Цветовые волны', 'Техно-арт']
    };
    
    return titles[category][index] || 'Без названия';
}

// Генерация описаний по умолчанию
function getDefaultDescription(category, index) {
    const descriptions = {
        nature: [
            'Снежные вершины гор на закате. Природа в своем величии.',
            'Тропинка, ведущая вглубь соснового леса.',
            'Кристально чистая вода горного озера.',
            'Мощный водопад в тропическом лесу.'
        ],
        architecture: [
            'Стеклянный небоскреб в деловом районе города.',
            'Каменный мост через реку, построенный в XIX веке.',
            'Современная библиотека с открытым пространством.',
            'Знаменитое архитектурное сооружение с уникальной крышей.'
        ],
        abstract: [
            'Геометрические формы и градиентные переходы.',
            'Футуристическая абстракция с элементами кода.',
            'Плавные переходы цветов в абстрактной манере.',
            'Абстракция, вдохновленная технологиями будущего.'
        ]
    };
    
    return descriptions[category][index] || 'Описание отсутствует';
}

// Генерация случайной даты
function getRandomDate() {
    const start = new Date(2024, 0, 1); // 1 января 2024
    const end = new Date(); // Сегодня
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    
    return randomDate.toISOString().split('T')[0]; // Формат YYYY-MM-DD
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Фильтры
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            setFilter(filter);
        });
    });
    
    // Переключение вида
    gridViewBtn.addEventListener('click', function() {
        setView('grid');
    });
    
    listViewBtn.addEventListener('click', function() {
        setView('list');
    });
    
    // Сброс фильтров
    resetBtn.addEventListener('click', function() {
        setFilter('all');
        setView('grid');
        
        // Сбросить активные кнопки фильтров
        filterButtons.forEach(btn => {
            if (btn.getAttribute('data-filter') === 'all') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    });
    
    // Модальное окно
    modalCloseEl.addEventListener('click', function() {
        modalEl.style.display = 'none';
    });
    
    // Закрытие модального окна по клику вне контента
    modalEl.addEventListener('click', function(e) {
        if (e.target === modalEl) {
            modalEl.style.display = 'none';
        }
    });
    
    // Закрытие по клавише ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalEl.style.display === 'flex') {
            modalEl.style.display = 'none';
        }
    });
}

// Установка фильтра
function setFilter(filter) {
    state.currentFilter = filter;
    
    // Обновить активные кнопки фильтров
    filterButtons.forEach(button => {
        if (button.getAttribute('data-filter') === filter) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    // Перерисовать галерею
    renderGallery();
}

// Установка вида
function setView(view) {
    state.currentView = view;
    
    // Обновить класс галереи
    if (view === 'list') {
        galleryEl.classList.add('list-view');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    } else {
        galleryEl.classList.remove('list-view');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    }
    
    // Перерисовать галерею
    renderGallery();
}

// Получение читаемого названия категории
function getCategoryName(category) {
    const categories = {
        'nature': 'Природа',
        'architecture': 'Архитектура',
        'abstract': 'Абстракция'
    };
    return categories[category] || category;
}

// Открытие модального окна с изображением
function openModal(image) {
    modalImageEl.src = image.urls.regular;
    modalImageEl.alt = image.title;
    modalTitleEl.textContent = image.title;
    modalDescriptionEl.textContent = image.description;
    modalCategoryEl.textContent = getCategoryName(image.category);
    
    // Форматирование даты
    const date = new Date(image.date);
    modalDateEl.textContent = date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    
    // Добавляем информацию об авторе
    if (image.user && image.user.name) {
        const authorInfo = document.createElement('p');
        authorInfo.innerHTML = `<strong>Автор:</strong> ${image.user.name}`;
        
        // Удаляем предыдущую информацию об авторе, если есть
        const existingAuthor = modalInfo.querySelector('p:last-child');
        if (existingAuthor && existingAuthor.textContent.includes('Автор')) {
            existingAuthor.remove();
        }
        
        modalInfo.appendChild(authorInfo);
    }
    
    modalEl.style.display = 'flex';
}

// Обработка ошибок загрузки изображений
function handleImageError(imgElement, image) {
    console.warn(`Не удалось загрузить изображение: ${image.urls.small}`);
    
    // Показываем заглушку
    imgElement.style.background = 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)';
    imgElement.style.display = 'flex';
    imgElement.style.alignItems = 'center';
    imgElement.style.justifyContent = 'center';
    imgElement.innerHTML = `
        <div style="text-align: center; color: #888;">
            <i class="fas fa-image" style="font-size: 2rem; margin-bottom: 10px;"></i>
            <p style="font-size: 0.9rem;">${image.title}</p>
        </div>
    `;
}

// Рендер галереи
function renderGallery() {
    // Фильтрация изображений
    const filteredImages = state.currentFilter === 'all' 
        ? state.images 
        : state.images.filter(img => img.category === state.currentFilter);
    
    // Показать/скрыть состояние "ничего не найдено"
    if (filteredImages.length === 0) {
        emptyStateEl.style.display = 'block';
        galleryEl.style.display = 'none';
    } else {
        emptyStateEl.style.display = 'none';
        galleryEl.style.display = 'grid';
    }
    
    // Обновить счетчик показанных фото
    showingCountEl.textContent = filteredImages.length;
    
    // Очистить галерею
    galleryEl.innerHTML = '';
    
    // Создать карточки для каждого изображения
    filteredImages.forEach(image => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-image-container">
                <img src="${image.urls.small}" 
                     alt="${image.title}" 
                     class="card-image loading"
                     data-regular="${image.urls.regular}"
                     onerror="handleImageError(this, ${JSON.stringify(image).replace(/"/g, '&quot;')})">
            </div>
            <div class="card-content">
                <div>
                    <h3 class="card-title">${image.title}</h3>
                    <p class="card-description">${image.description}</p>
                </div>
                <div class="card-footer">
                    <span class="card-category">${getCategoryName(image.category)}</span>
                    <button class="card-btn" data-id="${image.id}">Подробнее</button>
                </div>
            </div>
        `;
        
        // Добавить обработчик клика на кнопку "Подробнее"
        const detailBtn = card.querySelector('.card-btn');
        detailBtn.addEventListener('click', function() {
            openModal(image);
        });
        
        // Добавить обработчик клика на изображение
        const imgContainer = card.querySelector('.card-image-container');
        imgContainer.addEventListener('click', function() {
            openModal(image);
        });
        
        // Обработка загрузки изображения
        const imgElement = card.querySelector('.card-image');
        imgElement.addEventListener('load', function() {
            this.classList.remove('loading');
        });
        
        galleryEl.appendChild(card);
    });
    
    // Предзагрузка изображений в высоком качестве для модального окна
    if (!state.isLoading) {
        preloadModalImages(filteredImages);
    }
}

// Предзагрузка изображений для модального окна
function preloadModalImages(images) {
    images.forEach(image => {
        const img = new Image();
        img.src = image.urls.regular;
    });
}