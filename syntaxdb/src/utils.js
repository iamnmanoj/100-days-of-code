export function createElement(elemName, attributes) {
    let element;
    if (elemName) {
        element = document.createElement(elemName);
    }
    if (attributes) {
        for (const [key, value] of Object.entries(attributes)) {
            element.setAttribute(key, value)
        }
    }
    return element;
}