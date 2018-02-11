import * as React from 'react';
import { styles } from 'src/styles';

const promptStyle = {
    color: styles.colors.text,
    fontWeight: 400
};

const requiredStyle = {
    color: styles.colors.highlight,
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
