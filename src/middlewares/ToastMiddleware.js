import {
    newExpense, editExpense, deleteExpense,
    setExpenseError, newExpenseError, editExpenseError, deleteExpenseError
} from "../app/expensesSlice";
import { toast } from "react-toastify";

const ToastMiddleware = () => next => action => {
    switch (action.type) {
        case newExpense.type:
            toast.success('Expense created')
            break;
        case editExpense.type:
            toast.success('Expense updated')
            break;
        case deleteExpense.type:
            toast.success('Expense deleted')
            break;
        case setExpenseError.type:
            toast.error('Error loading expenses')
            break;
        case newExpenseError.type:
            toast.error('Error adding expenses')
            break;
        case editExpenseError.type:
            toast.error('Error editing expenses')
            break;
        case deleteExpenseError.type:
            toast.error('Error editing expenses')
            break;

        default:
            break;
    }
    return next(action);
}

export default ToastMiddleware;
