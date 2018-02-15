import * as React from 'react';
import { observer } from 'mobx-react';

const style = {
    container: {
        margin: '25px'
    }
};

export interface IStepProps {
    canProceed: boolean;
    completeText: string;
    onCompleteStep(): void;
}

@observer
export class Step extends React.Component<IStepProps, void> {
    public render() {
        const { children, completeText, canProceed, onCompleteStep } = this.props;

        return (
            <div style={style.container}>
                {children}
                <div className="divider" style={{ marginBottom: '10px' }} />
                {canProceed ? (
                    <a className="waves-effect waves-light btn" onClick={onCompleteStep}>
                        {completeText}
                    </a>
                ) : null}
            </div>
        );
    }
}
