import { React, useState, useEffect } from 'react'
import { Button, Form, FormLabel, Row, Col } from "react-bootstrap"
import { EditExpense, NewExpense, DeleteExpense } from '../services/expenses';
import {useDispatch} from 'react-redux'

const ExpenseForm = ({ expense, setIsEditing }) => {
    const descriptions = ['Groceries', 'Credit Card', 'Student Loan', 'Eating out', 'Gas'];
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState(descriptions[0]);
    const [isNewExpense, setIsNewExpense] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (expense !== undefined) {
            setIsNewExpense(false);
            setAmount(expense.amount);
        }
        else{
            setIsNewExpense(true);
        }
    }, [expense])
    return <Form
        onSubmit={event => {
            event.preventDefault();
            if (isNewExpense){
                NewExpense(dispatch, {description: description, amount: Number(amount)});
            }
            else{
                EditExpense(dispatch, {id: expense.id, description: description, amount: Number(amount)});
                setIsEditing(false);
            }
            
        }}
    >
        <Row>
            <Col>
                <FormLabel>Descriptions</FormLabel>
                <Form.Control as='select'
                    onChange={event => setDescription(event.target.value)}>
                    {descriptions.map((d, idx) => <option key={idx}>{d}</option>)}
                </Form.Control>
            </Col>
            <Col>
                <FormLabel>Amount</FormLabel>
                <Form.Control type='number' step='0.01'
                    placeholder={amount}
                    onChange={event => setAmount(event.target.value)} />
            </Col>
            <Col>
                <div style={{ marginTop: '2em' }}>
                {isNewExpense
                    ? <Button variant="primary" type="submit">Add</Button>
                    : <div>
                        <Button style={{marginRight: '2px'}} variant="danger"
                        onClick={() => DeleteExpense(dispatch, expense)}>Delete</Button>
                        <Button style={{marginRight: '2px'}} variant="success" type="submit">Save</Button>
                        <Button style={{marginRight: '2px'}} variant="default" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </div>}
            </div>
            </Col>
        </Row>
    </Form>
}

export default ExpenseForm;