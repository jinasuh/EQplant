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
export * from 'src/components/common/Header';
export * from 'src/components/common/SubHeader';
export * from 'src/components/common/Paragraph';
export * from 'src/components/common/Option';
export * from 'src/components/common/Prompt';
export * from 'src/components/common/Card';
