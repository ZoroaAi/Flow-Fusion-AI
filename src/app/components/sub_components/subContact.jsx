import { motion } from "framer-motion";
import { useState } from "react";
import Loader from "../../utils/Loader.jsx";

export const Card = props => (
    <div className="card">
        {props.children}
    </div>
);
  
export const Form = props => (
    <form className="form" onSubmit={props.onSubmit}>
        {props.children}
    </form>
);
  
export const TextInput = props => (
    <div className="text-input">
        <label
            className={(props.focus || props.value !== '') ? 'label-focus' : ''}
            htmlFor={props.name}
        >
            {props.label}
        </label>
        <input
            className={(props.focus || props.value !== '') ? 'input-focus' : ''}
            type="text"
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            onInput={props.onInput}
            onFocus={props.onFocus}
            onBlur={props.onBlur} 
        />
    </div>
);

const budgets = [
    { id: 1, label: "Less than $500" },
    { id: 2, label: "$500 - $1,000" },
    { id: 3, label: "$1,000 - $5,000" },
    { id: 4, label: "$5,000 - $10,000" },
];

export const BudgetDropDown = ({ value, onFocus, onBlur, onChange }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e) => {
        setIsFocused(true);
        onFocus(e);
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        onBlur(e);
    };

    return(
        <div className={`budget_dropdown ${isFocused || value ? 'focused' : ''}`}>
            <select
                id="budget"
                name="budget"
                value={value}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={onChange}
            >
                <option value="" disabled>Select your budget</option>
                {budgets.map(budget => (
                    <option value={budget.label} key={budget.id}>{budget.label}</option>
                ))}
            </select>
        </div>
    )
}
  
export const TextArea = props => (
    <div className="text-area">

        <label
            className={(props.focus || props.value !== '') ? 'label-focus' : ''}
            htmlFor={props.name}
        >
            {props.label}
        </label>
        <textarea
            className={(props.focus || props.value !== '') ? 'input-focus' : ''}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            onInput={props.onInput}
            onFocus={props.onFocus}
            onBlur={props.onBlur} 
        />
    </div>
);
  
export const Button = ({isLoading, isDone, children, ...props}) => (
    <motion.button
        type="submit"
        className="button"
        whileHover={{
            scale: 1.05,
        }}
        whileTap={{
            scale: 0.95
        }}
        transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30
        }}
        {...props}
    >
        {isLoading ? (
            <Loader/>
        ) : isDone ? (
            <span>Message Sent</span>
        ) : (
            children
        )}
    </motion.button>
);