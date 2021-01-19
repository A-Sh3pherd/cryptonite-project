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
    for (var i = 0; i < allCoins.length; i++) { // Looping through all Coins and making a card with each one 
        if (i <= 100) { //~ Limited for the first 100 coins at the moment
            var cardDiv = document.createElement('div');
            cardDiv.className = 'col-4';
            cardDiv.innerHTML =
                "<div id=\"" + allCoins[i].name + "\" class=\"col-4\">\n                <div class=\"card\" style=\"width: 18rem;\">\n                    <div class=\"card-body\">\n\n                        <div class=\"d-flex justify-content-between\"> \n                        <h5 class=\"card-title\">" + allCoins[i].symbol + "</h5> \n                            <label class=\"switch\">\n                            <input type=\"checkbox\" onclick=>\n                            <span class=\"slider round\"></span>\n                            </label>\n                        </div>\n\n                        <p class=\"card-text\">" + allCoins[i].name + "</p>\n                        \n                        <p>\n                          <button class=\"btn btn-primary\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapseExample" + i + "\" aria-expanded=\"false\" aria-controls=\"collapseExample\" onclick=fn(\"" + allCoins[i].id + "\")>\n                             More Info\n                          </button>\n                        </p>\n\n                        <div class=\"collapse\" id=\"collapseExample" + i + "\">\n                            <div class=\"card card-body\" id=\"childContent-" + allCoins[i].id + "\">\n                            </div>\n                        </div>\n                    \n                    </div>\n                </div>\n            </div>";
            cardsContainer === null || cardsContainer === void 0 ? void 0 : cardsContainer.appendChild(cardDiv);
        }
    }
}
var AllCoinsInfo = /** @class */ (function () {
    function AllCoinsInfo(img, usd, eur, ils) {
        this.img = img;
        this.usd = usd;
        this.eur = eur;
        this.ils = ils;
    }
    AllCoinsInfo.prototype.print = function () {
        console.log("\n        image Url: " + this.img + "\n        Usd price: " + this.usd + "\n        Eur Price: " + this.eur + "\n        Ils Price: " + this.ils + "\n        ");
    };
    return AllCoinsInfo;
}());
function fn(id) {
    return __awaiter(this, void 0, void 0, function () {
        var res, data, selectedCoin, childEl, text, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://api.coingecko.com/api/v3/coins/" + id)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    selectedCoin = new AllCoinsInfo(data.image.small, data.market_data.current_price.usd, data.market_data.current_price.eur, data.market_data.current_price.ils);
                    childEl = document.getElementById("childContent-" + id);
                    text = "\n        <img src=\"" + selectedCoin.img + "\" alt=\"\">\n        <br>\n        \n        <p>\n        <strong>Usd Price:</strong> " + selectedCoin.usd + " $<br> \n        <strong>Eur Price:</strong> " + selectedCoin.eur + " \u20AC<br>\n        <strong>Ils Price:</strong> " + selectedCoin.ils + " \u20AA\n        </p\n        ";
                    childEl.innerHTML = text;
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    console.log(err_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
getApiOnLoad(); // Running the Get Api Function
