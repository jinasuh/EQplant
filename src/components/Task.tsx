import * as React from 'react';
import { observer } from 'mobx-react';
import { StepStoreBase } from 'src/store';
import { IStepProps } from 'src/components/common';

export const phoneShellUrl = require('src/assets/iPhone_shell_1.svg') as string;

export class TaskStore extends StepStoreBase {
    constructor() {
        super('Task', Task, 'Submit response');
    }
}

@observer
export class Task extends React.Component<IStepProps, void> {
    public render() {
        return (
            <div className="row">
                <div
                    className="col s6"
                    style={{ background: `url(${phoneShellUrl}) no-repeat center`, height: '500px' }}
                />
                <div className="col s6">6-columns (one-half)</div>
            </div>
        );
    }
}
