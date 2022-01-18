import {ChangePage} from "./ChangePage";
import {Utils} from "./Utils";

export class IconClick {

    static deleteTaskIcon(element: HTMLElement, id: string, title: string): void {
        element.addEventListener("click", ()=>{
            let container: HTMLElement = <HTMLElement>element.parentElement;
            if (container) {
                container = <HTMLElement>container.parentElement
            }
            if (container) {
                let xhrPost = new XMLHttpRequest();

                const projectData = {
                    'delTask': id,
                };

                xhrPost.open('POST', '../../api/taskAPI.php');
                xhrPost.setRequestHeader('Content-Type', 'application/json');
                xhrPost.send(JSON.stringify(projectData));
                Utils.reloadDetailed(title);
            }
        })
    }

    static eyeIcon(element: HTMLElement): void {
        element.addEventListener("click", ()=>{
            ChangePage.detailedProject(<string>element.nextElementSibling?.nextElementSibling?.innerHTML)
        })
    }

    static deleteIcon(element: HTMLElement) {
        element.addEventListener("click", ()=>{
            let xhrPost = new XMLHttpRequest();

            const projectData = {
                'delProject': element.dataset.project,
            };

            xhrPost.open('POST', '../../api/taskAPI.php');
            xhrPost.setRequestHeader('Content-Type', 'application/json');
            xhrPost.send(JSON.stringify(projectData));
            Utils.reload();
        })
    }

    static editTaskIcon(element: HTMLElement) {
        element.addEventListener("click", ()=>{
            let task: HTMLElement = <HTMLElement>element.parentElement?.previousElementSibling
                                                ?.previousElementSibling
                                                ?.previousElementSibling;



            let input: HTMLInputElement = document.createElement("input");
            input.className = "editInput"
            input.value = task.innerHTML;
            task.parentElement?.prepend(input);
            task.style.display = "none";

            input.addEventListener("keyup", (e)=>{
                if (e.key === "Enter") {
                    let oldTask = task.innerHTML;
                    task.innerHTML = input.value;
                    task.style.display = "initial";
                    input.remove();
                    let xhr = new XMLHttpRequest();

                    const projectData = {
                        'oldTask': oldTask,
                        'newTask': input.value,
                    };

                    xhr.open('POST', '../../api/taskAPI.php');
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(JSON.stringify(projectData));
                }
            })
        });
    }
}