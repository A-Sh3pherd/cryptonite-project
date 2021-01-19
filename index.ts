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
            cardDiv.innerHTML =
                `<div id="${allCoins[i].name}" class="col-4">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">

                        <div class="d-flex justify-content-between"> 
                        <h5 class="card-title">${allCoins[i].symbol}</h5> 
                            <label class="switch">
                            <input type="checkbox" onclick=>
                            <span class="slider round"></span>
                            </label>
                        </div>

                        <p class="card-text">${allCoins[i].name}</p>
                        
                        <p>
                          <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample${i}" aria-expanded="false" aria-controls="collapseExample" onclick=fn("${allCoins[i].id}")>
                             More Info
                          </button>
                        </p>

                        <div class="collapse" id="collapseExample${i}">
                            <div class="card card-body" id="childContent-${allCoins[i].id}">
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>`

            cardsContainer?.appendChild(cardDiv)
        }

    }

}


class AllCoinsInfo {
    img: string
    usd: number
    eur: number
    ils: number

    constructor(img, usd, eur, ils) {
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
}


async function fn(id: any) {

    try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
        const data = await res.json()

        const selectedCoin = new AllCoinsInfo(data.image.small, data.market_data.current_price.usd, data.market_data.current_price.eur, data.market_data.current_price.ils)

        const childEl = document.getElementById(`childContent-${id}`);
        const text = `
        <img src="${selectedCoin.img}" alt="">
        <br>
        
        <p>
        <strong>Usd Price:</strong> ${selectedCoin.usd} $<br> 
        <strong>Eur Price:</strong> ${selectedCoin.eur} €<br>
        <strong>Ils Price:</strong> ${selectedCoin.ils} ₪
        </p
        `

        childEl.innerHTML = text;
    }

    catch (err) {
        console.log(err);

    }
}





getApiOnLoad() // Running the Get Api Function

