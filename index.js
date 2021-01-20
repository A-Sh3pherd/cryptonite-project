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
;
var allCoins;
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
function setCards() {
    var cardsContainer = document.getElementById('cards-container');
    var _loop_1 = function (i) {
        if (i <= 100) { //~ Limited for the first 100 coins at the moment
            var cardDiv = document.createElement('div');
            cardDiv.className = 'col-lg-4 col-md-6 col-sm-6 xsm-12';
            cardDiv.innerHTML = buildCardHTML(allCoins[i], i);
            cardDiv.addEventListener('shown.bs.collapse', function () { return getSpecificCoin(allCoins[i].id); });
            cardsContainer === null || cardsContainer === void 0 ? void 0 : cardsContainer.appendChild(cardDiv);
        }
    };
    for (var i = 0; i < allCoins.length; i++) {
        _loop_1(i);
    }
}
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
function getSpecificCoin(id) {
    return __awaiter(this, void 0, void 0, function () {
        var selectedCoin, coin, childEl, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    selectedCoin = void 0;
                    if (!localStorage.getItem(id)) return [3 /*break*/, 4];
                    console.log('Exists in local storage!');
                    coin = JSON.parse(localStorage.getItem(id));
                    if (!isTimeDifferenceGreaterThanTwoMinutes(coin.date)) return [3 /*break*/, 2];
                    console.log('Coin is old! get new mother fucker.');
                    return [4 /*yield*/, fetchSpecificCoin(id)];
                case 1:
                    selectedCoin = _a.sent();
                    saveInLocalStorage(selectedCoin);
                    return [3 /*break*/, 3];
                case 2:
                    console.log('This coin is fresh yo!');
                    selectedCoin = coin;
                    _a.label = 3;
                case 3: return [3 /*break*/, 6];
                case 4:
                    console.log('Dayum, no coin at all. Getting from the server.');
                    return [4 /*yield*/, fetchSpecificCoin(id)];
                case 5:
                    selectedCoin = _a.sent();
                    console.log(selectedCoin.id);
                    saveInLocalStorage(selectedCoin);
                    _a.label = 6;
                case 6:
                    childEl = document.getElementById("childContent-" + id);
                    childEl.innerHTML = buildCoinDeatils(selectedCoin);
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
        console.log("Coins on fav: " + favCoins);
        if (favCoins.length >= 5) { // If more than 5 Favorite coins
            alert('Sorry, Too many Favorites');
            checkbox.checked = false;
        }
        else {
            favCoins.push(id);
            console.log(id + ' Has been added to favorite');
        }
    }
    else {
        console.log(id + ' Has Been Removed From Favorite Coins!');
    }
} // Favorite Coins Section Ends Here
function liveReportsPage() {
    return __awaiter(this, void 0, void 0, function () {
        var cardsContainer, res, data, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cardsContainer = document.getElementById('cards-container');
                    cardsContainer.innerHTML = '';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + favCoins[0] + "," + favCoins[1] + "," + favCoins[2] + "," + favCoins[3] + ", " + favCoins[4] + "&tsyms=USD")]; // Fetch price of Fav coins
                case 2:
                    res = _a.sent() // Fetch price of Fav coins
                    ;
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    console.log(data);
                    return [3 /*break*/, 5];
                case 4:
                    err_3 = _a.sent();
                    console.error(err_3);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// const liveChartCheck = function () {
//     var options = {
//         exportEnabled: true,
//         animationEnabled: true,
//         title: {
//             text: "Units Sold VS Profit"
//         },
//         subtitles: [{
//             text: "Click Legend to Hide or Unhide Data Series"
//         }],
//         axisY: {
//             title: "Coin Price",
//             titleFontColor: "#4F81BC",
//             lineColor: "#4F81BC",
//             labelFontColor: "#4F81BC",
//             tickColor: "#4F81BC"
//         },
//         toolTip: {
//             shared: true
//         },
//         legend: {
//             cursor: "pointer",
//             itemclick: toggleDataSeries
//         },
//         data: [{
//             type: "spline",
//             name: "Units Sold",
//             showInLegend: true,
//             xValueFormatString: "MMM YYYY",
//             yValueFormatString: "#,##0 Units",
//             dataPoints: [
//                 { y: 120 }, //price height
//                 { y: 135 },
//                 { y: 144 },
//                 { y: 103 },
//                 { y: 93 },
//                 { y: 129 },
//                 { y: 143 },
//                 { y: 156 },
//                 { y: 122 },
//                 { y: 106 },
//                 { y: 137 },
//                 { y: 142 }
//             ]
//         },
//         ]
//     };
//     $("#chartContainer").CanvasJSChart(options);
//     function toggleDataSeries(e) {
//         if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
//             e.dataSeries.visible = false;
//         } else {
//             e.dataSeries.visible = true;
//         }
//         e.chart.render();
//     }
// }
getApiOnLoad(); // Running the Get Api Function
// HTML Templating \\
var buildCoinDeatils = function (selectedCoin) { return "\n        <img src=\"" + selectedCoin.img + "\" alt=\"\">\n        <br>\n        \n        <p>\n        <strong>Usd Price:</strong> " + selectedCoin.usd + " $<br> \n        <strong>Eur Price:</strong> " + selectedCoin.eur + " \u20AC<br>\n        <strong>Ils Price:</strong> " + selectedCoin.ils + " \u20AA\n        </p\n        "; };
var buildCardHTML = function (coin, i) {
    return "<div id=\"" + coin.name + "\">\n                    <div class=\"card\" style=\"width: 18rem;\">\n                        <div class=\"card-body\">\n    \n                            <div class=\"d-flex justify-content-between\"> \n                            <h5 class=\"card-title\">" + coin.symbol + "</h5> \n                                <label class=\"switch\">\n                                <input id=\"checkbox-" + coin.symbol + "\" type=\"checkbox\"  onclick=favoriteCoins(\"" + coin.symbol + "\")>\n                                <span class=\"slider round\"></span>\n                                </label>\n                            </div>\n    \n                            <p class=\"card-text\">" + coin.name + "</p>\n                            \n                            <p>\n                              <button class=\"btn btn-primary\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapseExample" + coin.id + "\" aria-expanded=\"false\" aria-controls=\"collapseExample\">\n                                 More Info\n                              </button>\n                            </p>\n    \n                            <div class=\"collapse\" id=\"collapseExample" + coin.id + "\">\n                                <div class=\"card card-body\" id=\"childContent-" + coin.id + "\">\n                                </div>\n                            </div>\n                        \n                        </div>\n                    </div>\n                </div>";
};
var buildModalHTML = function (id, favCoins) {
    "\n  ";
};
