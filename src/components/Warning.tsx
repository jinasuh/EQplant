import * as React from 'react';
import { styles } from 'src/styles';

const style = {
    fontWeight: 600,
    color: styles.colors.warningText,
    marginTop: '30px'
};

export class Warning extends React.Component<{}, void> {
    public render() {
        const { children } = this.props;
        return <h6 style={style}>{children}</h6>;
    }
}
