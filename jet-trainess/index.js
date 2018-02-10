'use strict';

function ready(fn) {
	if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

var baseData;
var filteredData = {
	employees: []
};
var tableData; //ссылка на текущие данные (исходные данные или отфильтрованные)

var sortedColumn = -1;
var sortDirection = "up";
var opposedSortDirection = "down";
var currentPage = 1;
var linesPerPage = 10; // 10 строк таблицы на страницу

var maxPage = 6; //пагинация: максимум 6 страниц


function readData() {
	
	try {
		baseData = JSON.parse(JSON.stringify(employeesDataJSON), function (key, value) {
			if (key === 'Start date') {
				return new Date(value);
			}
			return value;
		});

		tableData = baseData;

	} catch (err) {
		alert(err);
	}
}

function fillTable() {
	let rows = [];

	//вычисление строк, которые будут загружены в таблицу
	let begin = linesPerPage * (currentPage - 1);
	let end = linesPerPage * currentPage;

	if (tableData.employees.length < end) {
		end = tableData.employees.length;
	}

	//формирование таблицы
	for (let i = begin; i < end; i++) {
		let employee = tableData.employees[i];

		let temp = '<tr><td>' + employee['Name'] + '</td><td>' +
			employee['Position'] + '</td><td>' +
			employee['Office'] + '</td><td>' +
			employee['Age'] + '</td><td>' +
			formatDate(employee['Start date']) + '</td><td>' +
			employee['Salary'].toLocaleString('en-US', {
				style: 'currency',
				currency: 'USD'
			}) + '</td></tr>';

		rows.push(temp);
	}

	//вывод таблицы на страницу
	document.getElementById("js-tbody").innerHTML = rows.join('');

	//сделать кнопки пагинации
	createPaginationButtons();
}

function formatDate(date) {
	//формирование печатной формы даты для таблицы
	let dd = date.getDate();
	if (dd < 10) dd = '0' + dd;

	let mm = date.getMonth() + 1;
	if (mm < 10) mm = '0' + mm;

	let yyyy = date.getFullYear();

	return yyyy + '/' + mm + '/' + dd;
}

function sortInTable(column) {
	let tableHead = document.getElementsByTagName('th');
	let tableBody = document.getElementById('js-tbody').children;

	//сортировка по новому столбцу
	if (sortedColumn != column) {
		switch (column) {
			case 0:
				tableData.employees.sort(function (value1, value2) {
					let str1 = value1.Name.toLowerCase();
					let str2 = value2.Name.toLowerCase();

					if (str1 < str2) return 1;
					if (str1 > str2) return -1;
					return 0;
				});
				break;
			case 1:
				tableData.employees.sort(function (value1, value2) {
					let str1 = value1.Position.toLowerCase();
					let str2 = value2.Position.toLowerCase();

					if (str1 < str2) return 1;
					if (str1 > str2) return -1;
					return 0;
				});
				break;
			case 2:
				tableData.employees.sort(function (value1, value2) {
					let str1 = value1.Office.toLowerCase();
					let str2 = value2.Office.toLowerCase();

					if (str1 < str2) return 1;
					if (str1 > str2) return -1;
					return 0;
				});
				break;
			case 3:
				tableData.employees.sort(function (value1, value2) {
					return value2.Age - value1.Age;
				});
				break;
			case 4:
				tableData.employees.sort(function (value1, value2) {
					return value2["Start date"].valueOf() - value1["Start date"].valueOf();
				});
				break;
			case 5:
				tableData.employees.sort(function (value1, value2) {
					return value2.Salary - value1.Salary;
				});
				break;
		}

		//удаление признака "отсортирован" у предыдущего сортированного столбца
		if (sortedColumn != -1) {
			if (sortDirection === "up") {
				tableHead[sortedColumn].getElementsByClassName(sortDirection)[0].style.borderBottomColor = "#dbdbdb";
				tableHead[sortedColumn].getElementsByClassName(opposedSortDirection)[0].style.borderTopColor = "#dbdbdb";
			} else {
				tableHead[sortedColumn].getElementsByClassName(sortDirection)[0].style.borderTopColor = "#dbdbdb";
				tableHead[sortedColumn].getElementsByClassName(opposedSortDirection)[0].style.borderBottomColor = "#dbdbdb";
			}
		}

		//установление признака "отсортирован" у нового столбца
		sortDirection = "up";
		opposedSortDirection = "down";
		tableHead[column].getElementsByClassName(sortDirection)[0].style.borderBottomColor = "#7c80e3";
		tableHead[column].getElementsByClassName(opposedSortDirection)[0].style.borderTopColor = "transparent";

		for (let i = 0; i < tableBody.length; i += 2) {
			tableBody[i].children[column].style.backgroundColor = "#fafafa";
		}
		for (let i = 1; i < tableBody.length; i += 2) {
			tableBody[i].children[column].style.backgroundColor = "#f1f1f1";
		}
		sortedColumn = column;

	} else { //сортировка по старому столбцу =>  поменять направление сортировки

		if (sortDirection == "up") {
			sortDirection = "down";
			opposedSortDirection = "up";

			tableHead[column].getElementsByClassName(sortDirection)[0].style.borderTopColor = "#7c80e3";
			tableHead[column].getElementsByClassName(opposedSortDirection)[0].style.borderBottomColor = "transparent";
		} else {
			sortDirection = "up";
			opposedSortDirection = "down";

			tableHead[column].getElementsByClassName(sortDirection)[0].style.borderBottomColor = "#7c80e3";
			tableHead[column].getElementsByClassName(opposedSortDirection)[0].style.borderTopColor = "transparent";
		}
	}

	//поменять направление сортировки
	tableData.employees.reverse();

	backToFirstPage();
	fillTable();

	//изменить цвет фона у отсортированного столбца
	for (let i = 0; i < tableBody.length; i += 2) {
		tableBody[i].children[column].style.backgroundColor = "#fafafa";
	}
	for (let i = 1; i < tableBody.length; i += 2) {
		tableBody[i].children[column].style.backgroundColor = "#f1f1f1";
	}
}

function searchInTable() {
	let tableHead = document.getElementsByTagName('th');
	let tableBody = document.getElementById('js-tbody').children;

	//удаление признака "отсортирован" у предыдущего сортированного столбца
	if (sortedColumn != -1) {
		if (sortDirection === "up") {
			tableHead[sortedColumn].getElementsByClassName(sortDirection)[0].style.borderBottomColor = "#dbdbdb";
			tableHead[sortedColumn].getElementsByClassName(opposedSortDirection)[0].style.borderTopColor = "#dbdbdb";
		} else {
			tableHead[sortedColumn].getElementsByClassName(sortDirection)[0].style.borderTopColor = "#dbdbdb";
			tableHead[sortedColumn].getElementsByClassName(opposedSortDirection)[0].style.borderBottomColor = "#dbdbdb";
		}
	}

	//текст-фильтр
	let searchInput = document.getElementById('js-dataFiltration');
	let filter = searchInput.value.toUpperCase();

	//Отфильтрованные данные для таблицы
	if (filter != "") {
		filteredData.employees = []; //обнуление массива для отфильтрованных данных

		for (let i = 0; i < baseData.employees.length; i++) {
			let employee = baseData.employees[i];

			for (let element in employee) {
				let text;
				if (element === "Start date") {
					text = formatDate(employee[element]);
				} else {
					text = employee[element].toString().toUpperCase();
				}

				if (text.indexOf(filter) !== -1) {
					filteredData.employees.push(employee);
					break;
				}
			}
		}
		tableData = filteredData;
	} else {
		tableData = baseData;
	}

	backToFirstPage();
	fillTable();
}

function createPaginationButtons() {
	let numPages = numberOfAllPages();
	if (numPages > maxPage) {
		numPages = maxPage;
	}

	let buttons = document.getElementById('js-paginationForm').children[0];
	let numButtons = countPaginationButtons();

	//создание необходимого количества кнопок
	if (numButtons < numPages) {
		for (let i = numButtons + 1; i <= numPages; i++) {
			let newBtn = buttons.lastElementChild;
			newBtn.insertAdjacentHTML('beforeBegin', '<a href="#" class="btnPagination">0</a> ')
		}
		//поменять номера всех кнопок
		for (let i = 1; i <= buttons.children.length - 2; i++) {
			buttons.children[i].innerHTML = i.toString();
		}

	} else if (numButtons > numPages) {
		if (numPages > 1) {
			numPages--;
		}
		for (let i = numPages + 1; i <= buttons.children.length - 2;) {
			buttons.children[i].remove();
		}

		//поменять номера всех кнопок
		for (let i = 1; i <= buttons.children.length - 2; i++) {
			buttons.children[i].innerHTML = i.toString();
		}
	}
}

function numberOfAllPages() {
	if (tableData.employees.length < 2) {
		return 1;
	}
	return Math.ceil(tableData.employees.length / linesPerPage);
}

function countPaginationButtons() {
	return document.getElementById('js-paginationForm').children[0].children.length - 2;
}

function backToFirstPage() {
	let btnFocus = document.getElementById('js-paginationForm').getElementsByClassName('btnFocus')[0];
	btnFocus.classList.remove('btnFocus');

	btnFocus = document.getElementById('js-paginationForm').children[0].children[1];
	btnFocus.classList.add('btnFocus');

	currentPage = 1;

	let buttons = document.getElementById('js-paginationForm').children[0].children;

	//поменять номера всех кнопок
	for (let i = 1; i < buttons.length - 1; i++) {
		buttons[i].innerHTML = i.toString();
	}
}

function changePageData() {
	let btnFocus = document.getElementById('js-paginationForm').getElementsByClassName('btnFocus')[0];
	currentPage = +btnFocus.innerHTML;
	fillTable();
}


ready(function () {

	readData(); //прочитать данные из файла
	fillTable(); //заполнить таблицу

	//реагировать на нажатие кнопки "search"
	var form = document.getElementById("js-form");

	form.addEventListener('submit', function (event) {
		event.preventDefault();

		searchInTable();
	});

	//пагинация
	var form2 = document.getElementById("js-paginationForm");
	form2.onclick = function (event) {

		let btnFocusNew = event.target;
		let btnFocusOld = this.getElementsByClassName('btnFocus')[0];

		if (btnFocusNew.innerHTML != "« Previous" && btnFocusNew.innerHTML != "Next »") {
			btnFocusOld.classList.remove('btnFocus');
			btnFocusNew.classList.add('btnFocus');

		} else {
			let tempArr = btnFocusOld.parentElement.children;

			if (btnFocusNew.innerHTML == "« Previous") {

				if (!tempArr[1].classList.contains('btnFocus')) {
					btnFocusOld.classList.remove('btnFocus');
					btnFocusNew = btnFocusOld.previousElementSibling.classList.add('btnFocus');
				} else {
					let numButton = Number.parseInt(tempArr[1].innerHTML);
					if (numButton > 1) {
						let buttons = document.getElementById('js-paginationForm').children[0].children;
						let counter = numButton - 1;

						//поменять номера всех кнопок
						for (let i = 1; i < buttons.length - 1; i++) {
							buttons[i].innerHTML = counter.toString();
							counter++;
						}
					}
				}

			} else if (btnFocusNew.innerHTML == "Next »") {

				if (!tempArr[tempArr.length - 2].classList.contains('btnFocus')) {
					btnFocusOld.classList.remove('btnFocus');
					btnFocusNew = btnFocusOld.nextElementSibling.classList.add('btnFocus');
				} else {
					let numButton = Number.parseInt(tempArr[tempArr.length - 2].innerHTML);
					if (numButton < numberOfAllPages()) {
						let buttons = document.getElementById('js-paginationForm').children[0].children;
						let counter = (numButton + 1) - (buttons.length - 2) + 1;

						//поменять номера всех кнопок
						for (let i = 1; i < buttons.length - 1; i++) {
							buttons[i].innerHTML = counter.toString();
							counter++;
						}
					}
				}
			}
		}
		changePageData();

	};

});
