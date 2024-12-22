import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Button from '../../Components/Button';
import Table from '../../Components/Table';

const Mahasiswa = () => {
    const [formData, setFormData] = useState({
        nama: '',
        nim: '',
    });
    
    const [tableData, setTableData] = useState([
        { nama: 'AKMAL', nim: 'A11.2022.14675' },
        { nama: 'JUAN', nim: 'A11.2022.14675' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.nama || !formData.nim) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Semua field harus diisi!'
            });
            return;
        }

        if (editIndex !== null) {
            // Update existing data
            const updatedData = [...tableData];
            updatedData[editIndex] = formData;
            setTableData(updatedData);
            Swal.fire('Sukses', 'Data berhasil diupdate!', 'success');
        } else {
            // Add new data
            setTableData(prev => [...prev, formData]);
            Swal.fire('Sukses', 'Data berhasil ditambahkan!', 'success');
        }

        // Reset form
        setFormData({ nama: '', nim: '' });
        setIsModalOpen(false);
        setEditIndex(null);
    };

    const handleEdit = (data, index) => {
        setFormData(data);
        setEditIndex(index);
        setIsModalOpen(true);
    };

    const handleDelete = (index) => {
        Swal.fire({
            title: 'Apakah anda yakin?',
            text: "Data akan dihapus permanen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!'
        }).then((result) => {
            if (result.isConfirmed) {
                const newData = tableData.filter((_, idx) => idx !== index);
                setTableData(newData);
                Swal.fire('Deleted!', 'Data berhasil dihapus.', 'success');
            }
        });
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Data Mahasiswa</h1>
                <Button 
                    onClick={() => setIsModalOpen(true)}
                    text="Tambah Mahasiswa"
                    style="bg-blue-500 hover:bg-blue-700"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b">No</th>
                            <th className="px-6 py-3 border-b">Nama</th>
                            <th className="px-6 py-3 border-b">NIM</th>
                            <th className="px-6 py-3 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((item, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 border-b text-center">{index + 1}</td>
                                <td className="px-6 py-4 border-b">{item.nama}</td>
                                <td className="px-6 py-4 border-b">{item.nim}</td>
                                <td className="px-6 py-4 border-b text-center">
                                    <button
                                        onClick={() => handleEdit(item, index)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">
                            {editIndex !== null ? 'Edit Mahasiswa' : 'Tambah Mahasiswa'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block mb-2">Nama:</label>
                                <input
                                    type="text"
                                    name="nama"
                                    value={formData.nama}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">NIM:</label>
                                <input
                                    type="text"
                                    name="nim"
                                    value={formData.nim}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setFormData({ nama: '', nim: '' });
                                        setEditIndex(null);
                                    }}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    {editIndex !== null ? 'Update' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Mahasiswa;
