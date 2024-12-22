// src/Components/Button.jsx
import React from 'react';

const Button = ({ style, text, onClick }) => {
    return (
        <button
            className={`px-4 py-2 text-white font-semibold rounded ${style}`}
            onClick={onClick} // Menambahkan event handler onClick
        >
            {text}
        </button>
    );
};

export default Button;
