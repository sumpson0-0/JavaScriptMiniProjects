const container = document.querySelector('.coin-container');
const loadingSpan = document.querySelector('.loading');

let loading = false;
let start = 0;
let end = 48;

const handleScroll = () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

	if (scrollTop + clientHeight >= scrollHeight - 1) {
		start = start + 49;
		end = end + 49;
		loading = false;
		init();
	}
};

const createContent = (name, kind, value) => {
	const content = document.createElement('article');
	content.className = 'coin';
	const coin = document.createElement('h4');
	coin.className = 'name';
	coin.innerText = name;
	const div = document.createElement('div');
	div.className = 'price-container';
	const money = document.createElement('p');
	money.className = 'money';
	money.innerText = kind;
	const price = document.createElement('p');
	price.className = 'price';
	price.innerText = `$${value}`;
	content.appendChild(coin);
	div.appendChild(money);
	div.appendChild(price);
	content.appendChild(div);
	container.appendChild(content);
	if (loading) {
		loadingSpan.classList.remove('show');
	}
	window.addEventListener('scroll', handleScroll);
};

const giveData = result => {
	result.forEach(coin => {
		const name = coin.name;
		const {
			quotes,
			quotes: {
				USD: { price },
			},
		} = coin;
		const keys = Object.keys(quotes);
		const money = keys[0];
		createContent(name, money, price);
	});
};

const getData = () => {
	fetch(`https://api.coinpaprika.com/v1/tickers`)
		.then(response => {
			if (response && response.ok) {
				loading = true;
				return response.json();
			}
		})
		.then(json => {
			const result = json.slice(start, end);
			giveData(result);
		})
		.catch(error => console.log(error));
};

const init = () => {
	if (loading === false) {
		loadingSpan.classList.add('show');
		window.removeEventListener('scroll', handleScroll);
		getData();
	}
};

init();
