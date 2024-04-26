import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    status: ''
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/article/${id}`);
      const { title, content, category, status } = response.data.data;
      setFormData({ title, content, category, status });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [id]);
  
  useEffect(() => {
    console.log('Fetching data...');
    fetchData();
  }, [fetchData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response =  await axios.put(`http://localhost:8080/article/${id}`, formData);
      if (response.data.success) {
        Swal.fire({
            title: 'Success!',
            text: response.data.message,
            icon: 'success',
            timer: 2000,
            showConfirmButton: true,
            confirmButtonText: 'OK'
        }).then(() => {
            navigate("/posts");
        });

      } else {
        Swal.fire({
            title: 'Error!',
            text: response.data.message,
            icon: 'error',
            timer: 2000,
            showConfirmButton: true,
            confirmButtonText: 'OK'
        });
      }
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: error.response.data.message,
            icon: 'error',
            timer: 2000,
            showConfirmButton: true,
            confirmButtonText: 'OK'
        });
      console.error('Error updating article:', error);
    }
  };

  return (
    <div className="container p-4">
      <h3>Update Data</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea className="form-control" id="content" name="content" value={formData.content} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <input type="text" className="form-control" id="category" name="category" value={formData.category} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select className="form-select" id="status" name="status" value={formData.status} onChange={handleChange}>
            <option value="Publish">Publish</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default UpdateData;
