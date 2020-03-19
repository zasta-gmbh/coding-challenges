import React from 'react';
import NewCustomer from './New-Customer';

export type CustomerInformation = {
    id: number;
    prename: string;
    surname: string;
}

interface Props {
    customers: CustomerInformation[];
    addCustomer: (customer: Pick<CustomerInformation, 'prename' | 'surname'>) => void;
    removeCustomer: (id: number) => void;
    saveCustomer: (customer: CustomerInformation) => void;
}

interface State {
    currentlyEditing: CustomerInformation[]
}

class Customer extends React.Component<Props, State> {

    constructor(props: Props, context: any) {
        super(props, context);

        this.state = {
            currentlyEditing: []
        }
    }

    render() {
        return (
            <div>
                <h2>List of customers</h2>
                <ul>
                    {this.props.customers.map((customer: CustomerInformation, index: number) => {
                        const editing = this.state.currentlyEditing.find((editing) => editing.id === customer.id);
                        if (editing) {
                            return <li style={{fontSize: "20px"}} key={customer.id}>
                                {index + 1}.
                                <form onSubmit={(event) => this.saveEdit(editing, event)}>
                                    <input type="text" value={editing.prename} onChange={(event) => this.onEdit(editing, { prename: event.target.value })}/>
                                    <input type="text" value={editing.surname} onChange={(event) => this.onEdit(editing, { surname: event.target.value })}/>
                                    <input type="submit" value="Save" />
                                </form>
                            </li>;
                        }

                        return <li style={{fontSize: "20px"}} key={customer.id}>
                            {index + 1}. <strong>{customer.prename}</strong> {customer.surname}
                            <button onClick={() => this.startEdit(customer)}>Edit</button>
                            <button onClick={() => this.onRemove(customer.id)}>Remove</button>
                        </li>
                    })
                    }
                </ul>
                <hr/>
                <NewCustomer addCustomer={this.props.addCustomer} />
            </div>
        );
    }

    private onRemove(id: number): void {
        this.props.removeCustomer(id)
    }

    private startEdit(customer: CustomerInformation): void {
        this.setState({
            currentlyEditing: [...this.state.currentlyEditing, customer]
        });
    }

    private onEdit(customer: CustomerInformation, change: { [key: string]: string}): void {
        const currentlyEditing = this.state.currentlyEditing;
        const index = currentlyEditing.findIndex((e) => e.id === customer.id);
        const before = currentlyEditing[index];
        const changed = { ...before, ...change};
        currentlyEditing.splice(index, 1);
        currentlyEditing.push(changed);
        
        this.setState({
            currentlyEditing
        })
    }

    private saveEdit(customer: CustomerInformation, event: React.FormEvent): void {
        const currentlyEditing = this.state.currentlyEditing;
        const index = currentlyEditing.findIndex((e) => e.id === customer.id);
        currentlyEditing.splice(index, 1);
        
        this.setState({
            currentlyEditing
        });

        this.props.saveCustomer(customer);

        event.preventDefault();
    }
}

export default Customer;