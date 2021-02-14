
let addTaskInput = document.getElementById('addtaskinput');
let addTaskBtn = document.getElementById('addtaskbtn');
let taskObj;
showTask();

addTaskInput.addEventListener('keypress', function (e) {
    if (e.key == 'Enter') {
        addTaskBtn.click();
    }
})

addtaskbtn.addEventListener('click', function () {
    addTaskInputVal = addTaskInput.value;
    if (addTaskInputVal.trim() != 0) {
        let webTask = localStorage.getItem('localTask');
        if (webTask == null) {
            taskObj = [];
        } else {
            taskObj = JSON.parse(webTask); // converting to obj
        }
        taskObj.push(addTaskInputVal);
        localStorage.setItem('localTask', JSON.stringify(taskObj));
        // converting to JSON
        addTaskInput.value = '';
    }
    showTask();
})

function showTask() {
    let webTask = localStorage.getItem('localTask');
    if (webTask == null) {
        taskObj = [];
    } else {
        taskObj = JSON.parse(webTask); // converting to obj
    }
    let html = '';
    let addedTaskList = document.getElementById('addedtasklist');
    taskObj.forEach((item, index) => {
        html +=
            `<tr>
            <th scope="row">${index + 1}</th>
            <td>${item}</td>
            <td><button type="button" onclick="editTask(${index})" class="text-primary"><i class="fa fa-edit"></i>Edit</button></td>
            <td><button type="button" onclick="deleteItem(${index})" class="text-danger"><i class="fa fa-trash"></i>Delete</button></td>
        </tr>`;
    });
    addedTaskList.innerHTML = html;
}
//localStorage.clear();

function editTask(index) {
    let saveIndex = document.getElementById('saveindex');
    let addTaskBtn = document.getElementById('addtaskbtn');
    let saveTaskBtn = document.getElementById('savetaskbtn');
    saveIndex.value = index;
    let webTask = localStorage.getItem('localTask');
    let taskObj = JSON.parse(webTask);
    addTaskInput.value = taskObj[index];
    addTaskBtn.style.display = 'none';
    saveTaskBtn.style.display = 'inline';
}

let saveTaskBtn = document.getElementById('savetaskbtn');
saveTaskBtn.addEventListener('click', function () {
    let webTask = localStorage.getItem('localTask');
    let taskObj = JSON.parse(webTask);
    let saveIndex = document.getElementById('saveindex').value;
    taskObj[saveIndex] = addTaskInput.value;
    localStorage.setItem('localTask', JSON.stringify(taskObj));
    let addTaskBtn = document.getElementById('addtaskbtn');
    addTaskBtn.style.display = 'inline';
    saveTaskBtn.style.display = 'none';
    showTask();
    addTaskInput.value = '';
})

function deleteItem(index) {
    let webTask = localStorage.getItem('localTask');
    let taskObj = JSON.parse(webTask);
    taskObj.splice(index, 1);
    localStorage.setItem('localTask', JSON.stringify(taskObj));
    showTask();
}

let deleteAllBtn = document.getElementById('deleteallbtn');
deleteAllBtn.addEventListener('click', function () {
    let addTaskBtn = document.getElementById('addtaskbtn');
    saveTaskBtn.style.display = 'none';
    addTaskBtn.style.display = 'inline';

    let webTask = localStorage.getItem('localTask');
    let taskObj = JSON.parse(webTask);
    if (webTask == null) {
        taskObj = [];
    } else {
        taskObj = JSON.parse(webTask);
        taskObj = [];
    }
    localStorage.setItem('localTask', JSON.stringify(taskObj));
    showTask();
    addTaskInput.value = '';
})

let searchTextBox = document.getElementById('searchtextbox');
searchTextBox.addEventListener('input', function () {
    let trlist = document.querySelectorAll('tr');
    Array.from(trlist).forEach(function (item) {
        let searchedText = item.getElementsByTagName('td')[0].innerText;
        let searchTextBoxVal = searchTextBox.value;
        let re = new RegExp(searchTextBoxVal, 'gi');
        if (searchedText.match(re)) {
            item.style.display = 'table-row';
        } else {
            item.style.display = 'none';
        }
    })
})