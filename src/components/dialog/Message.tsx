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

const getMessageContainerStyle = (received = true) => {
    return {
        flex: '0 1 auto',
        maxWidth: received ? '200px' : '230px',
        marginBottom: '10px'
    };
};

const getMessageStyle = (received = true, treatment = false) => {
    return {
        backgroundColor: received ? styles.colors.receivedBackground : styles.colors.sentBackground,
        borderRadius: treatment ? '10px 10px 0 0 ' : '10px',
        textAlign: received ? 'start' : 'end',
        fontSize: '12px',
        color: received ? styles.colors.receivedText : styles.colors.sentText,
        padding: '8px'
    };
};

const nameStyle = {
    fontSize: '8px',
    color: '#777',
    marginLeft: '40px'
};

const defaultTreatmentStyle = {
    fontSize: '10px',
    color: styles.colors.highlight,
    backgroundColor: 'white',
    border: '1px solid ' + styles.colors.receivedBackground,
    borderRadius: '0 0 10px 10px',
    padding: '8px'
};

const getIconStyle = (received = true) => {
    if (received) {
        return {
            fontSize: '30px',
            margin: '0 2px 0 0'
        };
    } else
        return {
            color: styles.colors.sentBackground,
            margin: '0 0 0 2px',
            fontSize: '10px'
        };
};

const treatmentIconStyle = {
    fontSize: '10px',
    paddingRight: '4px'
};

export interface IMessageProps {
    received?: boolean;
    from: string;
    message: string;
    treatmentType: TreatmentType;
}

export class Message extends React.Component<IMessageProps, void> {
    public render() {
        const { received = true, from, message, treatmentType } = this.props;
        const containerStyle = getContainerStyle(received);
        const messageContainerStyle = getMessageContainerStyle(received);
        const treatment = treatmentType !== TreatmentType.None;
        const messageStyle = getMessageStyle(received, treatment);

        return (
            <div>
                {received ? <div style={nameStyle}>{from}</div> : null}
                <div style={containerStyle}>
                    {this._getIcon(received)}
                    <div style={messageContainerStyle}>
                        <div style={messageStyle}>{message}</div>
                        {this._getTreatment(from, treatmentType)}
                    </div>
                </div>
            </div>
        );
    }

    private _getIcon(received: boolean) {
        const iconStyle = getIconStyle(received);
        if (received) {
            return (
                <div>
                    <i style={iconStyle} className="material-icons circle small">
                        account_circle
                    </i>
                </div>
            );
        } else {
            return (
                <div>
                    <i style={iconStyle} className="material-icons circle tiny">
                        check_circle
                    </i>
                </div>
            );
        }
    }

    private _getTreatment(name: string, treatmentType: TreatmentType) {
        switch (treatmentType) {
            case TreatmentType.Default:
                return (
                    <div style={defaultTreatmentStyle}>
                        <i className="material-icons" style={treatmentIconStyle}>
                            lightbulb_outline
                        </i>
                        {name} seems angry
                    </div>
                );

            case TreatmentType.None:
            default:
                return null;
        }
    }
}
