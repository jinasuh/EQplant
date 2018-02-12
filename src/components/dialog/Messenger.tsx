import * as React from 'react';
import { IConversation, TreatmentType } from 'src/store';
// import { getAsset } from 'src/assets/assets';
import { Message } from 'src/components/dialog/Message';
import { styles } from 'src/styles';

const containerStyle = {
    width: '300px',
    height: '500px',
    border: '1px solid #eee',
    display: 'flex',
    flexDirection: 'column'
};

const messengerStyle = {
    padding: '8px',
    overflowY: 'auto',
    flex: '1'
};

const headerStyle = {
    backgroundColor: styles.colors.receivedBackground,
    height: '40px',
    display: 'flex',
    'justify-content': 'center',
    alignItems: 'center'
};

const footerStyle = {
    borderTop: '1px solid ' + styles.colors.receivedBackground,
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    color: styles.colors.placeholderText,
    paddingLeft: '10px',
    fontSize: '10px'
};

export interface IMessengerProps {
    conversation: IConversation;
    treatmentType: TreatmentType;
}

export class Messenger extends React.Component<IMessengerProps, void> {
    public render() {
        const { conversation, treatmentType } = this.props;
        // const assetUrl = getAsset(conversation.id, treatmentType);

        // return <div className="col s4" style={{ background: `url(${assetUrl}) no-repeat center`, height: '500px' }} />;
        return (
            <div style={containerStyle}>
                <div style={headerStyle}>
                    <i className="material-icons circle small">account_circle</i>
                    {conversation.from}
                </div>
                <div style={messengerStyle}>
                    {conversation.messages.map((message, id) => {
                        const showTreatment = message.received && id === conversation.messages.length - 1;
                        return (
                            <Message
                                from={conversation.from}
                                message={message.content}
                                received={message.received}
                                key={id}
                                treatmentType={showTreatment ? treatmentType : TreatmentType.None}
                            />
                        );
                    })}
                </div>
                <div style={footerStyle}>Type a message...</div>
            </div>
        );
    }
}
