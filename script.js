const app = bullet.app('app');

const CounterComponent = () => {
    return {
        name: 'counter',
        template: `
            <div>
                <div>
                    Hello I am counter! </br>
                    Current count is: <span b-value="value"></span>!
                </div>
                <div>
                    <input type="text" b-value="value">
                </div>
                <div>
                    <button b-click="up">Up</button>
                    <button b-click="down">Down</button>
                </div>
            </div>
        `,
        logic: {
            bindings: [ 'value' ],
            up: function () {
                this.value = parseInt(this.value) + 1;
            },
            down: function() {
                this.value = parseInt(this.value) - 1;
            }
        }
    }
}

app.components([
    CounterComponent
]);