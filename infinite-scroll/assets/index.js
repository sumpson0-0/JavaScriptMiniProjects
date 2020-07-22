const baseUrl = 'https://api.coinpaprika.com/v1';

// cooinsId가 배열이 아니라 string 한 개이고 coin수 만큼 getCoin이라는 함수가 실행되고 있음.
// 그니까 이건 이미 하나의 코인에 대한 함수이기 때문에 또 forEach나 이런거 할 필요가 없어..;
const getCoin = coinId => {
	fetch(`${baseUrl}/coins/${coinId}/markets`)
		.then(response => {
			if (response && response.ok) {
				return response.json();
			}
		})
		.then(json => {
			console.log(json);
		})
		.catch(error => console.log(error));
};

const init = () => {
	fetch(`${baseUrl}/coins`)
		.then(response => {
			if (response && response.ok) {
				return response.json();
			}
		})
		.then(json => {
			json.forEach(coin => {
				const coinId = coin.id;
				getCoin(coinId);
			});
		})
		.catch(error => console.log(error));
};

init();

// 코인 리스트 가져와서 id 딴다음
// 아이디로 markets 가서 pair랑 price 값 얻은 다음
// 그리드로 배치한 html에 해당 값들이 노출되게 하고
// infinite scroll로 계속 나오게 만들기
