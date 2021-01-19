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
    }

    catch (err) {
        console.log(err);
    }

}

function setCards() { // Sets the cards 
    const cardsContainer = document.getElementById('cards-container')

    for (let i = 0; i < allCoins.length; i++) { // Looping through all Coins and making a card with each one 
        if (i <= 100) { //~ Limited for the first 100 coins at the moment
            const cardDiv = document.createElement('div')
            cardDiv.className = 'col-4'
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

    print() {
        console.log(`
        image Url: ${this.img}
        Usd price: ${this.usd}
        Eur Price: ${this.eur}
        Ils Price: ${this.ils}
        `);
    }

    storage() {

    }

}


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
    `<div id="${coin.name}" class="col-4">
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
    
                            <div class="d-flex justify-content-between"> 
                            <h5 class="card-title">${coin.symbol}</h5> 
                                <label class="switch">
                                <input type="checkbox" onclick=>
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
