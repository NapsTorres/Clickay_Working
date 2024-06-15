import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { useCreateProductMutation } from '../../slices/productsApiSlice';
import Meta from '../../components/Meta';

const ProductCreateScreen = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const productData = {
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      };
    
      // Log the product data before sending it to the mutation
      console.log('Product Data:', productData);
    
      try {
        await createProduct(productData);
        toast.success('Product Created');
        navigate('/admin/productlist');
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    };
    

  return (
    <>
      <Meta title={'Clickay Add Product'} />
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        <FaArrowAltCircleLeft
          style={{
            marginBottom: '3px',
          }}
        />{' '}
        Go Back
      </Link>
      <FormContainer>
        <h1>Add New Product</h1>
        {loadingCreate && <Loader />}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='name' className='my-2'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='price' className='my-2'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='image' className='my-2'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter image url'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='brand' className='my-2'>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter brand'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='countInStock' className='my-2'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter countInStock'
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='category' className='my-2'>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='description' className='my-2'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Button type='submit' variant='primary' className='my-2'>
            Create Product
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductCreateScreen;
