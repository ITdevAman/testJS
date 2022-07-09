


const url = "https://jsonplaceholder.typicode.com/posts"

let form = document.getElementById("form")
const todos = JSON.parse(localStorage.getItem("todo"))
let result = document.getElementById("result")
let item_block = document.getElementById("item_block")

console.log(todos)
const delIndex = (id) => {
    const fun = todos.filter((el)=>el.userId !== id)
    localStorage.setItem("todo", JSON.stringify(fun))
    location.reload()
}
const IndexItem = (id) => {
    const ITEM = todos.find((item)=>item.userId === id)
    item_block.innerHTML = `<div><span>${ITEM.userId}</span><h1>Name : ${ITEM.title}</h1><p>Author : ${ITEM.body}</p><button onclick="delIndex(${ITEM.userId})" id="btn">del</button></div>`
}

result.innerHTML = `${todos.map(item=> {
    return (
        `<li onclick="IndexItem(${item.userId})" ><span>${item.userId}</span><h1>${item.title}</h1><p>${item.body}</p><button onclick="delIndex(${item.userId})" id="btn">del</button></li>`
    )
})}`
const USERID = todos.length === 0 ? 1 : todos[todos.length-1].userId+1
form.addEventListener("submit", function (e) {
    e.preventDefault()
    let name = document.getElementById("name").value
    let author = document.getElementById("author").value
    fetch(url ,{
     method : 'POST',
        body : JSON.stringify({
            "userId": USERID,
            "title": name,
            "body": author,
        }),
        headers : {
         "Content-Type":"application/json; charset=UTF-8"
        }
    })
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            const fun = [...todos]
            fun.push(data)
            localStorage.setItem("todo", JSON.stringify(fun))
            location.reload()
        })
})
