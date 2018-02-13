import * as React from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { Option, Prompt } from 'src/components/common';

const style = {
    container: {
        marginBottom: '10px'
    },
    question: {
        color: 'rgba(0, 0, 0, 0.71)'
    }
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
        const { question, options, name } = this.props;
        const optionComponents = options.map(option => {
            const id = `${name}-${option.id}`;
            return <Option value={option.id} id={id} text={option.text} onClick={this._onClick} name={name} />;
        });
        return (
            <div style={style.container}>
                <Prompt>{question}</Prompt>
                {optionComponents}
            </div>
        );
    }

    @action.bound
    private _onClick(value: string) {
        const { onSelect, name } = this.props;
        onSelect(name, value);
    }
}
