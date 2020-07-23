const container = document.querySelector('.coin-container');

start = 0;
end = 50;

// 조건에 저숫자에 해당하는 array 있는지도 체크하게 하기. 그만큼 넘길 사람도 없겠지만;
// 로딩 구현하기
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
};

const giveData = json => {
	json.forEach(coin => {
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
				return response.json();
			}
		})
		.then(json => giveData(json))
		.catch(error => console.log(error));
};

getData();
