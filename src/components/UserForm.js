import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';

const UserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState(user || { name: '', email: '', password: '', role: '' });
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      setAlert('Todos los campos son obligatorios');
      return;
    }
    onSave(formData);
    setAlert(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      {alert && <Alert variant="danger">{alert}</Alert>}
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Contraseña</label>
        <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Rol</label>
        <select name="role" className="form-select" value={formData.role} onChange={handleChange}>
          <option value="">Seleccione un rol</option>
          <option value="customer">Cliente</option>
          <option value="admin">Administrador</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Guardar</button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

export default UserForm;