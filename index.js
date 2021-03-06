let listItems = document.querySelector('ul');
let createTaskDiv = document.querySelector('.create-task');
let updateTaskDiv = document.querySelector('.update-task');
let input = document.querySelector('.create-task input');
let updateInput = document.querySelector('.update-task input');

let itemsArr = [];
let itemId = 0;

let currentStatusItem;
//let prioritizeIndex = 0;

// let isCompletedFunc = (e, id) => {
// 	if (e.target.checked) {
// 		//text-decoration-line: line-through;
// 		markAsDone(id);
// 		//task.style.textdecor
// 	} else {
// 		unmarkAsDone(id);
// 	}
// };

function displayList() {
	itemsArr.forEach((item) => {
		displayItem(item);
	});
}

function displayItem(item) {
	let task = document.createElement('li');
	let p = document.createElement('span');
	p.textContent = item.taskName;
	let date = document.createElement('span');
	date.textContent = item.date;
	let deleteButton = document.createElement('button');
	deleteButton.textContent = 'Delete';
	deleteButton.classList.add('btn');
	deleteButton.classList.add('small');
	deleteButton.addEventListener('click', () => {
		deleteItem(item.id);
		listItems.removeChild(task);
	});
	//let updateTaskForm = document.querySelector('.update-task form');
	let updateButton = document.createElement('button');
	updateButton.textContent = 'Edit';
	updateButton.classList.add('btn');
	updateButton.classList.add('small');
	updateButton.addEventListener('click', (e) => {
		// let chosen = parseInt(
		// 	e.currentTarget.parentElement.parentElement.getAttribute('data')
		// );
		updateTaskDiv.classList.remove('hidden');
		input.value = p.textContent;
		currentStatusItem = item;
		//let index = item.id;
	});

	// updateTaskForm.addEventListener('submit', (e) => {
	// 	//let chosen = parseInt(e.currentTarget.parentElement.getAttribute('data'));
	// 	e.preventDefault();
	// 	console.log(e);
	// 	updateForm(item.id, input);
	// 	listItems.innerHTML = '';

	// 	//console.log(listItems);
	// 	displayList();
	// });

	let buttonsContainerDiv = document.createElement('div');
	buttonsContainerDiv.appendChild(updateButton);
	buttonsContainerDiv.appendChild(deleteButton);

	let checkBox = document.createElement('input');
	checkBox.setAttribute('type', 'checkbox');
	task.setAttribute('data', item.id);
	let prioritizeBtn = document.createElement('div');
	prioritizeBtn.classList.add('prioritize-buttons');
	prioritizeBtn.insertAdjacentHTML(
		'afterbegin',
		`<div data="3" class="red"></div>
		<div data="2" class="orange"></div>
		<div data="1" class="yellow"></div>`
	);
	task.appendChild(buttonsContainerDiv);
	task.appendChild(date);
	task.appendChild(p);
	task.appendChild(checkBox);
	task.append(prioritizeBtn);
	listItems.appendChild(task);
	prioritizeBtn.addEventListener('click', (e) => {
		let prioritizeIndex = e.target.getAttribute('data');
		console.log(prioritizeIndex);
		if (prioritizeIndex === '3') {
			p.style.color = 'red';
			date.style.color = 'red';
		} else if (prioritizeIndex === '2') {
			p.style.color = 'orangered';
			date.style.color = 'orangered';
		} else {
			p.style.color = 'yellow';
			date.style.color = 'yellow';
		}
		updatePrioritize(item.id, prioritizeIndex);
	});
	checkBox.addEventListener('change', (e) => {
		if (e.target.checked) {
			task.style.textDecoration = 'line-through';
			markAsDone(item.id);
		} else {
			task.style.textDecoration = 'none';
			unmarkAsDone(item.id);
		}
	});
}

let updateTaskFormBtn = document.querySelector('.update-task button');
updateTaskFormBtn.addEventListener('click', updateFormTask);

function updateFormTask(e) {
	//function(e, task){
	//let chosen = parseInt(e.currentTarget.parentElement.getAttribute('data'));
	e.preventDefault();
	//let id = task.getAttribute('data');

	//updateForm(currentStatusItem.id, input);

	let datetime = getTime();
	updateItem(currentStatusItem.id, updateInput.value, datetime);
	updateTaskDiv.classList.add('hidden');

	let task = document.querySelector(`ul> [data='${currentStatusItem.id}'`);
	//console.log(task);

	task.remove();
	displayItem(currentStatusItem);

	//listItems.innerHTML = '';
	//console.log(listItems);
	//displayList();
}
const addItem = (id, taskName, isCompleted, prioritize, date) => {
	itemsArr.forEach((item) => {
		if (item.id === id) {
			return 'already exists';
		}
	});

	let item = { id, taskName, isCompleted, prioritize, date };
	itemsArr.push(item);
	return item;
};

const deleteItem = (id) => {
	itemsArr.forEach((item, index) => {
		if (item.id === id) {
			itemsArr.splice(index, 1);
			return itemsArr.length;
		}
	});
	return 'error - item not found';
};

function updateItem(id, text, date) {
	//console.log(id);
	itemsArr.forEach((item) => {
		if (item.id === id) {
			item.taskName = text;
			item.date = date;
			return;
		}
	});
}

function updatePrioritize(id, index) {
	itemsArr.forEach((item) => {
		if (item.id === id) {
			item.prioritize = index;
			return;
		}
	});
	return;
}

const markAsDone = (id) => {
	itemsArr.forEach((item) => {
		if (item.id === id) {
			item.isCompleted = true;
			return;
		}
	});
	return;
};

const unmarkAsDone = (id) => {
	itemsArr.forEach((item) => {
		if (item.id === id) {
			item.isCompleted = false;
			return true;
		}
	});

	return false;
};

const sortList = (typeOrder) => {
	let orderList = [];
	let i = 0;
	let j = itemsArr.length - 1;
	if (itemsArr.length < 2) {
		return itemsArr;
	}
	if (typeOrder === 'status') {
		console.log('compl');
		itemsArr.forEach((item) => {
			if (item.isCompleted) {
				orderList.splice(j, 0, item);
				j--;
			} else {
				orderList.splice(i, 0, item);
				i++;
			}
		});
	} else if (typeOrder === 'date') {
		orderList = itemsArr.sort((task1, task2) => task2.date - task1.date);
	} else {
		orderList = itemsArr.sort(
			(task1, task2) => task2.prioritize - task1.prioritize
		);
	}
	console.log(orderList);

	return orderList;
};

function getTime() {
	let currentdate = new Date();
	return (
		'Last Sync: ' +
		currentdate.getDate() +
		'/' +
		(currentdate.getMonth() + 1) +
		'/' +
		currentdate.getFullYear() +
		' ' +
		currentdate.getHours() +
		':' +
		currentdate.getMinutes() +
		':' +
		currentdate.getSeconds()
	);
}
/* Event Lisitener */
//document.addEventListener('DOMContentLoaded', function () {
let addButton = document.querySelector('.add');
addButton.addEventListener('click', () => {
	createTaskDiv.classList.remove('hidden');
});

let createTaskForm = document.querySelector('.create-task form');
createTaskForm.addEventListener('submit', (e) => {
	e.preventDefault();
	let datetime = getTime();
	let item = addItem(itemId, input.value, false, '0', datetime);
	displayItem(item);
	createTaskDiv.classList.add('hidden');
	input.value = '';
	itemId++;
});

// function updateForm(index, input) {
// 	// let input = document.querySelector('.update-task input');
// 	console.log(input.value);
// 	let datetime = getTime();
// 	updateItem(index, input.value, datetime);
// 	updateTaskDiv.classList.add('hidden');
// }

let sortBtn = document.querySelector('.list');
sortBtn.addEventListener('click', (e) => {
	let sortType = e.target.getAttribute('data-sort-type');
	console.log(sortType);
	let newItemsArr = sortList(sortType);
	itemsArr = [...newItemsArr];
	console.log(newItemsArr);
	listItems.innerHTML = '';
	displayList();
});
//});

//module.exports = { addItem, deleteItem };
