const giveData = (name, money, price) => {
	console.log(name, money, price);
};

const init = () => {
	fetch(`https://api.coinpaprika.com/v1/tickers`)
		.then(response => {
			if (response && response.ok) {
				return response.json();
			}
		})
		.then(json => {
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
				giveData(name, money, price);
			});
		})
		.catch(error => console.log(error));
};

init();
