import * as React from 'react';

const promptStyle = {
    color: 'rgba(0, 0, 0, 0.71)',
    fontWeight: 400
};

const requiredStyle = {
    color: '#ee6e73',
    fontWeight: 500
};

export interface IPromptProps {
    required?: boolean;
}

export class Prompt extends React.Component<IPromptProps, void> {
    public render() {
        const { children, required = true } = this.props;
        return (
            <div style={promptStyle}>
                {children}
                {required ? <span style={requiredStyle}> *</span> : null}
            </div>
        );
    }
}
