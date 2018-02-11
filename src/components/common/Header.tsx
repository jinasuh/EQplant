import * as React from 'react';

const headerStyle = {
    fontWeight: 300,
    color: '#ee6e73'
};

export class Header extends React.Component<{}, void> {
    public render() {
        const { children } = this.props;
        return <h4 style={headerStyle}>{children}</h4>;
    }
}
