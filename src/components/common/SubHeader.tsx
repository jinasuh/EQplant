import * as React from 'react';

const headerStyle = {
    fontWeight: 400,
    color: 'rgba(0,0,0,0.71)',
    marginTop: '30px'
};

export class SubHeader extends React.Component<{}, void> {
    public render() {
        const { children } = this.props;
        return <h6 style={headerStyle}>{children}</h6>;
    }
}
