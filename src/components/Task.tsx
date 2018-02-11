import * as React from 'react';
import { observer } from 'mobx-react';
import { StepStoreBase } from 'src/store';
import { IStepProps } from 'src/components/common';

// const nameStyle = {
//     'font-size': '6px',
//     color: '#777'
// };

// const messageStyle = {
//     'font-size': '10px',
//     color: '#999'
// };

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
                <div className="col s6">
                    <p>You are Foo and you are casually chatting with Bar. Please read the conversation on the left.</p>
                    <p>Write a realistic and appropriate response given the conversation thread:</p>
                    <textarea
                        placeholder="Your response goes here"
                        id="response"
                        className="materialize-textarea"
                        onChange={this._onChange.bind(this)}
                    />
                    {/* {this._renderReceived(
                        'Jina',
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eleifend lorem at maximus pulvinar. Duis vestibulum lorem odio, eget interdum lorem imperdiet a. Maecenas ut orci vel neque rhoncus tincidunt ac sit amet augue.'
                    )} */}
                </div>
            </div>
        );
    }

    private _onChange(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        const { addData } = this.props;
        addData('response', event.currentTarget.value);
    }

    // private _renderReceived(name: string, message: string) {
    //     return (
    //         <div className="row">
    //             <div className="col s1">
    //                 <i className="material-icons circle">account_circle</i>
    //             </div>
    //             <div className="col s10">
    //                 <div style={nameStyle}>{name}</div>
    //                 <div style={messageStyle}>{message}</div>
    //             </div>
    //         </div>
    //     );
    // }
}
