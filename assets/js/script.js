import confetti from 'canvas-confetti';


// ============================================================================
// БЛОК 1: ИНИЦИАЛИЗАЦИЯ ЗВУКОВЫХ ЭФФЕКТОВ
// ============================================================================
// Что делает: Создаёт два звуковых объекта для UI-интеракций
// - clickSound: проигрывается при кликах на кнопки (добавление, удаление, цена, очистка)
// - vroomSound: проигрывается при наведении мыши на карточку продукта (эффект "врум-шрум")
// Почему volume = 0.5: Чтобы звук ховера не был слишком резким и не раздражал пользователя
// ============================================================================
const clickSound = new Audio('assets/sounds/button.wav');
const vroomSound = new Audio('assets/sounds/whoosh.wav');
vroomSound.volume = 0.5;

// ============================================================================
// БЛОК 2: БАЗА ДАННЫХ ПРОДУКТОВ (статическая)
// ============================================================================
// Что делает: Хранит пищевую ценность продуктов (БЖУ и калории) на 100 грамм
// Структура: Объект, где ключ = название продукта, значение = объект с protein/fats/carbs/kcal
// Почему отдельно от цен: Цена и пищевая ценность — независимые характеристики,
// их можно менять и расширять по отдельности
// ============================================================================
const productsData = {
  "Гречневая крупа": { protein: 12.6, fats: 3, carbs: 60, kcal: 330 },
  "Рис белый": { protein: 6.5, fats: 0.8, carbs: 77, kcal: 344 },
  "Овсяные хлопья": { protein: 12, fats: 6, carbs: 62, kcal: 350 },
};

// ============================================================================
// БЛОК 3: БАЗА ЦЕН ПРОДУКТОВ
// ============================================================================
// Что делает: Хранит цены на продукты (в тенге за условную единицу/упаковку)
// Структура: Объект "название продукта" → "цена"
// ============================================================================
const productsPrice = {
  "Гречневая крупа": 550,
  "Овсяные хлопья": 400,
  "Рис белый": 600,
};

// ============================================================================
// БЛОК 4: ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ТРЕКЕРА
// ============================================================================
// Что делает: Хранят текущее состояние дневника питания за сегодня
// - totalDailyKcal и БЖУ: накопленные суммы за день
// - addedProducts: массив объектов, каждый объект = одна порция съеденного продукта
// Почему addedProducts нужен: Чтобы при удалении конкретной порции знать, сколько вычесть,
// а также для сохранения в localStorage и восстановления после перезагрузки
// ============================================================================
let totalDailyKcal = 0,
  totalDailyProteins = 0,
  totalDailyFats = 0,
  totalDailyCarbs = 0;
let addedProducts = [];

// ============================================================================
// БЛОК 5: ФУНКЦИЯ РАСЧЁТА ПОРЦИИ
// ============================================================================
// Что делает: Пересчитывает пищевую ценность с 100 г на заданный вес
// Формула: (ценность_на_100г * вес_в_граммах) / 100
// Защита: Если вес пустой, не число, или ≤0 — возвращает 0 (чтобы не ломать сложение)
// ============================================================================
function calcPortion(value, weight) {
  if (!weight || isNaN(weight) || weight <= 0) return 0;
  return (value * weight) / 100;
}

// ============================================================================
// БЛОК 6: СОХРАНЕНИЕ ДАННЫХ В LOCALSTORAGE
// ============================================================================
// Что делает: Сохраняет текущее состояние дня в браузерное хранилище
// Сохраняемые данные: калории, БЖУ, и полный массив добавленных продуктов
// Почему JSON.stringify: localStorage хранит только строки, объект нужно сериализовать
// Когда вызывается: При добавлении продукта, при удалении, при очистке всего дневника
// ============================================================================
function saveData() {
  const stats = {
    kcal: totalDailyKcal,
    p: totalDailyProteins,
    f: totalDailyFats,
    c: totalDailyCarbs,
    products: addedProducts,
  };
  localStorage.setItem("dailyStats", JSON.stringify(stats));
}

// ============================================================================
// БЛОК 7: ОБНОВЛЕНИЕ ИТОГОВОГО ДИСПЛЕЯ
// ============================================================================
// Что делает: Обновляет текстовый блок в интерфейсе, показывающий суммы за день
// toFixed(0) — округление калорий до целых, toFixed(1) — БЖУ до 1 знака
// ============================================================================
function updateTotalDisplay() {
  const display = document.querySelector("#total-display");
  if (display) {
    display.textContent = `Общий итог за день: 
    ${totalDailyKcal.toFixed(0)} ккал 
    | Б: ${totalDailyProteins.toFixed(1)} 
    | Ж: ${totalDailyFats.toFixed(1)} 
    | У: ${totalDailyCarbs.toFixed(1)}`;
  }
}

// ============================================================================
// БЛОК 8: СОЗДАНИЕ ЭЛЕМЕНТА ДНЕВНИКА (ОДНА ПОРЦИЯ)
// ============================================================================
// Что делает: Рисует в дневнике одну строку съеденного продукта и вешает на неё кнопку удаления
// Вход: productObj — объект с полями id, title, weight, kcal, p, f, c
// При удалении: вычитает калории из глобальных сумм, удаляет объект из addedProducts, сохраняет
// Почему используется filter по id: Позволяет удалить ТОЛЬКО эту порцию, даже если продуктов с таким же названием несколько
// ============================================================================
function createDailyItemDOM(productObj) {
  const dailyList = document.querySelector("#daily-list");
  if (!dailyList) return;

  const row = document.createElement("div");
  row.classList.add("daily-item");
  row.innerHTML = `<span>🥑 ${productObj.title} (${productObj.weight}г): ${productObj.kcal.toFixed(0)} ккал</span> <button class="delete-btn">❌</button>`;
  dailyList.appendChild(row);

  row.querySelector(".delete-btn").addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();

    totalDailyKcal -= productObj.kcal;
    totalDailyProteins -= productObj.p;
    totalDailyFats -= productObj.f;
    totalDailyCarbs -= productObj.c;

    updateTotalDisplay();
    addedProducts = addedProducts.filter((item) => item.id !== productObj.id);
    saveData();
    row.remove();
  });
}

// ============================================================================
// БЛОК 9: ГЛАВНЫЙ ЦИКЛ ПО КАРТОЧКАМ ПРОДУКТОВ
// ============================================================================
// Что делает: Для каждой карточки продукта (.inventory-card) находит её внутренние элементы,
// вешает обработчики событий: ввод веса, кнопка цены, кнопка добавления
// Почему forEach: Каждая карточка настраивается независимо (масштабируемость)
// ============================================================================
const allCards = document.querySelectorAll(".inventory-card");

allCards.forEach((card) => {
  // ----- Поиск элементов внутри текущей карточки -----
  const input = card.querySelector(".inventory-card__input");
  const titleElement = card.querySelector(".inventory-card__title");
  const title = titleElement.textContent.trim();
  const resField = card.querySelector(".inventory-card__result");
  const pField = card.querySelector(".js-proteins");
  const fField = card.querySelector(".js-fats");
  const cField = card.querySelector(".js-carbs");
  const addBtn = card.querySelector(".inventory-card__btn--add");
  const priceBtn = card.querySelector(".inventory-card_price--btnprice");
  const priceText = card.querySelector(".inventory-card__price");

  const data = productsData[title];
  let currentCalories = 0;
  const targetCalories = 2500;

  // ----- Прогресс-бар: показывает, сколько процентов от дневной нормы (2500 ккал) набрано -----
  function updateProgressBar() {
    let percent = (currentCalories / targetCalories) * 100;
    if (percent > 100) percent = 100;
    if (percent < 0) percent = 0;
    const energyBar = card.querySelector(".inventory-card__energy-bar");
    if (energyBar) {
      energyBar.style.width = percent + "%";
    }
  }

  // ----- ЗВУК ХОВЕРА (врум-шрум) -----
  card.addEventListener("mouseenter", () => {
    vroomSound.currentTime = 0;
    vroomSound.play();
  });
  card.addEventListener("mouseleave", () => {
    vroomSound.pause();
  });

  // ----- БЛОК 9.1: ОБРАБОТЧИК ВВОДА ВЕСА -----
  // Что делает: При каждом изменении поля ввода пересчитывает ккал/БЖУ,
  // меняет цвет результата (зелёный <200, оранжевый 200-500, красный >500),
  // проверяет лимит веса (максимум 1000г)
  if (data && input) {
    input.addEventListener("input", () => {
      let weight = parseFloat(input.value);

      if (weight > 1000) {
        resField.textContent = "Многовато! (макс. 1000г)";
        resField.style.color = "orange";
        pField.textContent = "0.0";
        fField.textContent = "0.0";
        cField.textContent = "0.0";
        currentCalories = 0;
      } else {
        let kcal = calcPortion(data.kcal, weight);
        let p = calcPortion(data.protein, weight);
        let f = calcPortion(data.fats, weight);
        let c = calcPortion(data.carbs, weight);

        resField.textContent = `Итого: ${kcal.toFixed(0)} ккал`;

        if (kcal > 500) {
          resField.style.color = "red";
          resField.style.fontWeight = "bold";
        } else if (kcal > 200) {
          resField.style.color = "orange";
          resField.style.fontWeight = "normal";
        } else {
          resField.style.color = "#06ff27";
          resField.style.fontWeight = "normal";
        }

        pField.textContent = p.toFixed(1);
        fField.textContent = f.toFixed(1);
        cField.textContent = c.toFixed(1);

        currentCalories = kcal;
      }
      updateProgressBar();
    });
  }

  // ----- БЛОК 9.2: КНОПКА "УЗНАТЬ ЦЕНУ" -----
  // Что делает: При клике показывает цену продукта из productsPrice,
  // временно (на 1.5 секунды) меняет заголовок карточки на "✅ Цена найдена!"
  if (priceBtn) {
    priceBtn.addEventListener("click", () => {
      clickSound.currentTime = 0;
      clickSound.play();

      const currentPrice = productsPrice[title];
      priceText.textContent = `Цена: ${currentPrice} тенге`;

      const oldTitle = titleElement.textContent;
      titleElement.textContent = "✅ Цена найдена!";

      setTimeout(() => {
        titleElement.textContent = oldTitle;
      }, 1500);
    });
  }

  // ----- БЛОК 9.3: КНОПКА "ДОБАВИТЬ" (В ДНЕВНИК) -----
  // Что делает: Берёт вес из инпута, пересчитывает ккал/БЖУ,
  // добавляет в глобальные суммы, создаёт объект порции с уникальным id (Date.now()),
  // сохраняет в addedProducts, рисует в дневнике, обновляет дисплей, сохраняет в localStorage
  // Визуальный эффект: кнопка на 1.5 секунды становится жёлтой с текстом "Добавлено!"
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      let weight = parseFloat(input.value);
      if (!weight || weight > 1000) return;

      clickSound.currentTime = 0;
      clickSound.play();

      let portionKcal = calcPortion(data.kcal, weight);
      let portionP = calcPortion(data.protein, weight);
      let portionF = calcPortion(data.fats, weight);
      let portionC = calcPortion(data.carbs, weight);

      totalDailyKcal += portionKcal;
      totalDailyProteins += portionP;
      totalDailyFats += portionF;
      totalDailyCarbs += portionC;

      const productItem = {
        id: Date.now(),
        title: title,
        weight: weight,
        kcal: portionKcal,
        p: portionP,
        f: portionF,
        c: portionC,
      };

      addedProducts.push(productItem);
      createDailyItemDOM(productItem);

      const oldBtnText = addBtn.textContent;
      addBtn.textContent = "Добавлено!";
      addBtn.style.backgroundColor = "#ffd106";

      setTimeout(() => {
        addBtn.textContent = oldBtnText;
        addBtn.style.backgroundColor = "";
      }, 1500);

      updateTotalDisplay();
      saveData();


       confetti();

    });
  }
});

// ============================================================================
// БЛОК 10: КНОПКА "ОЧИСТИТЬ ВСЁ"
// ============================================================================
// Что делает: Обнуляет все глобальные суммы, очищает массив addedProducts,
// удаляет все строки из HTML-дневника, сохраняет пустое состояние в localStorage
// ============================================================================
document.querySelector("#clear-all-btn")?.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();

  totalDailyKcal = 0;
  totalDailyProteins = 0;
  totalDailyFats = 0;
  totalDailyCarbs = 0;
  addedProducts = [];

  const list = document.querySelector("#daily-list");
  if (list) list.innerHTML = "";

  updateTotalDisplay();
  saveData();
});

// ============================================================================
// БЛОК 11: ЗАГРУЗКА ДАННЫХ ПРИ СТАРТЕ СТРАНИЦЫ
// ============================================================================
// Что делает: При загрузке окна читает localStorage, восстанавливает суммы и массив addedProducts,
// перерисовывает весь дневник (чтобы пользователь видел то, что добавил до перезагрузки)
// Почему forEach: Каждый сохранённый продукт нужно создать в DOM отдельно
// ============================================================================
window.addEventListener("load", () => {
  const savedData = localStorage.getItem("dailyStats");

  if (savedData) {
    const parsedData = JSON.parse(savedData);
    totalDailyKcal = parsedData.kcal || 0;
    totalDailyProteins = parsedData.p || 0;
    totalDailyFats = parsedData.f || 0;
    totalDailyCarbs = parsedData.c || 0;

    addedProducts = parsedData.products ?? [];

    updateTotalDisplay();

    addedProducts.forEach((product) => {
      createDailyItemDOM(product);
    });
  }
});

// ============================================================================
// БЛОК 12: МУЗЫКАЛЬНЫЙ ПЛЕЕР (фоновая музыка)
// ============================================================================
// Что делает: Позволяет пользователю управлять фоновой музыкой: play/pause, предыдущий/следующий трек
// Плейлист: из двух треков Alex G
// Логика: При окончании текущего трека автоматически переключается на следующий (ended → nextTrack)
// Исправленные опечатки: playlist.length (было lengt/playlisy)
// ============================================================================
const playlist = [
  "alex g - fay.mp3",
  "alex g - noteverywhere.mp3",
];

let currentTrackIndex = 0;
let isPlaying = false;

const bgMusic = new Audio();
bgMusic.volume = 0.4;

const playPauseBtn = document.querySelector("#play-pause-btn");
const prevTrackBtn = document.querySelector("#prev-track-btn");
const nextTrackBtn = document.querySelector("#next-track-btn");
const trackTitleDisplay = document.querySelector("#track-title");

function loadTrack(index) {
  const trackName = playlist[index];
  bgMusic.src = `assets/music/${trackName}`;
  trackTitleDisplay.textContent = trackName.replace(".mp3", "");
}

function togglePlay() {
  if (playlist.length === 0) return;

  if (!bgMusic.src) {
    loadTrack(currentTrackIndex);
  }

  if (isPlaying) {
    bgMusic.pause();
    playPauseBtn.textContent = "▶️";
    isPlaying = false;
  } else {
    bgMusic.play();
    playPauseBtn.textContent = "⏸️";
    isPlaying = true;
  }
}

function nextTrack() {
  currentTrackIndex++;
  if (currentTrackIndex >= playlist.length) {
    currentTrackIndex = 0;
  }
  loadTrack(currentTrackIndex);
  if (isPlaying) bgMusic.play();
}

function prevTrack() {
  currentTrackIndex--;
  if (currentTrackIndex < 0) {
    currentTrackIndex = playlist.length - 1;
  }
  loadTrack(currentTrackIndex);
  if (isPlaying) bgMusic.play();
}

playPauseBtn?.addEventListener("click", togglePlay);
nextTrackBtn?.addEventListener("click", nextTrack);
prevTrackBtn?.addEventListener("click", prevTrack);

bgMusic.addEventListener("ended", nextTrack);
