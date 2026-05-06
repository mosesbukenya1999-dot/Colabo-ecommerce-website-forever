// components/Toast/Toast.jsx
import React, { useEffect, useState } from "react";
import "./Toast.css";

const Toast = ({ message, type = "error", duration = 4000, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
            if (onClose) onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className={`toast ${type} ${visible ? "show" : ""}`}>
            {message}
        </div>
    );
};

export default Toast;