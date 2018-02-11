import * as React from 'react';

const paragraphStyle = {
    fontWeight: 300,
    color: 'rgba(0,0,0,0.71)'
};

export class Paragraph extends React.Component<{}, void> {
    public render() {
        const { children } = this.props;
        return <p style={paragraphStyle}>{children}</p>;
    }
}
