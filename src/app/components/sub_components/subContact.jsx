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
    
);