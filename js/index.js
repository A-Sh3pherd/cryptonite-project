var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// AllCoinsInfo Class 
var AllCoinsInfo = /** @class */ (function () {
    function AllCoinsInfo(img, usd, eur, ils, id) {
        this.id = id;
        this.img = img;
        this.usd = usd;
        this.eur = eur;
        this.ils = ils;
    }
    return AllCoinsInfo;
}()); // Class Ends here
;
var activeContainer = 'ready-set-go';
var allCoins;
var allCoinsData;
var Swal;
// This Function runs on load
function getApiOnLoad() {
    return __awaiter(this, void 0, void 0, function () {
        var res, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('https://api.coingecko.com/api/v3/coins/list')]; // Fetching the list of all coins
                case 1:
                    res = _a.sent() // Fetching the list of all coins
                    ;
                    return [4 /*yield*/, res.json()]; // set AllCoins with the api Data we fetched
                case 2:
                    allCoins = _a.sent(); // set AllCoins with the api Data we fetched
                    allCoinsData = allCoins;
                    setCards(); // Setting the card with the wanted data
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Sets the cards ~~ in getApiOnLoad()
function setCards() {
    activeContainer = 'cards-container';
    var cardsContainer = document.getElementById('cards-container');
    for (var i = 0; i < allCoins.length; i++) { // Looping through all Coins and making a card with each one 
        if (i <= 150) { //~ Limited for the first 100 coins at the moment
            var cardDiv = buildCardHTML(allCoins[i], i);
            cardsContainer.append(cardDiv);
        }
    }
}
// Check if on LocalStorage, if not- fetch card and build card
function getSpecificCoin(id, symbol) {
    return __awaiter(this, void 0, void 0, function () {
        var selectedCoin, coin, childEl, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    selectedCoin = void 0;
                    if (!localStorage.getItem(id)) return [3 /*break*/, 4];
                    console.log('Exists in local storage!'); // Existance Log
                    coin = JSON.parse(localStorage.getItem(id));
                    if (!isTimeDifferenceGreaterThanTwoMinutes(coin.date)) return [3 /*break*/, 2];
                    console.log('Coin is old! get new mother fucker.'); // Old coin Log
                    return [4 /*yield*/, fetchSpecificCoin(id)];
                case 1:
                    selectedCoin = _a.sent(); // fetch the coin data again from the api
                    saveInLocalStorage(selectedCoin); // Save the coin in the local storage
                    return [3 /*break*/, 3];
                case 2:
                    console.log('This coin is fresh yo!'); // Fresh coin Log
                    selectedCoin = coin; // Set selectedCoin with the value of coijn
                    _a.label = 3;
                case 3: return [3 /*break*/, 6];
                case 4:
                    console.log('Dayum, no coin at all. Getting from the server.'); // No coins at Local Storage Log
                    return [4 /*yield*/, fetchSpecificCoin(id)];
                case 5:
                    selectedCoin = _a.sent(); // Fetch the specific coin data from the api 
                    console.log(selectedCoin.id); // Log the name of the selected Coin added to the local storage
                    saveInLocalStorage(selectedCoin); // Save the selectedCoin in the localStorage
                    _a.label = 6;
                case 6:
                    $(document.getElementById('loader ' + id)).fadeOut('slow', function () {
                        document.getElementById('loader ' + id).remove(); // finish the Loader when data is up
                    });
                    $("#loader-" + symbol).fadeOut('slow', function () {
                        $("#loader-" + symbol).remove();
                    });
                    childEl = document.getElementById("childContent-" + id);
                    childEl.innerHTML = buildCoinDeatils(selectedCoin); // Set the inner Html of the card with the selectedCoin details
                    return [3 /*break*/, 8];
                case 7:
                    err_2 = _a.sent();
                    console.log(err_2);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
// Save to localStorage Function
function saveInLocalStorage(coin) {
    coin.date = new Date();
    localStorage.setItem(coin.id, JSON.stringify(coin));
}
function fetchSpecificCoin(id) {
    return __awaiter(this, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://api.coingecko.com/api/v3/coins/" + id)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, new AllCoinsInfo(data.image.small, data.market_data.current_price.usd, data.market_data.current_price.eur, data.market_data.current_price.ils, data.id)];
            }
        });
    });
}
function isTimeDifferenceGreaterThanTwoMinutes(date) {
    var past = new Date(date).getTime();
    var twoMins = 1000 * 60 * 2;
    return (new Date().getTime() - past) > twoMins;
}
// Favorite Coins Section \\ 
var favCoins = new Array();
function favoriteCoins(id) {
    var checkbox = document.getElementById("checkbox-" + id);
    if (checkbox.checked == true) {
        if (favCoins.length >= 5) { // If more than 5 Favorite coins
            favCoins.push(id);
            tooManyCoins();
            return;
        }
        else {
            favCoins.push(id);
            console.log(id + ' Has been added to favorite');
        }
    }
    else {
        favCoins = favCoins.filter(function (coin) { return coin !== id; });
        console.log(id + ' Has Been Removed From Favorite Coins!');
    }
} // Favorite Coins Section Ends Here
function liveReportsPage() {
    return __awaiter(this, void 0, void 0, function () {
        var cardsContainer;
        return __generator(this, function (_a) {
            cardsContainer = document.getElementById('cards-container');
            liveChartCheck();
            return [2 /*return*/];
        });
    });
}
function getMultipleCoinsData() {
    return __awaiter(this, void 0, void 0, function () {
        var res, data, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + favCoins[0] + "," + favCoins[1] + "," + favCoins[2] + "," + favCoins[3] + ", " + favCoins[4] + "&tsyms=USD")]; // Fetch price of Fav coins
                case 1:
                    res = _a.sent() // Fetch price of Fav coins
                    ;
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 3:
                    err_3 = _a.sent();
                    console.error(err_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Chart
var liveChartCheck = function () {
    return __awaiter(this, void 0, void 0, function () {
        function toggleDataSeries(e) {
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            }
            else {
                e.dataSeries.visible = true;
            }
            e.chart.render();
        }
        function updateChart(count) {
            return __awaiter(this, void 0, void 0, function () {
                var _loop_1, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            count = count || 1;
                            _loop_1 = function () {
                                var yValues, numberOfCoin;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            time.setTime(time.getTime() + updateInterval);
                                            return [4 /*yield*/, getMultipleCoinsData()
                                                // pushing the new values
                                            ];
                                        case 1:
                                            yValues = _a.sent();
                                            numberOfCoin = 0;
                                            fullData.forEach(function (coin) {
                                                coin.dataPoints.push({
                                                    x: time.getTime(),
                                                    y: yValues[coin.name].USD
                                                });
                                                options.data[numberOfCoin].legendText = coin.name + " - " + yValues[coin.name].USD + "$";
                                                numberOfCoin++;
                                            });
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < count)) return [3 /*break*/, 4];
                            return [5 /*yield**/, _loop_1()];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4:
                            // updating legend text with  updated with y Value 
                            $("#chartContainer").CanvasJSChart().render();
                            return [2 /*return*/];
                    }
                });
            });
        }
        var data, fullData, coin, options, chart, updateInterval, time;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getMultipleCoinsData()];
                case 1:
                    data = _a.sent();
                    fullData = [];
                    if (data.Response) {
                        alert('You must add at least 1 coin to your favorites.');
                        document.getElementById('nav-home').click();
                        return [2 /*return*/];
                    }
                    for (coin in data) {
                        console.log(coin);
                        fullData.push({
                            type: "line",
                            xValueType: "dateTime",
                            yValueFormatString: "###.########$",
                            xValueFormatString: "hh:mm:ss TT",
                            showInLegend: true,
                            name: coin,
                            dataPoints: []
                        });
                    }
                    options = {
                        title: {
                            text: "Cryptonite Live Chart"
                        },
                        axisX: {
                            title: "Chart updates every 2 secs"
                        },
                        axisY: {
                            suffix: "USD"
                        },
                        toolTip: {
                            shared: true
                        },
                        legend: {
                            cursor: "pointer",
                            verticalAlign: "top",
                            fontSize: 22,
                            fontColor: "dimGrey",
                            itemclick: toggleDataSeries
                        },
                        data: fullData
                    };
                    chart = $("#chartContainer").CanvasJSChart(options);
                    updateInterval = 2000;
                    time = new Date;
                    // generates first set of dataPoints 
                    updateChart(10);
                    setInterval(function () { updateChart(1); }, updateInterval);
                    return [2 /*return*/];
            }
        });
    });
};
// HTML Templating \\
var buildCoinDeatils = function (selectedCoin) { return "\n        <img src=\"" + selectedCoin.img + "\" alt=\"\">\n        <br>\n        \n        <p>\n        <strong>Usd Price:</strong> " + selectedCoin.usd + " $<br> \n        <strong>Eur Price:</strong> " + selectedCoin.eur + " \u20AC<br>\n        <strong>Ils Price:</strong> " + selectedCoin.ils + " \u20AA\n        </p\n        "; };
// Build cards HTML
var buildCardHTML = function (coin, i) {
    var cardDiv = document.createElement('div');
    cardDiv.id = coin.symbol;
    cardDiv.className += "col-xl-4 col-lg-6 col-md-12 col-sm-12 xsm-12 mt-2 card-fade";
    cardDiv.innerHTML = "\n    \n                    <div class=\"card\" style=\"width: 18rem;\">\n                        <div class=\"card-body\">\n    \n                            <div class=\"d-flex justify-content-between\"> \n                            <h5 class=\"card-title\">" + coin.symbol + "</h5> \n                                <label class=\"switch\">\n                                <input id=\"checkbox-" + coin.symbol + "\" type=\"checkbox\"  onclick=favoriteCoins(\"" + coin.symbol + "\")>\n                                <span class=\"slider round\" slider-coin=\"" + coin.symbol + "\"></span>\n                                </label>\n                            </div>\n    \n                            <p class=\"card-text\">" + coin.name + "</p>\n                            \n                            <p>\n                              <button class=\"btn btn-primary\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapseExample" + coin.id + "\" aria-expanded=\"false\" aria-controls=\"collapseExample\">\n                                 More Info\n                              </button>\n                            </p>\n    \n                            <div class=\"collapse\" id=\"collapseExample" + coin.id + "\">\n                                <div class=\"card card-body\" id=\"childContent-" + coin.id + "\">\n                                </div>\n                            </div>\n                        \n                        </div>\n                    </div>\n                                        ";
    cardDiv.addEventListener('show.bs.collapse', function () { loader(coin.symbol); });
    cardDiv.addEventListener('show.bs.collapse', function () { getSpecificCoin(coin.id, coin.symbol); });
    return cardDiv;
};
var buildAboutPage = function () {
    var about = document.querySelector('.about-container');
    about.innerHTML = "\n    <div class=\"row\">\n      <div class=\"col-auto\">\n        <img id=\"about-photo\" src=\"imgs/about-photo.png\" alt=\"\">\n      </div>\n      <div class=\"col-auto mt-4\">\n        <p style=\"margin-left: 100px;\">Hello, My name is Alon Shefer and im the developer of this project.</p>\n        <p style=\"margin-left: 130px;\">I'm 25 years old, i live happily ever-after in Tel-aviv.</p>\n        <p style=\"margin-left: 150px;\">My favorite Quote is: \u201CIt's the children the world almost breaks who grow up to save it.\u201D</p>\n        <p style=\"margin-left: 170px;\">I truly beleave that with Hard work- EVERYTHING is possible.</p>\n        <p style=\"margin-left: 160px;\">and that's what guided me throughout this project.</p>\n        <p style=\"margin-left: 155px;\">Now, Sit back and find out what info your looking for,</p>\n        <p style=\"margin-left: 140px;\">And we will take care of the rest.</p>\n      </div>\n    </div>\n\n    <div class=\"\">\n      <div class=\" mt-5\">\n        <p class=\"about-info\">In this project, my goal was to make the Crypto-Currency trading-life easier.</p>\n        <p class=\"about-info\">In this website you can find information about all the crypto coins in the world !</p>\n        <p class=\"about-info\">By selecting your favorite coins you can view a real-time data about the selected coins. </p>\n        <p class=\"about-info\">This project simulate a <strong>S</strong>ingle <strong>P</strong>age <strong>A</strong>pplication Principles. </p>\n        <p class=\"about-info\"> </p>\n      </div>\n    </div>\n    ";
};
// Loader Function
function loader(element) {
    var fadeContainer = document.createElement("div"); // creating div
    fadeContainer.classList.add("loader-container-fade"); //set div class to loader-container-fade
    fadeContainer.id = 'loader-' + element; // gives a special id to each loader
    var loaderContainer = document.createElement("div"); // creating a iv
    loaderContainer.classList.add("loader-container"); // set div class to loader-container
    fadeContainer.append(loaderContainer); // put the loader container inside the fade container
    var loaderTemplate = document.createElement("div"); // creating div
    loaderTemplate.classList.add("loader"); // set div class to loader
    loaderContainer.append(loaderTemplate); // put the loaderTemplate inside the loaderContainer
    $(fadeContainer).fadeIn(); // fade in the container
    try {
        document.getElementById(element).children[0].append(fadeContainer);
    }
    catch (error) {
        console.log(error);
    }
}
// Container Change Function
function changeContainer(caller) {
    var container = $(caller).attr('container');
    var sideNav = document.getElementsByClassName('sidenav');
    $("#" + activeContainer).fadeOut(850);
    $("#" + container).fadeIn(2000);
    activeContainer = container;
}
// 
var checked = 0;
function tooManyCoins() {
    return __awaiter(this, void 0, void 0, function () {
        var formValues;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    checked = 0;
                    return [4 /*yield*/, Swal.fire({
                            title: 'Select 5 coins Max',
                            html: "\n          <label for=\"" + favCoins[0] + "\"> " + favCoins[0] + "</label>\n          <input type=\"checkbox\" id=\"swal-input1\" class=\"sweatAlertCheckbox\" name=\"" + favCoins[0] + "\" value=\"" + favCoins[0] + "\" onclick=\"checkNumberOfCheckedCoins(this)\"><br>\n          \n          <label for=\"" + favCoins[1] + "\"> " + favCoins[1] + "</label>\n          <input type=\"checkbox\" id=\"swal-input2\" class=\"sweatAlertCheckbox\" name=\"" + favCoins[1] + "\" value=\"" + favCoins[1] + "\" onclick=\"checkNumberOfCheckedCoins(this)\"><br>\n         \n\n          <label for=\"" + favCoins[2] + "\"> " + favCoins[2] + "</label>\n          <input type=\"checkbox\" id=\"swal-input3\" class=\"sweatAlertCheckbox\" name=\"" + favCoins[2] + "\" value=\"" + favCoins[2] + "\" onclick=\"checkNumberOfCheckedCoins(this)\"><br>\n          \n          <label for=\"" + favCoins[3] + "\"> " + favCoins[3] + "</label>\n          <input type=\"checkbox\" id=\"swal-input4\" class=\"sweatAlertCheckbox\" name=\"" + favCoins[3] + "\" value=\"" + favCoins[3] + "\" onclick=\"checkNumberOfCheckedCoins(this)\"><br>\n          \n          <label for=\"" + favCoins[4] + "\"> " + favCoins[4] + "</label>\n          <input type=\"checkbox\" id=\"swal-input5\" class=\"sweatAlertCheckbox\" name=\"" + favCoins[4] + "\" value=\"" + favCoins[4] + "\" onclick=\"checkNumberOfCheckedCoins(this)\"><br>\n          \n          <label for=\"" + favCoins[5] + "\"> " + favCoins[5] + "</label>\n          <input type=\"checkbox\" id=\"swal-input6\" class=\"sweatAlertCheckbox\" name=\"" + favCoins[5] + "\" value=\"" + favCoins[5] + "\" onclick=\"checkNumberOfCheckedCoins(this)\"><br>\n          \n          \n          ",
                            focusConfirm: true,
                            preConfirm: function () {
                                var zibi = [];
                                document.getElementById('swal-input1').checked ? zibi.push(document.getElementById('swal-input1').value) : $("[slider-coin=\"" + document.getElementById('swal-input1').value + "\"]")[0].click();
                                document.getElementById('swal-input2').checked ? zibi.push(document.getElementById('swal-input2').value) : $("[slider-coin=\"" + document.getElementById('swal-input2').value + "\"]")[0].click();
                                document.getElementById('swal-input3').checked ? zibi.push(document.getElementById('swal-input3').value) : $("[slider-coin=\"" + document.getElementById('swal-input3').value + "\"]")[0].click();
                                document.getElementById('swal-input4').checked ? zibi.push(document.getElementById('swal-input4').value) : $("[slider-coin=\"" + document.getElementById('swal-input4').value + "\"]")[0].click();
                                document.getElementById('swal-input5').checked ? zibi.push(document.getElementById('swal-input5').value) : $("[slider-coin=\"" + document.getElementById('swal-input5').value + "\"]")[0].click();
                                document.getElementById('swal-input6').checked ? zibi.push(document.getElementById('swal-input6').value) : $("[slider-coin=\"" + document.getElementById('swal-input6').value + "\"]")[0].click();
                                favCoins = zibi;
                                console.log(favCoins);
                                return [];
                            }
                        })];
                case 1:
                    formValues = (_a.sent()).value;
                    return [2 /*return*/];
            }
        });
    });
}
function checkNumberOfCheckedCoins(caller) {
    if (caller.checked) {
        if (checked != 5) {
            checked++;
        }
        else {
            checked++;
            alert('You need to select 5 Coins BITCH!');
            caller.click();
        }
    }
    else {
        checked--;
    }
}
// Search function (Allways Working)
$("#search-form").on('submit', function (e) {
    e.preventDefault();
    var searchVal = document.getElementById('search-input').value;
    $('.card-fade').fadeOut('slow');
    if (searchVal == "") {
        $('.card-fade').fadeIn('slow');
        return;
    }
    $("#" + searchVal).fadeIn();
});
function openNav() {
    document.getElementById('nav-brand-cryptonite').classList.add('nav-brand-move-left');
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("cards-container").style.marginLeft = "250px";
}
// Moving Letters Effects
var textWrapper = document.querySelector('.ml2');
var anime;
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
anime.timeline({ loop: false })
    .add({
    targets: '.ml2 .letter',
    scale: [4, 1],
    opacity: [0, 1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 1250,
    delay: function (el, i) { return 70 * i; }
});
// ReadySetGo
var ml4 = {};
ml4.opacityIn = [0, 1];
ml4.scaleIn = [0.2, 1];
ml4.scaleOut = 3;
ml4.durationIn = 800;
ml4.durationOut = 600;
ml4.delay = 500;
anime.timeline({ loop: false })
    .add({
    targets: '.ml4 .letters-1',
    opacity: ml4.opacityIn,
    scale: ml4.scaleIn,
    duration: ml4.durationIn
}).add({
    targets: '.ml4 .letters-1',
    opacity: 0,
    scale: ml4.scaleOut,
    duration: ml4.durationOut,
    easing: "easeInExpo",
    delay: ml4.delay
}).add({
    targets: '.ml4 .letters-2',
    opacity: ml4.opacityIn,
    scale: ml4.scaleIn,
    duration: ml4.durationIn
}).add({
    targets: '.ml4 .letters-2',
    opacity: 0,
    scale: ml4.scaleOut,
    duration: ml4.durationOut,
    easing: "easeInExpo",
    delay: ml4.delay
}).add({
    targets: '.ml4 .letters-3',
    opacity: ml4.opacityIn,
    scale: ml4.scaleIn,
    duration: ml4.durationIn
}).add({
    targets: '.ml4 .letters-3',
    opacity: 0,
    scale: ml4.scaleOut,
    duration: ml4.durationOut,
    easing: "easeInExpo",
    delay: ml4.delay
}).add({
    targets: '.ml4',
    opacity: 0,
    duration: 500,
    delay: 500
});
// Runs Onload :
setTimeout(function () { getApiOnLoad(); }, 5500); // Runs Onload !!!
