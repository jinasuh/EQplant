import * as React from 'react';
import { observer } from 'mobx-react';
import { targetedLabel } from 'src/components/common';

const style = {
    container: {
        marginBottom: '10px'
    },
    option: {}
};

export interface IOption {
    id: string;
    text: string;
}

export interface IQuestionProps {
    question: string;
    options: IOption[];
    name: string;
    optional?: boolean;
    onSelect: (name: string, value: string) => void;
}

@observer
export class MultipleChoiceQuestion extends React.Component<IQuestionProps, void> {
    public render() {
        const TargetedLabel = targetedLabel();
        const { question, options, name } = this.props;
        const optionComponents = options.map(option => {
            const id = `${name}-${option.id}`;
            return (
                <div key={option.id}>
                    <input name={name} type="radio" id={id} onClick={this._onClick.bind(this)} value={option.id} />
                    <TargetedLabel target={id}>{option.text}</TargetedLabel>
                </div>
            );
        });
        return (
            <div style={style.container}>
                <div>{question}</div>
                {optionComponents}
            </div>
        );
    }

    private _onClick(e: React.MouseEvent<HTMLInputElement>) {
        const { onSelect, name } = this.props;
        onSelect(name, e.currentTarget.value);
    }
}
