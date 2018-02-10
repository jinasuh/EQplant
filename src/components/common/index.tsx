import * as React from 'react';

export function targetedLabel() {
    return class extends React.Component<{ target: string }, void> {
        public render() {
            const { target, children } = this.props;
            return <label ref={label => label && label.setAttribute('for', target)}>{children}</label>;
        }
    };
}

export * from 'src/components/common/MultipleChoiceQuestion';
export * from 'src/components/common/Step';
