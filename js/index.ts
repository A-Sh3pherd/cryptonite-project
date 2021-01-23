// AllCoinsInfo Class 
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

// interface for the Coin
interface Coin {
    id: string;
    name: string;
    symbol: string;
};

let activeContainer = 'ready-set-go'
let allCoins: Coin[];
let allCoinsData: Coin[]
let Swal: any


// This Function runs on load
async function getApiOnLoad(): Promise<void> {
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/list') // Fetching the list of all coins
        allCoins = await res.json() // set AllCoins with the api Data we fetched
        allCoinsData = allCoins

        setCards() // Setting the card with the wanted data
    } catch (err) {
        console.log(err);
    }
}


// Sets the cards ~~ in getApiOnLoad()
function setCards() {
    activeContainer = 'cards-container'
    const cardsContainer = document.getElementById('cards-container')

    for (let i = 0; i < allCoins.length; i++) { // Looping through all Coins and making a card with each one 
        if (i <= 100) { //~ Limited for the first 100 coins at the moment
            let cardDiv = buildCardHTML(allCoins[i], i)
            cardsContainer.append((<any>cardDiv))
        }
    }
}

// Check if on LocalStorage, if not- fetch card and build card
async function getSpecificCoin(id: string, symbol: string) {
    try {
        let selectedCoin: AllCoinsInfo;

        if (localStorage.getItem(id)) { // if Exists in localStorage
            console.log('Exists in local storage!'); // Existance Log
            const coin = JSON.parse(localStorage.getItem(id)); // set coin with the Coins that exists on localStorage

            if (isTimeDifferenceGreaterThanTwoMinutes(coin.date)) { // Check if 2 minutes passed
                console.log('Coin is old! get new mother fucker.'); // Old coin Log
                selectedCoin = await fetchSpecificCoin(id); // fetch the coin data again from the api
                saveInLocalStorage(selectedCoin); // Save the coin in the local storage
            } else { // If coin is in the Local storage but Fresh
                console.log('This coin is fresh yo!'); // Fresh coin Log
                selectedCoin = coin; // Set selectedCoin with the value of coijn
            }
        } else { // if no coins at all in local storage
            console.log('Dayum, no coin at all. Getting from the server.'); // No coins at Local Storage Log
            selectedCoin = await fetchSpecificCoin(id); // Fetch the specific coin data from the api 
            console.log(selectedCoin.id); // Log the name of the selected Coin added to the local storage
            saveInLocalStorage(selectedCoin); // Save the selectedCoin in the localStorage
        }

        $(document.getElementById('loader ' + id)).fadeOut('slow', function () { // Start the loader
            document.getElementById('loader ' + id).remove() // finish the Loader when data is up
        })

        $(`#loader-${symbol}`).fadeOut('slow', function () {
            $(`#loader-${symbol}`).remove()
        })

        const childEl = document.getElementById(`childContent-${id}`); // get the specific child 
        childEl.innerHTML = buildCoinDeatils(selectedCoin); // Set the inner Html of the card with the selectedCoin details
    }
    catch (err) {
        console.log(err);
    }
}

// Save to localStorage Function
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

function favoriteCoins(id: any) {
    const checkbox: any = document.getElementById(`checkbox-${id}`)

    if (checkbox.checked == true) {
        if (favCoins.length >= 5) {  // If more than 5 Favorite coins
            favCoins.push(id)
            tooManyCoins()
            return

        } else {
            favCoins.push(id)
            console.log(id + ' Has been added to favorite');
        }
    } else {
        favCoins = favCoins.filter(coin => coin !== id)
        console.log(id + ' Has Been Removed From Favorite Coins!');
    }

} // Favorite Coins Section Ends Here

async function liveReportsPage() {
    const cardsContainer = document.getElementById('cards-container')
    liveChartCheck()
}

async function getMultipleCoinsData() {
    try {
        const res = await fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${favCoins[0]},${favCoins[1]},${favCoins[2]},${favCoins[3]}, ${favCoins[4]}&tsyms=USD`) // Fetch price of Fav coins
        const data = await res.json()
        return data
    } catch (err) {
        console.error(err)
    }
}

const liveChartCheck = async function () {
    let data = await getMultipleCoinsData()
    let fullData = []
    if (data.Response) {
        alert('יש לבחור לפחות מטבעה אחד לצפייה בלייב רפורטס')
        document.getElementById('nav-home').click()
        return
    }

    for (const coin in data) {
        console.log(coin);

        fullData.push({
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "###.########$",
            xValueFormatString: "hh:mm:ss TT",
            showInLegend: true,
            name: coin,
            dataPoints: []
        })
    }

    var options = {
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

    var chart = (<any>$("#chartContainer")).CanvasJSChart(options);

    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }

    var updateInterval = 2000;
    var time = new Date;

    async function updateChart(count) {
        count = count || 1;
        for (var i = 0; i < count; i++) {
            time.setTime(time.getTime() + updateInterval);
            let yValues = await getMultipleCoinsData()

            // pushing the new values
            let numberOfCoin = 0
            fullData.forEach(coin => {
                coin.dataPoints.push({
                    x: time.getTime(),
                    y: yValues[coin.name].USD
                });
                (<any>options.data[numberOfCoin]).legendText = `${coin.name} - ${yValues[coin.name].USD}$`;
                numberOfCoin++
            });

        }

        // updating legend text with  updated with y Value 
        (<any>$("#chartContainer")).CanvasJSChart().render();
    }
    // generates first set of dataPoints 
    updateChart(10);
    setInterval(function () { updateChart(1) }, updateInterval);
}






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

// Build cards HTML
const buildCardHTML = function (coin, i) {
    let cardDiv = document.createElement('div')
    cardDiv.id = coin.symbol
    cardDiv.className += "col-xl-4 col-lg-6 col-md-12 col-sm-12 xsm-12 mt-2 card-fade";
    cardDiv.innerHTML = `
    
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
    
                            <div class="d-flex justify-content-between"> 
                            <h5 class="card-title">${coin.symbol}</h5> 
                                <label class="switch">
                                <input id="checkbox-${coin.symbol}" type="checkbox"  onclick=favoriteCoins("${coin.symbol}")>
                                <span class="slider round" slider-coin="${coin.symbol}"></span>
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
                                        `

    cardDiv.addEventListener('show.bs.collapse', () => { loader(coin.symbol); });
    cardDiv.addEventListener('show.bs.collapse', () => { getSpecificCoin(coin.id, coin.symbol); });
    return cardDiv
}

const buildAboutPage = () => {
    const about = document.querySelector('.about-container')
    about.innerHTML = `
    <div class="row">
      <div class="col-auto">
        <img id="about-photo" src="/imgs/about-photo.png" alt="">
      </div>
      <div class="col-auto mt-4">
        <p style="margin-left: 100px;">Hello, My name is Alon Shefer and im the developer of this project.</p>
        <p style="margin-left: 130px;">I'm 25 years old, i live happily ever-after in Tel-aviv.</p>
        <p style="margin-left: 150px;">My favorite Quote is: “It's the children the world almost breaks who grow up to save it.”</p>
        <p style="margin-left: 170px;">I truly beleave that with Hard work- EVERYTHING is possible.</p>
        <p style="margin-left: 160px;">and that's what guided me throughout this project.</p>
        <p style="margin-left: 155px;">Now, Sit back and find out what info your looking for,</p>
        <p style="margin-left: 140px;">And we will take care of the rest.</p>
      </div>
    </div>

    <div class="">
      <div class=" mt-5">
        <p class="about-info">In this project, my goal was to make the Crypto-Currency trading-life easier.</p>
        <p class="about-info">In this website you can find information about all the crypto coins in the world !</p>
        <p class="about-info">By selecting your favorite coins you can view a real-time data about the selected coins. </p>
        <p class="about-info">This project simulate a <strong>S</strong>ingle <strong>P</strong>age <strong>A</strong>pplication Principles. </p>
        <p class="about-info"> </p>
      </div>
    </div>
    `
}


// Loader Function
function loader(element) {
    let fadeContainer = document.createElement("div") // creating div
    fadeContainer.classList.add("loader-container-fade") //set div class to loader-container-fade
    fadeContainer.id = 'loader-' + element // gives a special id to each loader

    let loaderContainer = document.createElement("div") // creating a iv
    loaderContainer.classList.add("loader-container") // set div class to loader-container
    fadeContainer.append(loaderContainer); // put the loader container inside the fade container

    let loaderTemplate = document.createElement("div") // creating div
    loaderTemplate.classList.add("loader") // set div class to loader
    loaderContainer.append(loaderTemplate); // put the loaderTemplate inside the loaderContainer

    $(fadeContainer).fadeIn() // fade in the container

    try {
        document.getElementById(element).children[0].append(fadeContainer);
    } catch (error) {
        console.log(error);
    }
}

// Container Change Function
function changeContainer(caller) {
    let container = $(caller).attr('container')
    const sideNav = document.getElementsByClassName('sidenav')
    $(`#${activeContainer}`).fadeOut(850)
    $(`#${container}`).fadeIn(2000)
    activeContainer = container

}
// 
let checked: number = 0;

async function tooManyCoins() {
    checked = 0;
    
    const { value: formValues } = await Swal.fire({
        title: 'Select 5 coins Max',
        html:
            `
          <label for="${favCoins[0]}"> ${favCoins[0]}</label>
          <input type="checkbox" id="swal-input1" class="sweatAlertCheckbox" name="${favCoins[0]}" value="${favCoins[0]}" onclick="checkNumberOfCheckedCoins(this)"><br>
          
          <label for="${favCoins[1]}"> ${favCoins[1]}</label>
          <input type="checkbox" id="swal-input2" class="sweatAlertCheckbox" name="${favCoins[1]}" value="${favCoins[1]}" onclick="checkNumberOfCheckedCoins(this)"><br>
         

          <label for="${favCoins[2]}"> ${favCoins[2]}</label>
          <input type="checkbox" id="swal-input3" class="sweatAlertCheckbox" name="${favCoins[2]}" value="${favCoins[2]}" onclick="checkNumberOfCheckedCoins(this)"><br>
          
          <label for="${favCoins[3]}"> ${favCoins[3]}</label>
          <input type="checkbox" id="swal-input4" class="sweatAlertCheckbox" name="${favCoins[3]}" value="${favCoins[3]}" onclick="checkNumberOfCheckedCoins(this)"><br>
          
          <label for="${favCoins[4]}"> ${favCoins[4]}</label>
          <input type="checkbox" id="swal-input5" class="sweatAlertCheckbox" name="${favCoins[4]}" value="${favCoins[4]}" onclick="checkNumberOfCheckedCoins(this)"><br>
          
          <label for="${favCoins[5]}"> ${favCoins[5]}</label>
          <input type="checkbox" id="swal-input6" class="sweatAlertCheckbox" name="${favCoins[5]}" value="${favCoins[5]}" onclick="checkNumberOfCheckedCoins(this)"><br>
          
          
          `,
        focusConfirm: true,
        preConfirm: () => {
            let zibi: any[] = [];

            (<any>document.getElementById('swal-input1')).checked ? zibi.push((<any>document.getElementById('swal-input1')).value) : $(`[slider-coin="${(<any>document.getElementById('swal-input1')).value}"]`)[0].click();
            (<any>document.getElementById('swal-input2')).checked ? zibi.push((<any>document.getElementById('swal-input2')).value) : $(`[slider-coin="${(<any>document.getElementById('swal-input2')).value}"]`)[0].click();
            (<any>document.getElementById('swal-input3')).checked ? zibi.push((<any>document.getElementById('swal-input3')).value) : $(`[slider-coin="${(<any>document.getElementById('swal-input3')).value}"]`)[0].click();
            (<any>document.getElementById('swal-input4')).checked ? zibi.push((<any>document.getElementById('swal-input4')).value) : $(`[slider-coin="${(<any>document.getElementById('swal-input4')).value}"]`)[0].click();
            (<any>document.getElementById('swal-input5')).checked ? zibi.push((<any>document.getElementById('swal-input5')).value) : $(`[slider-coin="${(<any>document.getElementById('swal-input5')).value}"]`)[0].click();
            (<any>document.getElementById('swal-input6')).checked ? zibi.push((<any>document.getElementById('swal-input6')).value) : $(`[slider-coin="${(<any>document.getElementById('swal-input6')).value}"]`)[0].click();

            favCoins = zibi

            console.log(favCoins);

            return []
        }
    })


}

function checkNumberOfCheckedCoins(caller) {
    if (caller.checked) {
        if (checked != 5) {
            checked++
        }
        else {
            checked++
            alert('You need to select 5 Coins BITCH!')
            caller.click()
        }
    }
    else {
        checked--
    }
}

// Search function (Allways Working)
$("#search-form").on('submit', function (e) {
    e.preventDefault();
    let searchVal = (<any>document.getElementById('search-input')).value
    $('.card-fade').fadeOut('slow');

    if (searchVal == "") {
        $('.card-fade').fadeIn('slow');
        return
    }
    $(`#${searchVal}`).fadeIn()

})



function openNav() {
    document.getElementById('nav-brand-cryptonite').classList.add('nav-brand-move-left')
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("cards-container").style.marginLeft = "250px";
}

// Moving Letters Effects
var textWrapper = document.querySelector('.ml2');
let anime: any
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
anime.timeline({ loop: false })
    .add({
        targets: '.ml2 .letter',
        scale: [4, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 1250,
        delay: (el, i) => 70 * i
    })


// ReadySetGo
var ml4: any = {};
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
    setTimeout(function(){ getApiOnLoad() }, 5500); // Runs Onload !!!