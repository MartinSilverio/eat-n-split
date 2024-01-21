import { CSSProperties, FormEvent, useState } from 'react';
import { Input } from './Input';
import { Friend } from './types';

export interface SplitBillFormProps {
    friend: Friend;
    onSubmit: (n: number) => void;
}

export default function SplitBillForm({
    friend,
    onSubmit,
}: SplitBillFormProps) {
    const [billValue, setBillValue] = useState(0);
    const [myExpense, setMyExpense] = useState(0);
    const [payer, setPayer] = useState(0);

    const friendExpense = billValue - myExpense;

    const style: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#575a78',
        minWidth: '40vw',
        padding: '30px',
        gap: '10px',
    };

    function handleBillChange(bill: string) {
        setBillValue(+bill);
    }
    function handleMyExpenseChange(expense: string) {
        if (+expense > billValue) return;
        setMyExpense(+expense);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        payer === 0 ? onSubmit(friendExpense) : onSubmit(-myExpense);
        setBillValue(0);
        setMyExpense(0);
        setPayer(0);
    }

    return (
        <form style={style} onSubmit={handleSubmit}>
            <h3>Split Bill with {friend.name}</h3>
            <Input
                value={`${billValue}`}
                onChange={handleBillChange}
                type="number"
            >
                Bill value
            </Input>
            <Input
                value={`${myExpense}`}
                onChange={handleMyExpenseChange}
                type="number"
            >
                Your expense
            </Input>
            <Input value={`${friendExpense}`} type="number" disabled>
                {friend.name}'s Expense
            </Input>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label htmlFor="">Who is paying the bill?</label>
                <select
                    style={{ width: '175px' }}
                    value={payer}
                    onChange={(e) => setPayer(+e.target.value)}
                >
                    <option value="0">You</option>
                    <option value="1">{friend.name}</option>
                </select>
            </div>
            <button>Split Bill</button>
        </form>
    );
}
