export class IconClick {

    static deleteIcon(element: HTMLElement): void {
        element.addEventListener("click", ()=>{
            let container: HTMLElement = <HTMLElement>element.parentElement;
            if (container) {
                container = <HTMLElement>container.parentElement
            }
            if (container) {
                localStorage.removeItem(<string>element.dataset.project)
                container.remove()
            }
        })
    }

    static eyeIcon(element: HTMLElement): void {
        element.addEventListener("click", ()=>{
            let container: HTMLElement = <HTMLElement>element.parentElement;
            if (container) {
                container = <HTMLElement>container.parentElement
            }
            if (container) {

            }
        })
    }
}