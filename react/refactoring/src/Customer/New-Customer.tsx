import React from 'react';
import { CustomerInformation } from './Customer';

interface Props {
    addCustomer: (customer: Pick<CustomerInformation, 'prename' | 'surname'>) => void;
}

interface State {
    prename: string;
    surname: string;
}

class NewCustomer extends React.Component<Props, State> {

    constructor(props: Props, context: any) {
        super(props, context);

        this.state = {
            prename: '',
            surname: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return (
            <>
                <h2>Add new customer</h2>
                <form onSubmit={this.onSubmit}>
                    <input type="text" value={this.state.prename} onChange={(event) => this.onChange({ prename: event.target.value })}/>
                    <input type="text" value={this.state.surname} onChange={(event) => this.onChange({ surname: event.target.value })}/>
                    <input type="submit" value="Save" />
                </form>
            </>
        );
    }

    private onChange(change: { [key: string]: string }): void {
        this.setState({
            ...this.state,
            ...change
        });
    }

    private onSubmit(event: React.FormEvent): void {
        if (this.state.prename !== '' && this.state.surname !== '') {
            this.props.addCustomer({ prename: this.state.prename, surname: this.state.surname });
            this.setState({ prename: '', surname: '' });
        }

        event.preventDefault();
    }

}

export default NewCustomer;