import * as React from 'react';

const containerStyle = {
    display: 'flex',
    'justify-content': 'flex-start'
};

const progressStyle = {
    flex: 1
};

const textStyle = {
    flex: '0 0 150px',
    marginRight: '20px'
};

export interface IProgressProps {
    percentage: string;
}

export class Progress extends React.Component<IProgressProps, void> {
    public render() {
        const { percentage } = this.props;
        return (
            <div style={containerStyle}>
                <div style={textStyle}>{`${percentage}% Complete`}</div>
                <div className="progress" style={progressStyle}>
                    <div className="determinate" style={{ width: `${percentage}%` }} />
                </div>
            </div>
        );
    }
}
