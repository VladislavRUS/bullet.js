const bullet = (function () {

    const app = (appName) => {

        const watchers = [];
        const predefinedAttributes = {
            bValue: 'b-value',
            bClick: 'b-click'
        }

        const getHtmlComponetsByTagName = (tagName) => {
            return elementsToArray(document.getElementsByTagName(tagName));
        }

        const elementsToArray = (elements) => {
            return Array.prototype.slice.call(elements);
        }

        const components = (components) => {
            components.forEach((component) => {
                const definition = component();
                
                processComponentDefinition(definition);
            });
        }

        const processComponentDefinition = (definition, idx) => {
            elementsToArray(document.getElementsByTagName(definition.name)).forEach(htmlComponent => {
                render(htmlComponent, definition);
                preBind(htmlComponent, definition);
                bind(htmlComponent, definition);
            });

            updateWatchers();
        }
        
        const render = (htmlComponent, {name, template, logic}) => {
            htmlComponent.innerHTML = template;
        }

        const preBind = (htmlComponent, {name, template, logic}) => {
            logic.bindings.forEach(binding => {
                const attrValue = htmlComponent.getAttribute(`[${binding}]`);
                
                if (attrValue) {
                    logic[binding] = attrValue;
                }
            });
        }

        const bind = (htmlComponent, {name, template, logic}) => {
            const bValue = predefinedAttributes.bValue;

            elementsToArray(htmlComponent.querySelectorAll(`[${bValue}]`)).forEach(element => {

                const key = element.getAttribute(bValue);

                if (element.nodeName === 'INPUT') {

                    watchers.push({
                        htmlComponent,
                        element,
                        logic,
                        key,
                        attr: bValue
                    });

                    element.addEventListener('input', () => {
                        updateWatchers();
                    });
                }
            });

            const bClick = predefinedAttributes.bClick;

            elementsToArray(htmlComponent.querySelectorAll(`[${bClick}]`)).forEach(element => {

                const key = element.getAttribute(bClick);
                const fun = logic[key];

                if (fun && typeof fun === 'function') {
                    element.addEventListener('click', () => {
                        fun.call(logic);
                        updateWatchers();
                    });
                }
            });
        }

        const updateWatchers = () => {
            watchers.forEach(watcher => {
                console.log(watcher);

                return;
                // const value = watcher.logic[watcher.key];

                // elementsToArray(htmlComponent.querySelectorAll(`[${watcher.attr}]`)).forEach(element => {
                //     if (element.nodeName === 'INPUT') {
                //         element.value = value;

                //     } else {
                //         element.innerHTML = value;
                //     }
                // });
            });
        }
        
        return {
            components
        }
    }

    return {
        app
    }
})();

global.bullet = bullet;
