const tableBody = document.querySelector('.table-body');
const userCardTemplate = document.querySelector('.data-user-table');
const userCardContainer = document.querySelector('.data-user-cards-container');
const searchInput = document.querySelector('.data-search');

let users = [];

searchInput.addEventListener('input', event => {
	const value = event.target.value.toLowerCase();
	if (value.length >= 3) {
		users.forEach(user => {
			const isVisible =
				user.id.toString().toLowerCase().includes(value) ||
				user.userId.toString().toLowerCase().includes(value) ||
				user.title.toLowerCase().includes(value) ||
				user.body.toLowerCase().includes(value);
			
			user.element.classList.toggle('hide', !isVisible);
		})
	} else {
		users.forEach(user => {
			user.element.classList.remove('hide');
		})
	}
})

fetch('https://jsonplaceholder.typicode.com/posts')
	.then(res => res.json())
	.then(data => {

		const renderRows = () => {
			tableBody.innerHTML = '';
			users = data.map(user => {
				const card = userCardTemplate.content.cloneNode(true).children[0];

				const userId = card.querySelector('.data-user-id');
				const id = card.querySelector('.data-id');
				const title = card.querySelector('.data-title');
				const message = card.querySelector('.data-message');

				//Insert Content Inside Tags
				userId.textContent = user.userId;
				id.textContent = user.id;
				title.textContent = user.title;
				message.textContent = user.body;

				tableBody.append(card);
				return { userId: user.userId, id: user.id, title: user.title, body: user.body, element: card };
			})
		}

		renderRows();
		//Listening Click on Column Titles
		const userIdHeader = document.querySelector('.user-id-header');
		const idHeader = document.querySelector('.id-header');
		const titleHeader = document.querySelector('.title-header');
		const messageHeader = document.querySelector('.message-header');

		let isSortingByUserIdAscend = true;
		let isSortingByIdAscend = true;
		let isSortingByTitleAscend = true;
		let isSortingByMessageAscend = true;

		//Sorting
		const sortByUserId = () => {
			data.sort((a, b) => {
				if (isSortingByUserIdAscend) {
					return a.userId - b.userId;
				} else {
					return b.userId - a.userId;
				}
			});
			isSortingByUserIdAscend = !isSortingByUserIdAscend;
			renderRows();
		}

		const sortById = () => {
			data.sort((a, b) => {
				if (isSortingByIdAscend) {
					return b.id - a.id;
				} else {
					return a.id - b.id;
				}
			})
			isSortingByIdAscend = !isSortingByIdAscend;
			renderRows();
		}

		const sortByTitle = () => {
			console.log(data)
			data.sort((a, b) => {
				if (isSortingByTitleAscend) {
					return b.title.localeCompare(a.title);
				} else {
					return a.title.localeCompare(b.title);
				}
			})
			isSortingByTitleAscend = !isSortingByTitleAscend;
			renderRows();
		}

		const sortByMessage = () => {
			data.sort((a, b) => {
				if (isSortingByMessageAscend) {
					return b.body.localeCompare(a.body);
				} else {
					return a.body.localeCompare(b.body);
				}
			})
			isSortingByMessageAscend = !isSortingByMessageAscend;
			renderRows();
		}

		userIdHeader.addEventListener('click', sortByUserId);
		idHeader.addEventListener('click', sortById);
		titleHeader.addEventListener('click', sortByTitle);
		messageHeader.addEventListener('click', sortByMessage);

	})
