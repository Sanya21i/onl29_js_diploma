

export function clock() {
	let date = new Date(),
		hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
		minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
	document.getElementById('clock').innerHTML = hours + ':' + minutes;
}

export function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

export function counterDiv(sumTodo, savedTodo) {
	sumTodo.innerHTML = '';
	let sumTodoDiv = savedTodo.childElementCount;
	sumTodo.append(sumTodoDiv);
}

export const createButton = (text, className) => {
	const button = document.createElement('button');
	const description = document.createTextNode(text);
	button.className = className;
	button.append(description);
	return button;
}

export const httpGET = (url) => {
	const selectUser = document.getElementById('card-todo-create-activ-users-select');
	let users;

	return fetch(url)
		.then(response => response.json())
		.then(json => {
			users = json;
			users.forEach(user => {
				let option = document.createElement("option");
				option.value = user.name;
				option.innerHTML = user.name;
				selectUser.appendChild(option);

			});
			
	})
	
	}


