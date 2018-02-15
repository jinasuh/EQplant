import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from 'src/round2/App';
import { Store } from 'src/round2/store';

const rootElement = document.getElementById('root');

const store = new Store();

const createUi = (AppComponent: typeof App) => {
    if (__DEV__) {
        const MobXDevTools = require<{
            default: React.ComponentClass<any>;
        }>('mobx-react-devtools').default;
        return (
            <div>
                <AppComponent store={store} />
                <MobXDevTools />
            </div>
        );
    }

    return <AppComponent store={store} />;
};

ReactDOM.render(createUi(App), rootElement);

// Hot Module Replacement APIs
if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require<{ App: typeof App }>('./App').App;
        ReactDOM.render(createUi(NextApp), rootElement);
    });
}
