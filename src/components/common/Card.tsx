import * as React from 'react';

export class Card extends React.Component<{}, void> {
    public render() {
        const { children } = this.props;
        return (
            <div className="card">
                <div className="card-content">
                    <p>{children}</p>
                </div>
            </div>
        );
    }
}
