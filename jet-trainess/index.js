"use strict";

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
var siblingDirection = "down";
var currentPage = 1;
var paginationButtons = 6;
var maxPage = 6; //отображается максимум 6 страниц
var linesPerPage = 10; // 10 строк таблицы на страницу

function readData() {
	baseData = JSON.parse(employeesData, function (key, value) {
		if (key == 'Start date') {
			return new Date(value);
		}
		return value;
	});

	tableData = baseData;
}

function paginationChangePageData() {

	let btnFocus = document.getElementById('js-paginationForm').getElementsByClassName('btnFocus')[0];

	currentPage = +btnFocus.innerHTML;
	fillTable(sortDirection);

	//	createPaginationLinks();
}

//function createPaginationLinks() {
//
//	maxPage = Math.ceil(tableData.employees.length / linesPerPage);
//
//	let buttons = document.getElementById('js-paginationForm').children[0];
//
//	countPaginationButtons();
//
//	if (maxPage > paginationButtons - 2) {
//
//		for (let i = 1; i <= maxPage; i++) {
//			let newBtn = document.createElement('a');
//			newBtn.className = "bthPagination";
//			newBtn.href = "#";
//			newBtn.innerHTML = i.toString();
//			
//			buttons.insertBefore(newBtn, buttons.lastElementChild);
//		}
//
//	} else if (maxPage <= paginationButtons) {
//
//		for (let i = maxPage + 1; i < buttons.children.length - 1;) {
//			buttons.children[i].remove();
//		}
//	}
//
//}

function fillTable(sortDirection) {
	let rows = [];
	let begin = 0;
	let end = tableData.employees.length;
	if (end > linesPerPage) {
		end = linesPerPage;
	}

	//отображение выбранной страницы
	if (currentPage > 1) {
		begin = linesPerPage * (currentPage - 1);
		end = linesPerPage * currentPage;
		if (tableData.employees.length < end) {
			end = tableData.employees.length;
		}
	}

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

	if (sortDirection == "up") {
		document.getElementById("js-tbody").innerHTML = rows.join('');
	} else {
		document.getElementById("js-tbody").innerHTML = rows.reverse().join('');
	}

}

function backToFirstPage() {
	let btnFocus = document.getElementById('js-paginationForm').getElementsByClassName('btnFocus')[0];
	btnFocus.classList.remove('btnFocus');

	btnFocus = document.getElementById('js-paginationForm').children[0].children[1];
	btnFocus.classList.add('btnFocus');
}

function sort(column) {

	let tableHead = document.getElementsByTagName('th');
	let tableBody = document.getElementById('js-tbody').children;

	backToFirstPage();

	paginationChangePageData();

	if (sortedColumn != column) {
		//сортировка по новому столбцу

		switch (column) {
			case 0:
				tableData.employees.sort(function (value1, value2) {
					let str1 = value1.Name.toLowerCase();
					let str2 = value2.Name.toLowerCase();

					if (str1 > str2) return 1;
					if (str1 < str2) return -1;
					return 0;
				});
				break;
			case 1:
				tableData.employees.sort(function (value1, value2) {
					let str1 = value1.Position.toLowerCase();
					let str2 = value2.Position.toLowerCase();

					if (str1 > str2) return 1;
					if (str1 < str2) return -1;
					return 0;
				});
				break;
			case 2:
				tableData.employees.sort(function (value1, value2) {
					let str1 = value1.Office.toLowerCase();
					let str2 = value2.Office.toLowerCase();

					if (str1 > str2) return 1;
					if (str1 < str2) return -1;
					return 0;
				});
				break;
			case 3:
				tableData.employees.sort(function (value1, value2) {
					return value1.Age - value2.Age;
				});
				break;
			case 4:
				tableData.employees.sort(function (value1, value2) {
					return value1["Start date"] - value2["Start date"];
				});
				break;
			case 5:
				tableData.employees.sort(function (value1, value2) {
					return value1.Salary - value2.Salary;
				});
				break;
		}

		//предыдущий сортированный столбец
		if (sortedColumn != -1) {
			//восстановить стрелки в css

			if (sortDirection == "up") {
				tableHead[sortedColumn].getElementsByClassName(sortDirection)[0].style.borderBottomColor = "#dbdbdb";
				tableHead[sortedColumn].getElementsByClassName(siblingDirection)[0].style.borderTopColor = "#dbdbdb";
			} else {
				tableHead[sortedColumn].getElementsByClassName(sortDirection)[0].style.borderTopColor = "#dbdbdb";
				tableHead[sortedColumn].getElementsByClassName(siblingDirection)[0].style.borderBottomColor = "#dbdbdb";
			}
		}

		//текущий сортированный столбец

		sortDirection = "up";
		siblingDirection = "down";
		fillTable(sortDirection);

		//изменить стрелки в css

		tableHead[column].getElementsByClassName(sortDirection)[0].style.borderBottomColor = "#7c80e3";
		tableHead[column].getElementsByClassName(siblingDirection)[0].style.borderTopColor = "transparent";

		//изменить цвет фона в css

		for (let i = 0; i < tableBody.length; i += 2) {
			tableBody[i].children[column].style.backgroundColor = "#fafafa";
		}
		for (let i = 1; i < tableBody.length; i += 2) {
			tableBody[i].children[column].style.backgroundColor = "#f1f1f1";
		}

		sortedColumn = column;

	} else {
		//нажали на тот же столбец, поменять направление сортировки

		if (sortDirection == "up") {
			sortDirection = "down";
			siblingDirection = "up";

			//изменить стрелки в css

			tableHead[column].getElementsByClassName(sortDirection)[0].style.borderTopColor = "#7c80e3";
			tableHead[column].getElementsByClassName(siblingDirection)[0].style.borderBottomColor = "transparent";
		} else {
			sortDirection = "up";
			siblingDirection = "down";

			//изменить стрелки в css

			tableHead[column].getElementsByClassName(sortDirection)[0].style.borderBottomColor = "#7c80e3";
			tableHead[column].getElementsByClassName(siblingDirection)[0].style.borderTopColor = "transparent";
		}

		fillTable(sortDirection);

		//изменить цвет фона в css

		for (let i = 0; i < tableBody.length; i += 2) {
			tableBody[i].children[column].style.backgroundColor = "#fafafa";
		}
		for (let i = 1; i < tableBody.length; i += 2) {
			tableBody[i].children[column].style.backgroundColor = "#f1f1f1";
		}
	}
}

function searchInTable() {

	let tableHead = document.getElementsByTagName('th');
	let tableBody = document.getElementById('js-tbody').children;

	if (sortedColumn != -1) {
		//восстановить стрелки в css

		if (sortDirection == "up") {
			tableHead[sortedColumn].getElementsByClassName(sortDirection)[0].style.borderBottomColor = "#dbdbdb";
			tableHead[sortedColumn].getElementsByClassName(siblingDirection)[0].style.borderTopColor = "#dbdbdb";
		} else {
			tableHead[sortedColumn].getElementsByClassName(sortDirection)[0].style.borderTopColor = "#dbdbdb";
			tableHead[sortedColumn].getElementsByClassName(siblingDirection)[0].style.borderBottomColor = "#dbdbdb";
		}
	}

	let searchInput = document.getElementById('js-dataFiltration');
	let filter = searchInput.value.toUpperCase();

	if (filter != "") {

		filteredData.employees = [];

		for (let i = 0; i < baseData.employees.length; i++) {
			let employee = baseData.employees[i];

			for (let element in employee) {
				let text;
				if (element != "Start date") {
					text = employee[element].toString().toUpperCase();
				} else {
					text = formatDate(employee[element]);
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
	paginationChangePageData();
}

function formatDate(date) {

	let dd = date.getDate();
	if (dd < 10) dd = '0' + dd;

	let mm = date.getMonth() + 1;
	if (mm < 10) mm = '0' + mm;

	let yyyy = date.getFullYear();

	return yyyy + '/' + mm + '/' + dd;
}

function countPaginationButtons() {
	paginationButtons = document.getElementById('js-paginationForm').children[0].children.length - 2;
}


ready(function () {
	readData();
	countPaginationButtons();
	fillTable(sortDirection);

	var form = document.getElementById("js-form");

	form.addEventListener('submit', function (event) {
		event.preventDefault();

		searchInTable();
	});

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
				}

			} else if (btnFocusNew.innerHTML == "Next »") {

				if (!tempArr[tempArr.length - 2].classList.contains('btnFocus')) {
					btnFocusOld.classList.remove('btnFocus');
					btnFocusNew = btnFocusOld.nextElementSibling.classList.add('btnFocus');
				}

			}
		}

		paginationChangePageData();

	};

});
