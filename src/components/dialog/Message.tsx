import * as React from 'react';
import { TreatmentType } from 'src/store';
import { styles } from 'src/styles';

const getContainerStyle = (received = true) => {
    return {
        display: 'flex',
        flexDirection: received ? 'row' : 'row-reverse',
        alignItems: 'flex-start'
    };
};

const getIconStyle = (received = true) => {
    if (received) {
        return {
            flex: '0 0 30px'
        };
    } else
        return {
            flex: '0 0 10px'
        };
};

const getMessageContainerStyle = (received = true) => {
    return {
        flex: '0 1 auto',
        maxWidth: received ? '200px' : '230px',
        backgroundColor: received ? styles.colors.receivedBackground : styles.colors.sentBackground,
        borderRadius: '10px',
        margin: '5px',
        textAlign: received ? 'start' : 'end'
    };
};

const nameStyle = {
    'font-size': '6px',
    color: '#777',
    display: 'none'
};

const getMessageStyle = (received = true) => {
    return {
        'font-size': '10px',
        color: received ? 'white' : styles.colors.text,
        padding: '8px'
    };
};

const defaultTreatmentStyle = {
    'font-size': '6px',
    color: styles.colors.highlight,
    padding: '8px',
    backgroundColor: 'white',
    border: '1px solid ' + styles.colors.receivedBackground,
    borderRadius: '0 0 10px 10px'
};

export interface IMessageProps {
    received?: boolean;
    icon?: string;
    name: string;
    message: string;
    treatmentType: TreatmentType;
}

export class Message extends React.Component<IMessageProps, void> {
    public render() {
        const { received = true, icon = 'account_circle', name, message, treatmentType } = this.props;
        const containerStyle = getContainerStyle(received);
        const iconStyle = getIconStyle(received);
        const messageContainerStyle = getMessageContainerStyle(received);
        const messageStyle = getMessageStyle(received);

        return (
            <div style={containerStyle}>
                <div style={iconStyle}>
                    <i className="material-icons circle">{icon}</i>
                </div>
                <div style={messageContainerStyle}>
                    <div style={nameStyle}>{name}</div>
                    <div style={messageStyle}>{message}</div>
                    {this._getTreatment(name, treatmentType)}
                </div>
            </div>
        );
    }

    private _getTreatment(name: string, treatmentType: TreatmentType) {
        switch (treatmentType) {
            case TreatmentType.Default:
                return <div style={defaultTreatmentStyle}>{name} seems to be angry</div>;
            case TreatmentType.None:
            default:
                return null;
        }
    }
}
