interface Coin {
    id: string;
    name: string;
    symbol: string;
};

let allCoins: Coin[];


async function getApiOnLoad(): Promise<void> {
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/list') // Fetching the list of all coins
        allCoins = await res.json() // set AllCoins with the api Data we fetched
        setCards() // Setting the card with the wanted data
    } catch (err) {
        console.log(err);
    }
}

function setCards() { // Sets the cards 
    const cardsContainer = document.getElementById('cards-container')

    for (let i = 0; i < allCoins.length; i++) { // Looping through all Coins and making a card with each one 
        if (i <= 100) { //~ Limited for the first 100 coins at the moment
            const cardDiv = document.createElement('div')
            cardDiv.className = 'col-lg-4 col-md-6 col-sm-6 xsm-12'
            cardDiv.innerHTML = buildCardHTML(allCoins[i], i)
            cardDiv.addEventListener('shown.bs.collapse', () => getSpecificCoin(allCoins[i].id));
            cardsContainer?.appendChild(cardDiv)
        }
    }
}


class AllCoinsInfo {
    id: string;
    img: string
    usd: number
    eur: number
    ils: number
    date: Date;

    constructor(img, usd, eur, ils, id?) {
        this.id = id;
        this.img = img
        this.usd = usd
        this.eur = eur
        this.ils = ils
    }
} // Class Ends here


async function getSpecificCoin(id: string) {
    try {
        let selectedCoin: AllCoinsInfo;

        if (localStorage.getItem(id)) {
            console.log('Exists in local storage!');
            const coin = JSON.parse(localStorage.getItem(id));

            if (isTimeDifferenceGreaterThanTwoMinutes(coin.date)) {
                console.log('Coin is old! get new mother fucker.');
                selectedCoin = await fetchSpecificCoin(id);
                saveInLocalStorage(selectedCoin);
            } else {
                console.log('This coin is fresh yo!');
                selectedCoin = coin;
            }
        } else {
            console.log('Dayum, no coin at all. Getting from the server.');
            selectedCoin = await fetchSpecificCoin(id);
            console.log(selectedCoin.id);
            saveInLocalStorage(selectedCoin);
        }

        const childEl = document.getElementById(`childContent-${id}`);
        childEl.innerHTML = buildCoinDeatils(selectedCoin);
    } catch (err) {
        console.log(err);
    }
}

function saveInLocalStorage(coin: AllCoinsInfo): void {
    coin.date = new Date();
    localStorage.setItem(coin.id, JSON.stringify(coin));
}

async function fetchSpecificCoin(id: string): Promise<AllCoinsInfo> {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
    const data = await res.json()
    return new AllCoinsInfo(data.image.small, data.market_data.current_price.usd, data.market_data.current_price.eur, data.market_data.current_price.ils, data.id)
}

function isTimeDifferenceGreaterThanTwoMinutes(date: string): boolean {
    const past = new Date(date).getTime();
    const twoMins = 1000 * 60 * 2;
    return (new Date().getTime() - past) > twoMins;
}

// Favorite Coins Section \\ 
let favCoins = new Array()

function favoriteCoins(id:any) {
    const checkbox: any = document.getElementById(`checkbox-${id}`)

    if (checkbox.checked == true) {
        console.log(`Coins on fav: ${favCoins}`);
        
        if (favCoins.length >= 5) {  // If more than 5 Favorite coins
            alert('Sorry, Too many Favorites')
            checkbox.checked = false 
            
        } else {
            favCoins.push(id)
            console.log(id + ' Has been added to favorite');
        }
    } else {
        
        console.log(id + ' Has Been Removed From Favorite Coins!');

    }

} // Favorite Coins Section Ends Here

async function liveReportsPage()  {
    const cardsContainer = document.getElementById('cards-container')
    cardsContainer.innerHTML = ''

    try {
        const res = await fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${favCoins[0]},${favCoins[1]},${favCoins[2]},${favCoins[3]}, ${favCoins[4]}&tsyms=USD`) // Fetch price of Fav coins
        const data = await res.json()
        console.log(data);
        

    } catch(err) {
        console.error(err)
    }
    

    
    
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

getApiOnLoad() // Running the Get Api Function



// HTML Templating \\
const buildCoinDeatils = (selectedCoin) => `
        <img src="${selectedCoin.img}" alt="">
        <br>
        
        <p>
        <strong>Usd Price:</strong> ${selectedCoin.usd} $<br> 
        <strong>Eur Price:</strong> ${selectedCoin.eur} €<br>
        <strong>Ils Price:</strong> ${selectedCoin.ils} ₪
        </p
        `


const buildCardHTML = (coin, i) =>
    `<div id="${coin.name}">
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
    
                            <div class="d-flex justify-content-between"> 
                            <h5 class="card-title">${coin.symbol}</h5> 
                                <label class="switch">
                                <input id="checkbox-${coin.symbol}" type="checkbox"  onclick=favoriteCoins("${coin.symbol}")>
                                <span class="slider round"></span>
                                </label>
                            </div>
    
                            <p class="card-text">${coin.name}</p>
                            
                            <p>
                              <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample${coin.id}" aria-expanded="false" aria-controls="collapseExample">
                                 More Info
                              </button>
                            </p>
    
                            <div class="collapse" id="collapseExample${coin.id}">
                                <div class="card card-body" id="childContent-${coin.id}">
                                </div>
                            </div>
                        
                        </div>
                    </div>
                </div>`


const buildModalHTML = (id: string, favCoins: any) => {
    `
  `
}
