import './styles.css';

const inputCurrency = document.querySelector('#input-currency');
const currenciesListTitle = document.querySelector('.currencies-list-title');
const curreciesList = document.querySelector('.currencies-list');
const form = document.querySelector('form');

const url = 'http://api.exchangerate.host/live?access_key=3630866d1e131cc837414f63e373cfcf&source=';

const getCurrency = async (currency) => {
  if (currency === '') throw new Error('Moeda não informada');
  const response = await fetch(url + currency);
  const data = await response.json();
  if (data.success === false) throw new Error('Moeda não existente');
  currenciesListTitle.textContent = `Valores referentes a 1 ${currency}`;
  return data;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  curreciesList.innerHTML = '';
  currenciesListTitle.textContent = '';
  try {
    const currencyInput = inputCurrency.value;
    const data = await getCurrency(currencyInput);
    const rates = data.quotes;
    let counter = 0;
    for (const rate in rates) {
      if (counter >= 40) break;
      const currencyInput = inputCurrency.value;
      const currency = rate.replace(currencyInput, '');
      const value = rates[rate];
      curreciesList.innerHTML += `
    <div class="currency">
    <div class="currency-icon-name">
      <img src="./src/icon.svg" alt="">
      <p id="currency-name">${currency}</p>
    </div>
    <p id="currency-value">${value.toFixed(3)}</p>
  </div> `;
      counter++;
    }
  } catch (error) {
    Swal.fire({
      title: 'Ops ...',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'OK'
    })
  } finally {
    inputCurrency.value = '';
  }
}
);
