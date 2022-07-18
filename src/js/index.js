"use strict"

import { clock, getRandomInt, counterDiv, createButton, httpGET } from './utils.js';
import { TODO_KEY, PROGRESS_KEY, DONE_KEY } from './constants.js';


const cardTodo = document.getElementById('card-todo');
const sumTodo = document.getElementById('card-todo-item-sum');
const cardsTodoTask = document.getElementById('card-todo-task');
const todoAdd = document.getElementById('card-todo-add');
const todoCreate = document.getElementById('card-todo-create');
const confirmBtn = document.getElementById('card-todo-create-activ-btn-confirm');
const replaceBtn = document.getElementById(`card-todo-create-activ-btn-replace`);
const todoCancel = document.getElementById('card-todo-create-activ-btn-cancel');
const cardProgress = document.getElementById('card-progress');
const sumProgress = document.getElementById(`card-progress-item-sum`);
const cardsProgressTask = document.getElementById('card-progress-task');
const cardsDoneTask = document.getElementById('card-done-task');
const sumDone = document.getElementById(`card-done-item-sum`);
const doneDelete = document.getElementById('card-done-delete');
const titleAdd = document.getElementById('title-add');
const descriptionAdd = document.getElementById('description-add');
const selectUsers = document.getElementById('card-todo-create-activ-users-select');
const warning = document.getElementById('warning');
const warningCancel = document.getElementById('warning-cancel');
const warningDeleteAll = document.getElementById('warning-delete');
const saveTodo = JSON.parse(localStorage.getItem(TODO_KEY));
const saveProgress = JSON.parse(localStorage.getItem(PROGRESS_KEY));
const saveDone = JSON.parse(localStorage.getItem(DONE_KEY));
const url = 'https://jsonplaceholder.typicode.com/users';










clock();

function checkLocal(a) {
	if (!JSON.parse(localStorage.getItem(a))) {
		localStorage.setItem(a, JSON.stringify([]));
	}
}
checkLocal(TODO_KEY);
checkLocal(PROGRESS_KEY);
checkLocal(DONE_KEY);




function startingСounterDiv(sumTodo, parse) {
	sumTodo.innerHTML = '';
	if (!parse) {
		sumTodo.innerHTML = '0'
	} else {
		let sumTodoDiv = parse.length;
		sumTodo.append(sumTodoDiv);
	}
}
startingСounterDiv(sumTodo, saveTodo);
startingСounterDiv(sumProgress, saveProgress);
startingСounterDiv(sumDone, saveDone);






const todoCardCreate = (todo, backD, compD, editD, deleteD, pushD) => {
	const todoWrap = document.createElement('div');
	const todoTitle = document.createTextNode(todo.title);
	const todoDescription = document.createTextNode(todo.description);
	const todoWrapTitle = document.createElement('div');
	const todoWrapTitleText = document.createElement('div');

	const todoWrapTitleBtn = document.createElement('div');
	const todoWrapDescription = document.createElement('div');
	const todoWrapDescriptionText = document.createElement('div');

	const todoWrapFooter = document.createElement('div');
	const todoWrapFooterUser = document.createElement('div');
	const todoWrapFooterTime = document.createElement('div');
	const todoWrapFooterUserValue = document.createTextNode(todo.user);
	todoWrapFooterTime.append(new Date().getHours() + ":" + new Date().getMinutes() + " " + new Date().getDate() + "." + new Date().getMonth() + "." + new Date().getFullYear());



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

	backButton.style.display = backD;
	completeButton.style.display = compD;
	editButton.style.display = editD;
	deleteButton.style.display = deleteD;
	pushButton.style.display = pushD;

	todoWrap.className = "todo-wrap";
	todoWrap.draggable = "true";
	todoWrapTitle.className = "todo-wrap-title";
	todoWrapTitleText.className = "todo-wrap-title-text";
	todoWrapTitleText.id = `title-${todo.id}`;
	todoWrapTitleBtn.className = "todo-wrap-title-btn";
	todoWrapDescription.className = "todo-wrap-description";
	todoWrapDescriptionText.className = "todo-wrap-description-text";
	todoWrapDescriptionText.id = `description-${todo.id}`;
	todoWrap.id = `todo-${todo.id}`;
	todoWrapFooter.className = "todo-wrap-footer";
	todoWrapFooterUser.className = "todo-wrap-footer-user";
	todoWrapFooterUser.id = `user-${todo.id}`;

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
	todoWrapFooterUser.append(todoWrapFooterUserValue);
	todoWrapFooter.append(todoWrapFooterUser);
	todoWrapFooter.append(todoWrapFooterTime);
	todoWrap.append(todoWrapDescription);
	todoWrap.append(todoWrapFooter);
	return todoWrap;



}







todoAdd.addEventListener('click', function () {
	todoCreate.style.display = "flex";
	confirmBtn.style.display = "flex";
	replaceBtn.style.display = "none";
	titleAdd.value = "";
	descriptionAdd.value = "";
	selectUsers.value = "select-user";
});

todoCancel.addEventListener('click', function () {
	todoCreate.style.display = "none";
});

httpGET(url);





confirmBtn.addEventListener('click', function () {
	if (titleAdd.value && descriptionAdd.value && selectUsers.value != "select-user") {
		const newTodo = { id: (new Date).valueOf(), title: titleAdd.value, description: descriptionAdd.value, user: selectUsers.value };
		const saveTodo = JSON.parse(localStorage.getItem(TODO_KEY));
		const todoToSave = saveTodo ? [newTodo, ...saveTodo] : [newTodo];
		localStorage.setItem(TODO_KEY, JSON.stringify(todoToSave));

		const newTodoHTML = todoCardCreate(newTodo, `none`, `none`, `flex`, `flex`, `flex`);
		newTodoHTML.style.backgroundColor = 'rgba(' + getRandomInt(0, 255) + ', ' + getRandomInt(0, 255) + ', ' + getRandomInt(0, 255) + '0.1' + ')';
		cardsTodoTask.append(newTodoHTML);
		dragAndDrop();
	} else { alert('Введите текст') }

	todoCreate.style.display = "none";

	counterDiv(sumTodo, cardsTodoTask);


});













cardTodo.addEventListener('click', (event) => {
	if (event.target.nodeName === 'BUTTON') {

		const action = event.target.id.split('-')[0];
		const todoId = event.target.id.split('-')[1];
		const todoWrap = document.getElementById(`todo-${todoId}`);
		const savedTodo = JSON.parse(localStorage.getItem(TODO_KEY));
		const oldTodoProgres = JSON.parse(localStorage.getItem(PROGRESS_KEY));


		if (action === 'delete') {
			cardsTodoTask.removeChild(todoWrap);

			const todoToSave = [];
			savedTodo.forEach(function (element) {
				if (element.id != todoId) {
					todoToSave.push(element);

				}
			})


			localStorage.setItem(TODO_KEY, JSON.stringify(todoToSave));
			counterDiv(sumTodo, cardsTodoTask);





		} else if (action === 'edit') {
			todoCreate.style.display = "flex";
			confirmBtn.style.display = "none";
			replaceBtn.style.display = "flex";

			document.getElementById(`title-add`).value = document.getElementById(`title-${todoId}`).textContent;
			document.getElementById(`description-add`).value = document.getElementById(`description-${todoId}`).textContent;
			selectUsers.value = document.getElementById(`user-${todoId}`).textContent;
			replaceBtn.addEventListener('click', function () {
				let titleId = document.getElementById(`title-${todoId}`);
				let descriptionId = document.getElementById(`description-${todoId}`);
				let selectId = document.getElementById(`user-${todoId}`)

				while (titleId.firstChild) {
					titleId.removeChild(titleId.firstChild);
				};
				while (descriptionId.firstChild) {
					descriptionId.removeChild(descriptionId.firstChild);
				};
				while (selectId.firstChild) {
					selectId.removeChild(selectId.firstChild);
				};

				const todoTitle = document.createTextNode(titleAdd.value);
				const todoDescription = document.createTextNode(descriptionAdd.value);
				const todoUser = document.createTextNode(selectUsers.value);
				document.getElementById(`title-${todoId}`).append(todoTitle);
				document.getElementById(`description-${todoId}`).append(todoDescription);
				document.getElementById(`user-${todoId}`).append(todoUser);
				todoCreate.style.display = "none";
			})

		} else {
			if (cardsProgressTask.childElementCount > 5) {
				alert('Сделайте остальные задачи')
			} else {
				cardsProgressTask.append(todoWrap);

				const todoToSaveNew = [];
				savedTodo.forEach(function (element) {
					if (element.id != todoId) {
						todoToSaveNew.push(element);
					}
				})

				const newTodoProgres = { id: todoId, title: document.getElementById(`title-${todoId}`).textContent, description: document.getElementById(`description-${todoId}`).textContent, user: document.getElementById(`user-${todoId}`).textContent };
				const todoToSaveProgress = oldTodoProgres ? [newTodoProgres, ...oldTodoProgres] : [newTodoProgres];

				localStorage.setItem(PROGRESS_KEY, JSON.stringify(todoToSaveProgress));
				localStorage.setItem(TODO_KEY, JSON.stringify(todoToSaveNew));

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
			}


			counterDiv(sumTodo, cardsTodoTask);
			counterDiv(sumProgress, cardsProgressTask);
			console.log(cardsProgressTask.childElementCount);
		}

	}
})



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

		const savedTodo = JSON.parse(localStorage.getItem(PROGRESS_KEY));





		if (action === 'back') {
			cardsTodoTask.append(todoWrap);
			todoWrap.className = `todo-wrap`;
			todoWrap.style.backgroundColor = 'rgba(' + getRandomInt(0, 255) + ', ' + getRandomInt(0, 255) + ', ' + getRandomInt(0, 255) + '0.1' + ')';
			pushButton.style.display = `flex`;
			editButton.style.display = `flex`;
			deleteButton.style.display = `flex`;
			backButton.style.display = `none`;
			completeButton.style.display = `none`;


			const todoToSave = [];
			savedTodo.forEach(function (element) {
				if (element.id != todoId) {
					todoToSave.push(element);

				}
			})
			localStorage.setItem(PROGRESS_KEY, JSON.stringify(todoToSave));


			const oldTodo = JSON.parse(localStorage.getItem(TODO_KEY));
			const newTodo = { id: todoId, title: document.getElementById(`title-${todoId}`).textContent, description: document.getElementById(`description-${todoId}`).textContent, user: document.getElementById(`user-${todoId}`).textContent };
			const todoToSaveAdd = oldTodo ? [newTodo, ...oldTodo] : [newTodo];

			localStorage.setItem(TODO_KEY, JSON.stringify(todoToSaveAdd));




			counterDiv(sumTodo, cardsTodoTask);
			counterDiv(sumProgress, cardsProgressTask);


		} else if (action === 'complete') {
			cardsDoneTask.append(todoWrap);
			todoWrap.className = `todo-wrap done`;
			todoWrap.style.backgroundColor = `background-color: rgba(38, 226, 243, 0.2)`;
			pushButton.style.display = `none`;
			editButton.style.display = `none`;
			deleteButton.style.display = `flex`;
			backButton.style.display = `none`;
			completeButton.style.display = `none`;

			const todoToSaveNew = [];
			savedTodo.forEach(function (element) {
				if (element.id != todoId) {
					todoToSaveNew.push(element);
				}
			})

			const oldTodoDone = JSON.parse(localStorage.getItem(DONE_KEY));
			const newTodoDone = { id: todoId, title: document.getElementById(`title-${todoId}`).textContent, description: document.getElementById(`description-${todoId}`).textContent, user: document.getElementById(`user-${todoId}`).textContent };
			const todoToSaveDone = oldTodoDone ? [newTodoDone, ...oldTodoDone] : [newTodoDone];
			localStorage.setItem(DONE_KEY, JSON.stringify(todoToSaveDone));
			localStorage.setItem(PROGRESS_KEY, JSON.stringify(todoToSaveNew));




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
		const savedTodo = JSON.parse(localStorage.getItem(DONE_KEY));

		if (action === 'delete') {
			cardsDoneTask.removeChild(todoWrap);

			const todoToSaveDone = [];
			savedTodo.forEach(function (element) {
				if (element.id != todoId) {
					todoToSaveDone.push(element);
				}
			})
			localStorage.setItem(DONE_KEY, JSON.stringify(todoToSaveDone));


			counterDiv(sumDone, cardsDoneTask);
		}
	}
})


doneDelete.addEventListener('click', function () {
	warning.style.display = "flex";

});

warningCancel.addEventListener('click', function () {
	warning.style.display = "none";
});

warningDeleteAll.addEventListener('click', function () {
	cardsTodoTask.replaceChildren();
	cardsProgressTask.replaceChildren();
	cardsDoneTask.replaceChildren();

	localStorage.setItem(TODO_KEY, JSON.stringify([]));
	localStorage.setItem(PROGRESS_KEY, JSON.stringify([]));
	localStorage.setItem(DONE_KEY, JSON.stringify([]));

	warning.style.display = "none";
	counterDiv(sumTodo, cardsTodoTask);
	counterDiv(sumProgress, cardsProgressTask);
	counterDiv(sumDone, cardsDoneTask);
});



const initialPtrintTodo = () => {
	const savedTodo = JSON.parse(localStorage.getItem(TODO_KEY));
	if (savedTodo) {
		savedTodo.forEach(todo => {
			const todoWrapper = todoCardCreate(todo, `none`, `none`, `flex`, `flex`, `flex`);
			cardsTodoTask.append(todoWrapper);
			todoWrapper.style.backgroundColor = 'rgba(' + getRandomInt(0, 255) + ', ' + getRandomInt(0, 255) + ', ' + getRandomInt(0, 255) + '0.1' + ')';
		});
	}

}
initialPtrintTodo();

const initialPtrintTodoProgress = () => {
	const savedTodo = JSON.parse(localStorage.getItem(PROGRESS_KEY));
	if (savedTodo) {
		savedTodo.forEach(todo => {
			const todoWrapper = todoCardCreate(todo, `flex`, `flex`, `none`, `none`, `none`);
			cardsProgressTask.append(todoWrapper);
			todoWrapper.style.backgroundColor = `rgba(200, 194, 194, 0.4)`;
		});
	}

}
initialPtrintTodoProgress();

const initialPtrintTodoDone = () => {
	const savedTodo = JSON.parse(localStorage.getItem(DONE_KEY));
	if (savedTodo) {
		savedTodo.forEach(todo => {
			const todoWrapper = todoCardCreate(todo, `none`, `none`, `none`, `flex`, `none`);
			cardsDoneTask.append(todoWrapper);
			todoWrapper.style.backgroundColor = `rgba(38, 226, 243, 0.2)`;
		});
	}

}
initialPtrintTodoDone();



const dragAndDrop = () => {
	const todoItems = document.getElementsByClassName('todo-wrap');
	const choice = document.getElementsByClassName('choice');
	let dragItem = ``;






	for (let i of todoItems) {
		i.addEventListener('dragstart', dragStart);
		i.addEventListener('dragend', dragEnd);

	}
	function dragStart() {
		dragItem = this;
		setTimeout(() => this.style.display = "none", 100);


	};



	function dragEnd() {
		setTimeout(() => this.style.display = "flex", 100);
		dragItem = ``;


	};
	for (j of choice) {
		j.addEventListener('dragover', dragOver);
		j.addEventListener('dragenter', dragEnter);
		j.addEventListener('dragleave', dragLeave);
		j.addEventListener('drop', Drop);
		counterDiv(sumTodo, cardsTodoTask);
		counterDiv(sumProgress, cardsProgressTask);
		counterDiv(sumDone, cardsDoneTask);
	}
	function Drop() {
		const todoId = dragItem.id.split('-')[1];

		const savedTodo = JSON.parse(localStorage.getItem(TODO_KEY));
		const savedProgress = JSON.parse(localStorage.getItem(PROGRESS_KEY));
		const savedDone = JSON.parse(localStorage.getItem(DONE_KEY));

		const todoToSave = [];
		const progressToSave = [];
		const doneToSave = [];
		savedTodo.forEach(function (element) {
			if (element.id != todoId) {
				todoToSave.push(element);
			}
		});
		savedProgress.forEach(function (element) {
			if (element.id != todoId) {
				progressToSave.push(element);
			}
		});
		savedDone.forEach(function (element) {
			if (element.id != todoId) {
				doneToSave.push(element);
			}
		});
		localStorage.setItem(TODO_KEY, JSON.stringify(todoToSave));
		localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressToSave));
		localStorage.setItem(DONE_KEY, JSON.stringify(doneToSave));

		this.append(dragItem);

		const pushButton = document.getElementById(`push-${todoId}`);
		const editButton = document.getElementById(`edit-${todoId}`);
		const deleteButton = document.getElementById(`delete-${todoId}`);
		const backButton = document.getElementById(`back-${todoId}`);
		const completeButton = document.getElementById(`complete-${todoId}`);




		if (this.className === cardsTodoTask.className) {
			pushButton.style.display = `flex`;
			editButton.style.display = `flex`;
			deleteButton.style.display = `flex`;
			backButton.style.display = `none`;
			completeButton.style.display = `none`;
			document.getElementById(`todo-${todoId}`).style.backgroundColor = 'rgba(' + getRandomInt(0, 255) + ', ' + getRandomInt(0, 255) + ', ' + getRandomInt(0, 255) + '0.1' + ')';
			const oldTodo = JSON.parse(localStorage.getItem(TODO_KEY));
			const newTodo = { id: todoId, title: document.getElementById(`title-${todoId}`).textContent, description: document.getElementById(`description-${todoId}`).textContent, user: document.getElementById(`user-${todoId}`).textContent };
			const todoToSaveAdd = oldTodo ? [newTodo, ...oldTodo] : [newTodo];
			localStorage.setItem(TODO_KEY, JSON.stringify(todoToSaveAdd));


		} else if (this.className === cardsProgressTask.className) {
			pushButton.style.display = `none`;
			editButton.style.display = `none`;
			deleteButton.style.display = `none`;
			backButton.style.display = `flex`;
			completeButton.style.display = `flex`;
			document.getElementById(`todo-${todoId}`).style.backgroundColor = `rgba(200, 194, 194, 0.4)`;
			const oldTodoProgres = JSON.parse(localStorage.getItem(DONE_KEY));
			const newTodoProgres = { id: todoId, title: document.getElementById(`title-${todoId}`).textContent, description: document.getElementById(`description-${todoId}`).textContent, user: document.getElementById(`user-${todoId}`).textContent };
			const todoToSaveProgress = oldTodoProgres ? [newTodoProgres, ...oldTodoProgres] : [newTodoProgres];

			localStorage.setItem(PROGRESS_KEY, JSON.stringify(todoToSaveProgress));
		} else if (this.className === cardsDoneTask.className) {
			pushButton.style.display = `none`;
			editButton.style.display = `none`;
			deleteButton.style.display = `flex`;
			backButton.style.display = `none`;
			completeButton.style.display = `none`;
			document.getElementById(`todo-${todoId}`).style.backgroundColor = `rgba(38, 226, 243, 0.2)`;
			const oldTodoDone = JSON.parse(localStorage.getItem(DONE_KEY));
			const newTodoDone = { id: todoId, title: document.getElementById(`title-${todoId}`).textContent, description: document.getElementById(`description-${todoId}`).textContent, user: document.getElementById(`user-${todoId}`).textContent };
			const todoToSaveDone = oldTodoDone ? [newTodoDone, ...oldTodoDone] : [newTodoDone];
			localStorage.setItem(DONE_KEY, JSON.stringify(todoToSaveDone));
		}

		counterDiv(sumTodo, cardsTodoTask);
		counterDiv(sumProgress, cardsProgressTask);
		counterDiv(sumDone, cardsDoneTask);
	}
	function dragOver(e) {
		e.preventDefault();
		
	}
	function dragEnter(e) {
		e.preventDefault();
	}
	function dragLeave() {
		
	}


};

dragAndDrop();