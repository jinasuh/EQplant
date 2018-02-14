import * as React from 'react';
import { styles } from 'src/styles';

const headerStyle = {
    fontWeight: 400,
    color: styles.colors.text,
    marginTop: '30px'
};

export class SubHeader extends React.Component<{}, void> {
    public render() {
        const { children } = this.props;
        return <h6 style={headerStyle}>{children}</h6>;
    }
}
