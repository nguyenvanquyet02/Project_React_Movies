import React from 'react';
import { Link } from 'react-router-dom';
const Button = ({
    onClick,
    className,
    children = "Watch now",
    bgColor = "primary",
    full = false,
    disabled = false,
    to, href, ...passProps
}) => {
    let Comp = 'button'
    const props = {
        onClick,
        ...passProps
    };

    // remove event listener when has props disabled
    if (disabled) {
        Object.keys(props).forEach(key => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        })
    }
    if (to) {
        props.to = to;
        Comp = Link
    }
    else if (href) {
        props.href = href;
        Comp = 'a'
    }
    let bgClassName = "bg-primary"
    switch (bgColor) {
        case "primary":
            bgClassName = "bg-primary";
            break;
        case "secondary":
            bgClassName = "bg-secondary";
            break;
        default:
            break;
    }
    return (
        <Comp
            onClick={onClick}
            className={`py-3 px-6 rounded-lg capitalize ${full ? "w-full" : "w-auto"} ${bgClassName} ${className}`}
            {...props}>
            {children}
        </Comp>
    );
};

export default Button; 