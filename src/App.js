import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './User Form';
import { Table, Button } from 'react-bootstrap';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser , setEditingUser ] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('https://api.escuelajs.co/api/v1/users');
    setUsers(response.data);
  };

  const handleSave = async (user) => {
    if (editingUser ) {
      await axios.put(`https://api.escuelajs.co/api/v1/users/${editingUser .id}`, user);
    } else {
      await axios.post('https://api.escuelajs.co/api/v1 /users', user);
    }
    setShowForm(false);
    setEditingUser (null);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditingUser (user);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://api.escuelajs.co/api/v1/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="container mt-5">
      <h1>CRUD de Usuarios</h1>
      <Button variant="primary" onClick={() => { setShowForm(true); setEditingUser (null); }}>Agregar Usuario</Button>
      {showForm && (
        <User Form user={editingUser } onSave={handleSave} onCancel={() => setShowForm(false)} />
      )}
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(user)}>Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(user.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default App;