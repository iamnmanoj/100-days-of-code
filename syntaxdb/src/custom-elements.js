import { createElement } from './utils';

export function CollapsibleItem(props) {
    const { root, label, id, onClick, onExpand } = props;
    let isExpanded = false;

    this.$ = {
        root: createElement('div', { class: 'container' }),
        category: createElement('div', { class: 'category' }),
        conceptContainer: createElement('div', { class: 'conceptsContainer' })
    }

    this.$.category.textContent = label;
    this.$.root.appendChild(this.$.category);
    this.$.root.appendChild(this.$.conceptContainer);
    root.appendChild(this.$.root);

    this.$.category.addEventListener('click', _onClick)

    function _onClick() {
        if (isExpanded) {
            collapse();
            return;
        }
        onClick(id, expand);
        toggleisExpanded();
    }

    const expand = (items) => {
        Object.keys(items).forEach((itemName) => {
            const itemElem = createElement('div', { class: 'concept' });
            itemElem.textContent = itemName;
            this.$.conceptContainer.appendChild(itemElem);
        })
    }

    const collapse = () => {
        this.$.conceptContainer.innerHTML = '';
        toggleisExpanded();
    }

    function toggleisExpanded() {
        isExpanded = !isExpanded;
    }
}