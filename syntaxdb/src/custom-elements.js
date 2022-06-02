import { createElement } from './utils';

export function Collapsible(props) {
    const { root, label, id, onClick, onExpand } = props;
    let isExpanded = false;
    const elem = createElement('div', { class: 'container' });
    const categoryElem = createElement('div', { class: 'category' });
    const conceptsContainer = createElement('div', { class: 'conceptsContainer' });
    categoryElem.textContent = label;
    elem.appendChild(categoryElem);
    elem.appendChild(conceptsContainer);
    root.appendChild(elem);

    categoryElem.addEventListener('click', _onClick)

    function _onClick() {
        if (isExpanded) {
            collapse();
            return;
        }
        onClick(id, expand);
        toggleisExpanded();
    }

    function expand(items) {
        Object.keys(items).forEach(itemName => {
            const itemElem = createElement('div', { class: 'concept' });
            itemElem.textContent = itemName;
            conceptsContainer.appendChild(itemElem);
        })
    }

    function collapse() {
        conceptsContainer.innerHTML = '';
        toggleisExpanded();
    }

    function toggleisExpanded() {
        isExpanded = !isExpanded;
    }
}