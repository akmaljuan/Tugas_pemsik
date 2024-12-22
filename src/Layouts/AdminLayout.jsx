import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        });
    };

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-blue-400 p-4 text-right text-white">
                <button 
                    onClick={handleLogout}
                    className="hover:text-red-800 bg-red-500 px-3 py-1 rounded"
                >
                    Log Out
                </button>
            </header>

            <div className="flex flex-1">
                <aside className="w-64 bg-blue-400 text-white p-5">
                    <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
                    <nav>
                        <ul>
                        <li className="mb-2">
                             <Link to="/admin/posts" className="hover:text-blue-800">
                                   Posts
                                  </Link>
                                </li>

                            <li className="mb-2">
                                <Link to="/admin/dashboard" className="hover:text-blue-800">
                                    Dashboard
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/admin/mahasiswa" className="hover:text-blue-800">
                                    Mahasiswa
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <div className="flex-1 bg-gray-100">
                    <main className="p-4">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
