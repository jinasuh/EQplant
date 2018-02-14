import * as React from 'react';
import { observer } from 'mobx-react';
import { IStoreProps } from 'src/store';

@observer
export class App extends React.Component<IStoreProps, void> {
    public render() {
        return <div>Round2</div>;
    }
}
