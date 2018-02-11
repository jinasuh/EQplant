import * as React from 'react';
import { styles } from 'src/styles';

const paragraphStyle = {
    fontWeight: 300,
    color: styles.colors.text
};

export class Paragraph extends React.Component<{}, void> {
    public render() {
        const { children } = this.props;
        return <p style={paragraphStyle}>{children}</p>;
    }
}
