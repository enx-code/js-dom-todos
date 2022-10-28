const addTodo = document.querySelector("form");
const toDoListUl = document.querySelector('#todo-list')

addTodo.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("here", event)
    fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: addTodo[0].value,
            completed: false
        })
    })
    .then(function (response) { return response.json() })
    .then(function (data) {
        receiveDataFromServer()
    })
    
})

function receiveDataFromServer() {
    fetch("http://localhost:3000/todos")
    .then(function (response) { return response.json() })
    .then(function (data) {
        console.log("i am data", data)
        renderToDoList(data)
    })
    
}
// console.log("hereeeeeee", data)

function renderToDoList (data) {
    toDoListUl.innerHTML = ''
    data.forEach((item) => {
        const li = document.createElement('li')
        li.innerText = item.title
        if (item.completed === true) {
            li.setAttribute('class', 'completed')
        }
        toDoListUl.appendChild(li)
        deleteItem(item, li)
    })
}

// function deleteTodo(data){
//     fetch(http://localhost)
// }
function deleteItem(item, li){
    const done = document.createElement('button')
    done.style.marginLeft = "20px"
    done.innerText = "DONE"
  
    li.appendChild(done)

    done.addEventListener('click', () => {
        fetch(`http://localhost:3000/todos/${item.id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                completed: false
                })
            })
            .then(function (response) { return response.json() })
            .then(function () {receiveDataFromServer()})
    })
}

function init (){
    receiveDataFromServer()
}

init()