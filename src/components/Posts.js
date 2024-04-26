import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { formatDate } from './utils';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Posts = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async (status = '') => {
    try {
      let url = 'http://localhost:8080/article/lists/20/0';

      if (status) {
        url += `?status=${status}`;
      }
  
      const response = await axios.get(url);
      setArticles(response.data.data.rows); 
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleClick = (status) => {
    fetchArticles(status);
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this data!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const response = await axios.delete(`http://localhost:8080/article/${id}`);
        setArticles(articles.filter(article => article.id !== id));
        console.log(response.data);
        
        Swal.fire({
          title: 'Deleted!',
          text: response.data.message,
          icon: 'success',
          timer: 2000
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
      console.error('Error deleting article:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid p-4">
      <h3>Articles</h3>
      <Link className="btn btn-primary" to="/posts/add">Add Data</Link>
      <div className="row" style={{ marginTop: '10px' }}>
        <div className="col"></div>
        <div className="col-md-8">
        <div className="text-end">
          <span onClick={() => handleClick('')} className="text-primary" style={{ cursor: 'pointer', textDecoration: 'underline' }}>All</span>
          <span className="text-primary"> | </span>
          <span onClick={() => handleClick('publish')} className="text-primary" style={{ cursor: 'pointer', textDecoration: 'underline' }}>Publish</span>
          <span className="text-primary"> | </span>
          <span onClick={() => handleClick('draft')} className="text-primary" style={{ cursor: 'pointer', textDecoration: 'underline' }}>Draft</span>
          <span className="text-primary"> | </span>
          <span onClick={() => handleClick('trash')} className="text-primary" style={{ cursor: 'pointer', textDecoration: 'underline' }}>Trash</span>
        </div>
          <table className="table table-bordered" style={{ marginTop: '10px' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Content</th>
                <th>Category</th>
                <th>Status</th>
                {/* <th>Created At</th>
                <th>Updated At</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{article.title}</td>
                  <td>{article.content}</td>
                  <td>{article.category}</td>
                  <td>{article.status}</td>
                  {/* <td>{formatDate(article.created_at)}</td>
                  <td>{formatDate(article.updated_at)}</td> */}
                  <td>
                    <Link to={`/posts/update/${article.id}`} className="btn btn-primary" style={{ marginRight: '8px' }}>Update</Link>
                    {/* <button onClick={() => handleDelete(article.id)} className="btn btn-danger">Delete</button> */}
                    <Link to={`/posts/preview/${article.id}`} className="btn btn-warning" style={{ marginRight: '8px' }}>Preview</Link>
                    <button onClick={() => handleDelete(article.id)} className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default Posts;
