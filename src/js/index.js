"use strict"

function clock() {
	let date = new Date(),
		hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
		minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
	document.getElementById('clock').innerHTML = hours + ':' + minutes;
}
setInterval(clock, 1000);
clock();

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

const createButton = (text, className) => {
	const button = document.createElement('button');
	const description = document.createTextNode(text);
	button.className = className;
	button.append(description);
	return button;
}

const todoCardCreate = (todo) => {
	const todoWrap = document.createElement('div');
	const todoTitle = document.createTextNode(todo.title);
	const todoDescription = document.createTextNode(todo.description);
	const todoWrapTitle = document.createElement('div');
	const todoWrapTitleText = document.createElement('div');

	const todoWrapTitleBtn = document.createElement('div');
	const todoWrapDescription = document.createElement('div');
	const todoWrapDescriptionText = document.createElement('div');

	const todoWrapFooter = document.createElement('div');
	todoWrapFooter.append(new Date().getHours() + ":" + new Date().getMinutes() + " " + new Date().getDate() + "." + new Date().getMonth() + "." + new Date().getFullYear());



	const editButton = createButton('EDIT', 'todo-button edit');
	editButton.id = `edit-${todo.id}`;
	const deleteButton = createButton('DELETE', 'todo-button delete');
	deleteButton.id = `delete-${todo.id}`;
	const backButton = createButton('BACK', 'todo-button back');
	backButton.id = `back-${todo.id}`;
	const completeButton = createButton('COMPLETE', 'todo-button complete');
	completeButton.id = `complete-${todo.id}`;
	const pushButton = createButton('>', 'todo-button push');
	pushButton.id = `push-${todo.id}`;

	backButton.style.display = `none`;
	completeButton.style.display = `none`;

	todoWrap.className = "todo-wrap";
	todoWrapTitle.className = "todo-wrap-title";
	todoWrapTitleText.className = "todo-wrap-title-text";
	todoWrapTitleText.id = `title-${todo.id}`;
	todoWrapTitleBtn.className = "todo-wrap-title-btn";
	todoWrapDescription.className = "todo-wrap-description";
	todoWrapDescriptionText.className = "todo-wrap-description-text";
	todoWrapDescriptionText.id = `description-${todo.id}`;
	todoWrap.id = `todo-${todo.id}`;

	todoWrapTitleText.append(todoTitle);
	todoWrapTitle.append(todoWrapTitleText);
	todoWrapTitleBtn.append(editButton);
	todoWrapTitleBtn.append(deleteButton);
	todoWrapTitleBtn.append(backButton);
	todoWrapTitleBtn.append(completeButton);
	todoWrapTitle.append(todoWrapTitleBtn);
	todoWrap.append(todoWrapTitle);

	todoWrapDescriptionText.append(todoDescription);
	todoWrapDescription.append(todoWrapDescriptionText);
	todoWrapDescription.append(pushButton);
	todoWrap.append(todoWrapDescription);
	todoWrap.append(todoWrapFooter);
	return todoWrap;



}





const todoAdd = document.getElementById('card-todo-add');
const todoCreate = document.getElementById('card-todo-create');
todoAdd.addEventListener('click', function () {
	todoCreate.style.display = "flex";
	confirmBtn.style.display = "flex";
	replaceBtn.style.display = "none";
	titleAdd.value = "";
	descriptionAdd.value = "";
});

const todoCancel = document.getElementById('card-todo-create-activ-btn-cancel');
todoCancel.addEventListener('click', function () {
	todoCreate.style.display = "none";
});

const cardsTodoTask = document.getElementById('card-todo-task');
const cardsProgressTask = document.getElementById('card-progress-task');
const cardsDoneTask = document.getElementById('card-done-task');


const sumTodo = document.getElementById('card-todo-item-sum');
const sumProgress = document.getElementById(`card-progress-item-sum`);
const sumDone = document.getElementById(`card-done-item-sum`);


function counterDiv(sumTodo, cardsTodoTask) {
	sumTodo.innerHTML = '';
	let sumTodoDiv = cardsTodoTask.childElementCount;
	sumTodo.append(sumTodoDiv);
}

const titleAdd = document.getElementById('title-add');
const descriptionAdd = document.getElementById('description-add');
const confirmBtn = document.getElementById('card-todo-create-activ-btn-confirm');
confirmBtn.addEventListener('click', function () {
	let newTodo = todoCardCreate({ id: (new Date).valueOf(), title: titleAdd.value, description: descriptionAdd.value })
	newTodo.style.backgroundColor = 'rgba(' + getRandomInt(0, 255) + ', ' + getRandomInt(0, 255) + ', ' + getRandomInt(0, 255) + '0.1' + ')';
	cardsTodoTask.append(newTodo);
	todoCreate.style.display = "none";
	counterDiv(sumTodo, cardsTodoTask);
});





const cardTodo = document.getElementById('card-todo');

const replaceBtn = document.getElementById(`card-todo-create-activ-btn-replace`);




cardTodo.addEventListener('click', (event) => {
	if (event.target.nodeName === 'BUTTON') {

		const action = event.target.id.split('-')[0];
		const todoId = event.target.id.split('-')[1];
		const todoWrap = document.getElementById(`todo-${todoId}`);
		if (action === 'delete') {
			cardsTodoTask.removeChild(todoWrap);
			counterDiv(sumTodo, cardsTodoTask);
		} else if (action === 'edit') {
			todoCreate.style.display = "flex";
			confirmBtn.style.display = "none";
			replaceBtn.style.display = "flex";

			document.getElementById(`title-add`).value = document.getElementById(`title-${todoId}`).textContent;
			document.getElementById(`description-add`).value = document.getElementById(`description-${todoId}`).textContent;
			replaceBtn.addEventListener('click', function () {
				let titleId = document.getElementById(`title-${todoId}`);
				let descriptionId = document.getElementById(`description-${todoId}`);

				while (titleId.firstChild) {
					titleId.removeChild(titleId.firstChild);
				}
				while (descriptionId.firstChild) {
					descriptionId.removeChild(descriptionId.firstChild);
				}

				const todoTitle = document.createTextNode(titleAdd.value);
				const todoDescription = document.createTextNode(descriptionAdd.value);
				document.getElementById(`title-${todoId}`).append(todoTitle);
				document.getElementById(`description-${todoId}`).append(todoDescription);
				todoCreate.style.display = "none";
			})

		} else {
			cardsProgressTask.append(todoWrap);
			todoWrap.className += ` progress`;
			todoWrap.style.backgroundColor = `rgba(200, 194, 194, 0.4)`;
			const pushButton = document.getElementById(`push-${todoId}`);
			const editButton = document.getElementById(`edit-${todoId}`);
			const deleteButton = document.getElementById(`delete-${todoId}`);
			const backButton = document.getElementById(`back-${todoId}`);
			const completeButton = document.getElementById(`complete-${todoId}`);


			pushButton.style.display = `none`;
			editButton.style.display = `none`;
			deleteButton.style.display = `none`;
			backButton.style.display = `flex`;
			completeButton.style.display = `flex`;
			counterDiv(sumTodo, cardsTodoTask);
			counterDiv(sumProgress, cardsProgressTask);


		}
	}
})

const cardProgress = document.getElementById('card-progress');

cardProgress.addEventListener('click', (event) => {
	if (event.target.nodeName === 'BUTTON') {
		const action = event.target.id.split('-')[0];
		const todoId = event.target.id.split('-')[1];
		const todoWrap = document.getElementById(`todo-${todoId}`);
		const pushButton = document.getElementById(`push-${todoId}`);
		const editButton = document.getElementById(`edit-${todoId}`);
		const deleteButton = document.getElementById(`delete-${todoId}`);
		const backButton = document.getElementById(`back-${todoId}`);
		const completeButton = document.getElementById(`complete-${todoId}`);
		if (action === 'back') {
			cardsTodoTask.append(todoWrap);
			todoWrap.className = `todo-wrap`;
			todoWrap.style.backgroundColor = 'rgba(' + getRandomInt(0, 255) + ', ' + getRandomInt(0, 255) + ', ' + getRandomInt(0, 255) + '0.1' + ')';
			pushButton.style.display = `flex`;
			editButton.style.display = `flex`;
			deleteButton.style.display = `flex`;
			backButton.style.display = `none`;
			completeButton.style.display = `none`;
			counterDiv(sumProgress, cardsProgressTask);
		} else if (action === 'complete') {
			cardsDoneTask.append(todoWrap);
			todoWrap.className = `todo-wrap done`;
			todoWrap.style.backgroundColor = `rgba(100, 194, 194, 0.2)`;
			pushButton.style.display = `none`;
			editButton.style.display = `none`;
			deleteButton.style.display = `flex`;
			backButton.style.display = `none`;
			completeButton.style.display = `none`;
			counterDiv(sumProgress, cardsProgressTask);
			counterDiv(sumDone, cardsDoneTask);
		}
	}
})

cardsDoneTask.addEventListener('click', (event) => {
	if (event.target.nodeName === 'BUTTON') {
		const action = event.target.id.split('-')[0];
		const todoId = event.target.id.split('-')[1];
		const todoWrap = document.getElementById(`todo-${todoId}`);
		if (action === 'delete') {
			cardsDoneTask.removeChild(todoWrap);
			counterDiv(sumDone, cardsDoneTask);
		}
	}
})

const doneDelete = document.getElementById('card-done-delete');
const warning = document.getElementById('warning');
doneDelete.addEventListener('click', function () {
	warning.style.display = "flex";

});

const warningCancel = document.getElementById('warning-cancel');
warningCancel.addEventListener('click', function () {
	warning.style.display = "none";
});

const warningDeleteAll = document.getElementById('warning-delete');
warningDeleteAll.addEventListener('click', function () {
	cardsTodoTask.replaceChildren();
	cardsProgressTask.replaceChildren();
	cardsDoneTask.replaceChildren();

	warning.style.display = "none";
	counterDiv(sumTodo, cardsTodoTask);
	counterDiv(sumProgress, cardsProgressTask);
	counterDiv(sumDone, cardsDoneTask);
});
