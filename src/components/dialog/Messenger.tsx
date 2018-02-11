import * as React from 'react';
import { IConversation, TreatmentType } from 'src/store';
import { Message } from 'src/components/dialog/Message';

const containerStyle = {
    width: '300px',
    height: '500px',
    border: '1px solid #eee',
    padding: '20px',
    overflowY: 'auto'
};

export interface IMessengerProps {
    conversation: IConversation;
    treatmentType: TreatmentType;
}

export class Messenger extends React.Component<IMessengerProps, void> {
    public render() {
        const { conversation, treatmentType } = this.props;
        return (
            <div style={containerStyle}>
                {conversation.messages.map((message, id) => {
                    const received = message.from.toLowerCase() !== 'me';
                    const showTreatment = received && id === conversation.messages.length - 1;
                    return (
                        <Message
                            name={message.from}
                            message={message.content}
                            received={received}
                            key={id}
                            treatmentType={showTreatment ? treatmentType : TreatmentType.None}
                        />
                    );
                })}
            </div>
        );
    }
}

{
    /*

export const phoneShellUrl = require('src/assets/iPhone_shell_1.svg') as string;
<div
                    className="col s4"
                    style={{ background: `url(${phoneShellUrl}) no-repeat center`, height: '500px' }}
                /> */
}
