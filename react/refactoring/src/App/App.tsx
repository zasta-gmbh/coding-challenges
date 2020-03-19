import React from 'react';
import './App.css';
import Customer, { CustomerInformation } from '../Customer/Customer';

interface State {
    customers: CustomerInformation[];
}

class App extends React.Component<any, State> {

    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            customers: [
                { id: 1, prename: 'John', surname: 'Doe' },
                { id: 2, prename: 'Molly', surname: 'Ringwald'},
                { id: 3, prename: 'Joe', surname: 'Black'},
                { id: 4, prename: 'Dennis', surname: 'Weu'}
            ]
        }

        this.addCustomer = this.addCustomer.bind(this);
        this.nextId = this.nextId.bind(this);
        this.removeCustomer = this.removeCustomer.bind(this);
        this.saveEditedCustomer = this.saveEditedCustomer.bind(this);
    }

    render() {
        return (
            <Customer
                customers={this.state.customers}
                addCustomer={this.addCustomer}
                removeCustomer={this.removeCustomer}
                saveCustomer={this.saveEditedCustomer}
            />
        );
    }

    private addCustomer(customer: Pick<CustomerInformation, 'prename' | 'surname'>): void {
        const customerWithId: CustomerInformation = {
            id: this.nextId(),
            ...customer
        } 

        this.setState({
            customers: [...this.state.customers, customerWithId]
        })
    }

    private removeCustomer(id: number): void {
        const customers = this.state.customers.filter((customer) => customer.id !== id);
        
        this.setState({
            customers
        })
    }

    private saveEditedCustomer(customer: CustomerInformation): void {
        const customers = this.state.customers;
        const index = customers.findIndex((e) => e.id === customer.id);
        const before = customers[index];
        const changed = { ...before, ...customer};
        customers.splice(index, 1);
        customers.push(changed);
        
        this.setState({
            customers
        })
    }

    private nextId(): number {
        const currentHighestId = this.state.customers.reduce((acc, curr) => {
            return acc > curr.id ? acc : curr.id
        }, 0);


        return currentHighestId + 1;
    }
}

export default App;
