// Table.jsx
import React from 'react';

const Table = ({ data, onEdit, onDelete }) => {
    return (
        <table className="w-full bg-white shadow-md rounded">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-4">No</th>
                <th className="p-4">Nama</th>
                <th className="p-4">Nim</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td className="border p-4">{index + 1}</td>
                        <td className="border p-4">{item.nama}</td>
                        <td className="border p-4">{item.nim}</td>
                        <td className="border p-4">
                            <button
                                onClick={() => onEdit(item, index)}
                                className="bg-blue-500 text-white hover:bg-red-800 px-4 py-2 rounded mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(index)}
                                className="bg-red-500 text-white hover:bg-red-800 px-4 py-2 rounded"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
