import * as React from 'react';
import { action } from 'mobx';
import { TargetedLabel } from 'src/components/common/TargetedLabel';

const style = {
    fontWeight: 300
};

export interface IOptionProps {
    key: string;
    id: string;
    name: string;
    onClick: (value: string) => void;
    text: string;
}

export class Option extends React.Component<IOptionProps, void> {
    public render() {
        const { key, id, name, text } = this.props;
        return (
            <div key={key} style={style}>
                <input name={name} type="radio" id={id} onClick={this._onClick} value={key} />
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
