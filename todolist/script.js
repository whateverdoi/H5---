document.getElementById('addTask').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskTime = document.getElementById('taskTime');
    const taskText = taskInput.value.trim();
    const taskDateTime = taskTime.value;

    if (taskText !== '') {
        const taskList = document.getElementById('taskList');
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox">
            <span>${taskText} (${taskDateTime})</span>
            <button class="delete-button">删除</button>
        `;

        const deleteButton = li.querySelector('.delete-button');
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(li);
            saveTasks();
        });

        const checkbox = li.querySelector('.task-checkbox');
        checkbox.addEventListener('change', function() {
            li.classList.toggle('completed', checkbox.checked);
            saveTasks();
        });

        taskList.appendChild(li);
        taskInput.value = '';
        taskTime.value = '';

        // 添加闹钟提醒功能
        const alarmTime = new Date(taskDateTime).getTime();
        const now = new Date().getTime();
        const timeToAlarm = alarmTime - now;

        if (timeToAlarm > 0) {
            setTimeout(function() {
                window.location.href = 'https://www.bilibili.com/';
            }, timeToAlarm);
        }

        saveTasks();
    }
});

function saveTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = [];

    taskList.querySelectorAll('li').forEach(function(task) {
        const taskText = task.querySelector('span').innerText;
        const taskDateTime = task.querySelector('span').innerText.match(/\((.*?)\)/)[1];
        const completed = task.classList.contains('completed');

        tasks.push({
            text: taskText,
            dateTime: taskDateTime,
            completed: completed
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox">
            <span>${task.text} (${task.dateTime})</span>
            <button class="delete-button">删除</button>
        `;

        const deleteButton = li.querySelector('.delete-button');
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(li);
            saveTasks();
        });

        const checkbox = li.querySelector('.task-checkbox');
        checkbox.addEventListener('change', function() {
            li.classList.toggle('completed', checkbox.checked);
            saveTasks();
        });

        if (task.completed) {
            li.classList.add('completed');
            checkbox.checked = true;
        }

        taskList.appendChild(li);
    });
}

loadTasks();
