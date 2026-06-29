/* 
================================================================================
БЛОК 1: ПЕРЕКЛЮЧАТЕЛЬ ЦВЕТА ТЕКСТА КНОПКИ (Красный <-> Синий)
================================================================================
Что делает этот блок: 
При каждом нажатии на кнопку её текст меняет свой цвет: красный -> синий -> красный.
*/
/*
// 1. Поиск элементов на странице
let element = document.querySelector("#my-button"); // Находим кнопку по её ID и создаем переменную-ссылку "element"
let myParagraph = document.querySelector(".description"); // Находим абзац по его классу (в этой задаче переменная не пригодилась, но она создана)

// 2. Вешаем слушатель клика на кнопку
element.addEventListener("click", function () {

    // 3. Условие (проверяем текущее состояние цвета текста кнопки)
    if (element.style.color === "red") {
        // Если цвет текста сейчас красный, меняем его на синий
        element.style.color = "blue";
    } else {
        // Иначе (если цвет синий или любой другой), красим его в красный
        element.style.color = "red";
    }
});
*/


/* 
================================================================================
БЛОК 2: ПЕРЕКЛЮЧАТЕЛЬ ТЕКСТА КНОПКИ (Наша кнопка <-> Нажато!)
================================================================================
Что делает этот блок:
При клике на кнопку меняется её текст. Если на ней написано "Наша кнопка", 
текст меняется на "Нажато!", и наоборот.
*/
/*
// 1. Находим кнопку по её уникальному ID и создаем переменную "newText"
let newText = document.getElementById("my-button");

// 2. Запускаем слежку за кликами по кнопке
newText.addEventListener("click", function () {
    
    // 3. Условие (проверяем именно надпись/текст на кнопке с помощью .textContent)
    if (newText.textContent === "Наша кнопка") {
        // Если там написано "Наша кнопка", перезаписываем текст на "Нажато!"
        newText.textContent = "Нажато!";
    } else { 
        // Иначе (если там написано "Нажато!"), возвращаем старый текст
        newText.textContent = "Наша кнопка";
    }
}); 
*/


/* 
================================================================================
БЛОК 3: ТЕМНАЯ И СВЕТЛАЯ ТЕМА (День и Ночь)
================================================================================
Что делает этот блок:
При клике на кнопку меняется фоновый цвет всей страницы (тела документа) 
с белого на черный и обратно.
*/
/*
// 1. Находим кнопку и создаем постоянную переменную "tumblerNightDay" (через const, так как кнопка не будет перезаписываться)
const tumblerNightDay = document.getElementById("my-button");

// 2. Слушаем клики
tumblerNightDay.addEventListener("click", function () {
    
    // 3. Проверяем цвет фона ВСЕГО ТЕЛА страницы (document.body.style.backgroundColor)
    if (document.body.style.backgroundColor === "black") {
        // Если фон сейчас черный, перекрашиваем его в белый
        document.body.style.backgroundColor = "white";
    } else {
        // Иначе (если фон белый или прозрачный), делаем его черным
        document.body.style.backgroundColor = "black";
    }
});
*/


/* 
================================================================================
БЛОК 4: ПРОСТОЙ СЧЕТЧИК КЛИКОВ
================================================================================
Что делает этот блок:
Кнопка считает, сколько раз по ней кликнули, и выводит эту цифру прямо в свой текст.
*/
/*
// 1. Находим кнопку на странице
let counterClick = document.getElementById("my-button");

// 2. Создаем переменную-счетчик "count" и даем ей стартовое значение 0.
// Важно: создаем её СНАРУЖИ функции клика, чтобы она не сбрасывалась в ноль при каждом нажатии!
let count = 0;

// 3. Слушаем клики
counterClick.addEventListener("click", function () {
    // Прибавляем к нашему счетчику единицу (инкремент)
    count++;
    
    // Перезаписываем текст кнопки, склеивая фразу "Кликов: " и текущее число из переменной count
    counterClick.textContent = "Кликов: " + count; 
});
*/


/* 
================================================================================
БЛОК 5: СУПЕР-КНОПКА (Счетчик + Смена цветов по четности + Автосброс)
================================================================================
Что делает этот блок:
1. Считает клики.
2. Красит кнопку в зеленый цвет на четных кликах (2, 4...) и в красный на нечетных (1, 3...).
3. При достижении 10 кликов полностью сбрасывает счетчик в 0 и возвращает обычный вид.
*/
/*
// 1. Поиск кнопки и создание счетчика
let counterClick = document.getElementById("my-button");
let count = 0;

// 2. Слежка за кликами
counterClick.addEventListener("click", function () {
    count++; // Увеличиваем счетчик на 1 при нажатии
    counterClick.textContent = "Кликов: " + count; // Обновляем текст на кнопке

    // 3. Проверка ЧЕТНОСТИ клика
    if (count % 2 === 0) {
        // Если остаток от деления счетчика на 2 равен нулю (число четное) — красим кнопку в зеленый
        counterClick.style.backgroundColor = "green";
    } else {
        // Иначе (остаток равен 1, число нечетное) — красим в красный
        counterClick.style.backgroundColor = "red";
    }

    // 4. Проверка на ДОСТИЖЕНИЕ ЛИМИТА (автосброс на 10 кликах)
    if (count === 10) {
        counterClick.textContent = "Сброшено"; // Пишем текст "Сброшено" вместо числа 10
        counterClick.style.backgroundColor = "lightgray"; // Возвращаем кнопке нейтральный серый цвет
        count = 0; // Обнуляем переменную-счетчик, чтобы следующий клик снова стал первым (1)
    } 
}); 
*/


/* 
================================================================================
БЛОК 6: ПУЛЬТ УПРАВЛЕНИЯ ФОНОМ СТРАНИЦЫ ЧЕРЕЗ INPUT
================================================================================
Что делает этот блок:
Пользователь пишет в поле ввода название цвета на английском (например: blue), 
нажимает кнопку, и вся страница перекрашивается в этот цвет.
*/
/*
// 1. Находим три главных элемента формы
let myInput = document.getElementById("my-input"); // Находим поле ввода
let actionBtn = document.getElementById("action-btn"); // Находим кнопку действия
let outputText = document.getElementById("output-text"); // Находим абзац для вывода текста результатов

// 2. Слушаем клик по кнопке действия
actionBtn.addEventListener("click", function() {
    // Читаем то, что пользователь ввел в поле прямо сейчас, через свойство .value
    let userColor = myInput.value;
    
    // Красим фон всей страницы (document.body) в тот цвет, который лежит в переменной userColor
    document.body.style.backgroundColor = userColor;
    
    // Пишем отчет о проделанной работе в абзац внизу
    outputText.textContent = "Фон изменен на: " + userColor;
});
*/


/* 
================================================================================
БЛОК 7: СИСТЕМА ПРОВЕРКИ ПАРОЛЯ (Ваш самостоятельный проект в сложном режиме)
================================================================================
Что делает этот блок:
Проверяет введенный текст. Если введено слово "secret", разрешает доступ и красит 
кнопку в зеленый цвет. Иначе сообщает об ошибке и красит кнопку в красный.
*/
/*
// 1. Поиск элементов с вашими уникальными именами переменных
let myInput = document.getElementById("my-input"); // Поле ввода, куда пользователь пишет пароль
let checkPass = document.getElementById("action-btn"); // Кнопка проверки пароля
let proverka = document.getElementById("output-text"); // Текст внизу для вывода ответа ("Доступ разрешен" или "Ошибка")

// 2. Слушаем клик по кнопке проверки
checkPass.addEventListener("click" , function () {
    // Забираем введенный текст из поля ввода в переменную "userInput"
    let userInput = myInput.value;
    
    // 3. Логическая проверка введенного пароля
    if (userInput === "secret") {
        // Если введенный текст строго совпадает со словом "secret"
        proverka.textContent = "Доступ разрешен"; // Меняем текст сообщения на зеленый свет
        checkPass.style.backgroundColor = "green"; // Красим саму кнопку в зеленый цвет
    } else {
        // Иначе (если пароль пустой, неверный или с опечаткой)
        proverka.textContent = "Попробуйте еще раз!)"; // Выводим подсказку пользователю
        checkPass.style.backgroundColor = "red"; // Сигнализируем красным цветом кнопки об ошибке
    }
}); 
*/

/*
    0 задание
let movies = ["Начало", "Интерстреллар", "Матрица", " Гладиатор"];
console.log(movies);

console.log("Первый фильм: " + movies[0]);
 
let totalMovies = movies.length;
console.log("Всего фильмов: " + totalMovies); */


/*
1 задание
let favoriteGames = ["Fortnite" , "The Walking Dead", "Cuphead", "GTASA"];
console.log(favoriteGames[0]); */



 /*
 2 задача
 let govno = [];
govno.push("valorant")
govno.push("moctcha")
govno.push("ebannoe")
govno.push("dlya daunov")
console.log(govno.length); */


 /* const massive = ["red", "blue", "black"];

function applyColor(index) {
let myColor = massive[index];
document.body.style.backgroundColor = myColor;
}
applyColor(1); */



/*
Вы увидите отфильтрованный список и два сообщения для каждой дорогой цены.


let prices = [150, 800, 450,  1200, 300];

let expensivePrices = prices.filter(function(price) { 
    return price > 500; // Условие фильтрации
});

console.log("Дорогие цены: ", expensivePrices);

expensivePrices.forEach(function(price) {
    console.log("Товар по премиум-цене: " + price + " Рублей.");
});
 */


/*
задача 1 легко
const listName = ["Иван", "Анна","Петр","Ольга" ];
listName.forEach(function(hello) {
    console.log("Привет: ", hello + "!" )
})
    */ 
/*
задача 2 сложнее было уже потому что забыл про num => num % 2 === 0
let massNumber = [3, 8, 15, 22, 5];
let msNumber = massNumber.filter(num => num % 2 === 0);
console.log(msNumber);
*/



/*
задача 3 18 июня
 let prices = [100, 600, 250,  800, 150];

let newPrices = prices.filter(num => num > 500)

newPrices.forEach(function (price) {
    console.log("Цена со скидкой 10%:" + price * 0.9)
})
*/


 /* let catalog = [
 {title: "Телевизор", price: 40000},
 {title: "Телефон", price: 25000},
 {title: "Наушники", price: 5000}
];
*/
/*
let receipts = catalog.map(function(product) {
    return "Товар: " + product.title +" стоит " + product.price + " руб.";
});
console.log(receipts);
*/


/*

Задача 1 (Сложность: Легкая) — Возведение в квадрат (map)

    Создайте массив чисел [2, 5, 8, 10].

    С помощью метода map создайте новый массив, в котором каждое число будет возведено в квадрат (умножено само на себя).

    Выведите получившийся массив в консоль.

let numbers = [2, 5, 8, 10];
let x2Numbers = numbers.map( num => num * num);
console.log(x2Numbers)
*/

/*
задача 2 было сложно вспомнить про инкременты и  про выводы в консоли
let student = {
    name: "Aidana",
    city: "Aqtau",
    age: 19
};
student.age++
console.log(`Студент: ${student.name}  , Город: ${student.city} , Возраст: ${student.age} `)
*/

/*
задача 3 
let group = [
    { name: "Иван", grade: 5 },
    { name: "Анна", grade: 3 },
    { name: "Петр", grade: 4 },
    { name: "Ольга", grade: 5 }
];
let newGroup = group.filter(function (student) {
 return student.grade === 5

});
let finalNames = newGroup.map(function (student) {
return student.name;
})
 
console.log(finalNames)
*/



 /* 
 пример задачи 

 let group = [
    { name: "Иван", grade: 5 },
    { name: "Анна", grade: 3 },
    { name: "Петр", grade: 4 }
];

let listElement = document.getElementById("students-list");

let htmlString = "";

group.forEach(function(student) {
htmlString += "<li>" + student.name + "(Оценка: " + student.grade + ")</li>";
});
listElement.innerHTML = htmlString;
*/

/*
задача 1

let favoriteMovies = [
  { title: "Матрица", year: 1999 },
  { title: "Начало", year: 2010 }
];

let listElement = document.getElementById("movies-list");

let htmlString = "";

favoriteMovies.forEach(function(movies) {
htmlString += "<li>" + movies.title + "(Год: " + movies.year + ")</li>";  
});
listElement.innerHTML = htmlString;
*/

/*
задача 2
let objectBooks = [
    { title: "Счастливый карман, полный денег", author: "Дэвида Кэмерона Джиканди" },
    { title: "Наедине с собой", author: "Марк Аврелий" },
    { title: "Так говорил Заратустра", author: "Фридрих Ницше" }
];

let listElement = document.getElementById("books-list");

let htmlString = "";

objectBooks.forEach(function(books) {
    // Закрываем тег </strong> сразу после названия и ставим красивое тире
    htmlString += "<li><strong>" + books.title + "</strong> — " + books.author + "</li>";
});

listElement.innerHTML = htmlString;
*/

/*
let todos = ["Купить молоко", "Помыть посуду"];

let listElement = document.getElementById("books-list");
let inputElement = document.getElementById("my-input");
let buttonElement = document.getElementById("action-btn");


function render() {
    listElement.innerHTML = "";

    todos.forEach (function(todo, index) {    
        listElement.innerHTML += "<li>" + todo + " <button onclick='deleteTodo(" + index + ")' style = 'margin-left: 10px; color: red; border: none; background: none; cursor: pointer: font-weight: bold;'>x</button></li>";
     });
     localStorage.setItem("my-todos", JSON.stringify(todos));
}
render();

buttonElement.addEventListener("click", function () {
    let text = inputElement.value;

    if (text !== "" ) {
        todos.push(text);
        render();
        inputElement.value = "";
    }
});

function deleteTodo(index) {
    todos.splice(index, 1);
    render();
}
*/


/*
задача 1
let userName = "Andrey"
let installUsername = localStorage.setItem("userName", userName);
let folderUsername = localStorage.getItem("userName")
console.log("Привет из памяти, " + folderUsername)
*/

/*
задача 2 
let todos = ["Купить молоко", "Помыть посуду"];

let listElement = document.getElementById("books-list");
let inputElement = document.getElementById("my-input");
let buttonElement = document.getElementById("action-btn");


function render() {
    listElement.innerHTML = "";

    todos.forEach (function(todo, index) {    
        listElement.innerHTML += "<li>" + todo + " <button onclick='deleteTodo(" + index + ")' style = 'margin-left: 10px; color: red; border: none; background: none; cursor: pointer: font-weight: bold;'>x</button></li>";
     });
     localStorage.setItem("my-todos", JSON.stringify(todos));
}
render();

buttonElement.addEventListener("click", function () {
    let text = inputElement.value;

    if (text !== "" ) {
        todos.push(text);
        render();
        inputElement.value = "";
    }
});

function deleteTodo(index) {
    todos.splice(index, 1);
    render();
}
*/

/*
let todos;
if (localStorage.getItem("my-todos") !== null) {
    todos = JSON.parse(localStorage.getItem("my-todos"));
} else {
    todos = ["Купить молоко", "Помыть посуду"];
}

let listElement = document.getElementById("books-list");
let inputElement = document.getElementById("my-input");
let buttonElement = document.getElementById("action-btn");


function render() {
    listElement.innerHTML = "";

    todos.forEach (function(todo, index) {    
        listElement.innerHTML += "<li>" + todo + " <button onclick='deleteTodo(" + index + ")' style = 'margin-left: 10px; color: red; border: none; background: none; cursor: pointer: font-weight: bold;'>x</button></li>";
     });
     localStorage.setItem("my-todos", JSON.stringify(todos));
}
render();

buttonElement.addEventListener("click", function () {
    let text = inputElement.value;

    if (text !== "" ) {
        todos.push(text);
        render();
        inputElement.value = "";
    }
});

function deleteTodo(index) {
    todos.splice(index, 1);
    render();
}
*/


/*
задача 1
let saveUsername = " Андрей";
let cleanName = saveUsername.trim();
console.log(cleanName)
*/

/*
задача 2
let imgAvatar = "avatar.png"
let newAvatar = imgAvatar.replace(".png", ".jpg")
console.log(newAvatar)
*/
 
/*
let jsGuide = "как быстро выучить массивы в JS"
let cleanGuide = jsGuide.split(" ")
let joinGuide = cleanGuide.join("-")
console.log(joinGuide)
*/


/*
задача 1
let inventory = [
{name:"Клавиатура", price: 3000, inStock: true },
{name:"Мышка", price:1500, inStock:false},
{name:"Монитор", price: 12000, inStock:true},
{name:"Коврик", price: 800, inStock:true}
];

let inStockProducts = inventory.filter(function(item) {
    return item.inStock === true;
});

let finalStrings = inStockProducts.map(function(item) {
    return `Товар "${item.name}" стоит ${item.price} тенге`
})
console.log(finalStrings)
*/
/*
задача 2
let inventory = [
{name:"Клавиатура", price: 3000, inStock: true },
{name:"Мышка", price:1500, inStock:false},
{name:"Монитор", price: 12000, inStock:true},
{name:"Коврик", price: 800, inStock:true}
];
let inStockProducts = inventory.filter(function(item) {
    return item.price <= 5000;
    
});
let pricesElement = document.getElementById("prices-list");
inStockProducts.forEach(function(list){
        pricesElement.innerHTML += `<li>Доступный товар: ${list.name} за ${list.price} тенге </li>`
})
*/

/*
const productsPrice = {
    "Гречневая крупа": 550,
    "Овсяные хлопья": 400,
    "Рис белый": 600
};

let productNames = Object.keys(productsPrice);

console.log("Массив названий: ", productNames);

productNames.forEach(function(name) {
    console.log("На складе есть продукт: " + name);
});
*/


/*
задача 1 
const laptop = {
    "brand": 550,
    "processor": 400,
    "ram": 600
};
let laptopTechinks = Object.keys(laptop);
console.log("Названия всех характеристик: ", laptopTechinks.length);
*/

/*
задача 2  
тут тупил на функции money
если точнее то на   total += money;
let salaries = {
    "Иван": 150000,
    "Анна": 230000,
    "Петр": 180000
};

let total = 0;
let salariesTop = Object.values(salaries);

salariesTop.forEach(function(money){
    total += money;
})
console.log(total)
*/

/*
задача 3 тупил на  
    list.innerHTML += `<li>${name} </li>` 
    а если точнее то в ${не знал что сюда поставить и методом подбора сделал Name}
let salaries = {
    "Иван": 150000,
    "Анна": 230000,
    "Петр": 180000
};
let list = document.getElementById("name-list")
let salariesNames = Object.keys(salaries)
salariesNames.forEach(function(name){

    list.innerHTML += `<li>${name} </li>`
})

*/























