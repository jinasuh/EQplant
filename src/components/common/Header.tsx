import * as React from 'react';
import { styles } from 'src/styles';

const headerStyle = {
    fontWeight: 300,
    color: styles.colors.highlight
};

export class Header extends React.Component<{}, void> {
    public render() {
        const { children } = this.props;
        return <h4 style={headerStyle}>{children}</h4>;
    }
}
