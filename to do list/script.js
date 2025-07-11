
    let task = document.getElementById("taskInput").value;
    let tasks = [];

    document.getElementById("AddTask").addEventListener("click", () => {
        task = document.getElementById("taskInput").value;
        if (task.trim() !== "") {
            tasks.push(task);
            let li = document.createElement("li");
            li.textContent = task;
            document.getElementById("taskList").appendChild(li);
            taskInput.value = "";
            let removebutton=document.createElement("button")
            removebutton.textContent="Remove Task"
            removebutton.className = "removeTask";
            li.appendChild(removebutton);
            removebutton.addEventListener("click", () => {
                li.remove();
            });
            let completebutton = document.createElement("button")
            completebutton.textContent = "TaskCompleted"
            completebutton.className = "completeTask";
            li.appendChild(completebutton);
            completebutton.addEventListener("click", () => {
                li.style.textDecoration = "line-through";
                li.style.color = "green";
                completebutton.disabled = true;
            })
        }
        else {

            alert("please enter a task")
        }

    });
document.querySelector("#darkModeToggle").addEventListener("click",()=>{
    document.querySelector("body").classList.toggle("dark-mode");
})
    