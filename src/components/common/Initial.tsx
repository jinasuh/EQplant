import * as React from 'react';
import { styles } from 'src/styles';

const iconStyle = {
    fontSize: '15px',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: styles.colors.initialBackground,
    color: styles.colors.initialText,
    lineHeight: '30px',
    textAlign: 'center'
};

export interface IInitialProps {
    name: string;
}

export class Initial extends React.Component<IInitialProps, void> {
    public render() {
        const { name } = this.props;
        const initial = name.toUpperCase()[0];
        return <div style={iconStyle}>{initial}</div>;
    }
}
