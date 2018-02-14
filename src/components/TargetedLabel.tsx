import * as React from 'react';

export class TargetedLabel extends React.Component<{ target: string }, void> {
    public render() {
        const { target, children } = this.props;
        return <label ref={label => label && label.setAttribute('for', target)}>{children}</label>;
    }
}
