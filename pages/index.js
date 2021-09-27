const mnemoCurrency = {
  GBP: '£',
  USD: '$'
}

const exchangeRate = {
  GBP: 1,
  USD: 1.38
}

const costObj = {
  '1D1Y': 27.99,
  '1D2Y': 43.99,
  '3D1Y': 35.99,
  '3D2Y': 63.99,
  '5D1Y': 43.99,
  '5D2Y': 71.99
}

const currencySelect = document.querySelector('.header__select');
const currentPriceArray = document.querySelectorAll('.price__value');
const mobileForm = document.querySelector('.form-mobile');
const mobileFormText = mobileForm.querySelector('.form-mobile__container');
const buyContainer = document.querySelector('.buy__container');
const subscribeSelect = document.querySelector('.form__select');
let mobilePrice = mobileForm.querySelector('.form-mobile__price');
const mobileSubscribeSelect = mobileForm.querySelector('.form-mobile__info');

let currentCurrencyRate = exchangeRate[currencySelect.value];

// Реализация смены курса валют

currencySelect.addEventListener('change', (event) => {
  const selectCurrencyRate = exchangeRate[event.target.value];
  const currentPrice = currentPriceArray[1].textContent;
  const currentPriceNoSale = currentPriceArray[0].textContent;

  const currentPriceNum = +currentPrice.slice(1);
  const currentPriceNoSaleNum = +currentPriceNoSale.slice(1);

  const newPrice = currentPriceNum / currentCurrencyRate * selectCurrencyRate;
  const newPriceNoSale = currentPriceNoSaleNum / currentCurrencyRate * selectCurrencyRate;

  for (key in costObj) {
    costObj[key] = costObj[key] / currentCurrencyRate * selectCurrencyRate;
  }

  currentCurrencyRate = selectCurrencyRate;

  currentPriceArray[1].textContent = `${mnemoCurrency[event.target.value]}${newPrice.toFixed(2)}`;
  currentPriceArray[0].textContent = `${mnemoCurrency[event.target.value]}${newPriceNoSale.toFixed(2)}`;
  mobilePrice.textContent = `${mnemoCurrency[event.target.value]}${newPrice.toFixed(2)}`;
})

// Реализация смены устройств/длительности

subscribeSelect.addEventListener('change', (event) => {
  const selectSubscribeCost = costObj[event.target.value];

  currentPriceArray[1].textContent = `${mnemoCurrency[currencySelect.value]}${selectSubscribeCost.toFixed(2)}`;
  currentPriceArray[0].textContent = `${mnemoCurrency[currencySelect.value]}${(selectSubscribeCost * 1.2).toFixed(2)}`;

  mobilePrice.textContent = `${mnemoCurrency[currencySelect.value]}${selectSubscribeCost.toFixed(2)}`;
  const deviceYearArray = event.target.value.split(/D*Y*/);
  const device =  deviceYearArray[0];
  const year =  deviceYearArray[1];

  mobileSubscribeSelect.innerHTML = `${mobilePrice.outerHTML} - ${device} ${device > 1 ? 'Devices' : 'Device'}, ${year} ${year > 1 ? 'Years' : 'Year'}`;
  mobilePrice = mobileForm.querySelector('.form-mobile__price');
})


// Реализация клика по меню

mobileFormText.addEventListener('click', () => {
  mobileForm.classList.add('form-mobile_novisible');
  buyContainer.classList.add('buy__container_visible');

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.buy__container') && !event.target.closest('.form-mobile')) {
      mobileForm.classList.remove('form-mobile_novisible');
      buyContainer.classList.remove('buy__container_visible');
    }
  })
})
