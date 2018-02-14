import * as React from 'react';
import { action } from 'mobx';
import { TargetedLabel } from 'src/components';

const style = {
    fontWeight: 300
};

export interface IOptionProps {
    value: string;
    id: string;
    name: string;
    onClick: (value: string) => void;
    text: string;
}

export class Option extends React.Component<IOptionProps, void> {
    public render() {
        const { value, id, name, text } = this.props;
        return (
            <div key={value} style={style}>
                <input name={name} type="radio" id={id} onClick={this._onClick} value={value} />
                <TargetedLabel target={id}>{text}</TargetedLabel>
            </div>
        );
    }

    @action.bound
    private _onClick(e: React.MouseEvent<HTMLInputElement>) {
        const { onClick } = this.props;
        onClick(e.currentTarget.value);
    }
}
