import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Form } from 'semantic-ui-react';
import { listProducts, saveProduct, deleteProduct } from '../Actions/productActions';
import { login } from '../Actions/userActions';


function ProductsScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [color, setColor] = useState('');
    const [featured, setFeatured] = useState(false);
    const [category, setCategory] = useState('');
    const [inventory, setInventory] = useState('');
    const [description, setDescription] = useState('');
    const productList = useSelector(state => state.productList)
    const { loading, products, error } = productList;
    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;
    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

    const {
        ctg = 'all',
        kolor = 'all',
        brnd = 'all',
        keyword = 'all',
        order = 'newest',
        min = 0,
        max = 1000000,
        rate = 0,
        page = 10000
    } = useParams();
    const dispatch = useDispatch();


    useEffect(() => {
        if (successSave) {
            setModalVisible(false);
        }
        dispatch(listProducts({
            order,
            category: ctg !== 'all' ? ctg : '',
            color: kolor !== 'all' ? kolor : '',
            brand: brnd !== 'all' ? brnd : '',
            keyword: keyword !== 'all' ? keyword : '',
            min,
            max,
            rate,
            page
        }));
        return () => {
        }
    }, [successSave, successDelete]);

    const openModal = (product) => {
        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price); setImage(product.image); setBrand(product.brand);
        setColor(product.color); setCategory(product.category);
        setInventory(product.inventory); setDescription(product.description);
        setFeatured(product.featured);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({ _id: id, name, price, image, brand, color, category, inventory, description, featured }));


    }
    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id));
    }

    return (
        <div className='content content-margined'>
            <div className='product-header'>
                <h2>Products</h2>
                <button class='ui grey button' onClick={() => openModal({})}>Create Product</button>
            </div>
            {modalVisible && <div className="form-section">
                <form class="ui form" onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <button type="button" onClick={() => setModalVisible(false)} class='ui inverted button blue'>Back</button>
                        </li>
                        <li>
                            <h1>Create Product</h1>
                        </li>
                        <li> {loadingSave && <div>Loading...</div>}</li>
                        <li> {errorSave && <div>{errorSave}</div>}</li>
                        <Form.Input fluid label='Name' type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)} />
                        <Form.Group widths='equal'>
                            <Form.Input fluid label='Price' type="text" name="price" value={price} id="price" onChange={(e) => setPrice(e.target.value)}></Form.Input>
                            <Form.Input fluid label='Inventory' type="text" name="inventory" value={inventory} id="inventory" onChange={(e) => setInventory(e.target.value)}></Form.Input>
                        </Form.Group>
                        <Form.Input fluid label='Image' type="text" name="image" value={image} id="image" onChange={(e) => setImage(e.target.value)} />
                        <Form.Input fluid label='Brand' type="text" name="brand" value={brand} id="brand" onChange={(e) => setBrand(e.target.value)} />
                        <Form.Input fluid label='Color' type="text" name="color" value={color} id="color" onChange={(e) => setColor(e.target.value)} />
                        <Form.Input fluid label='Category' type="text" name="category" value={category} id="category" onChange={(e) => setCategory(e.target.value)} />
                        <Form.TextArea label="Description" name="description" value={description} id="description" onChange={(e) => setDescription(e.target.value)} />
                        <Form.Checkbox checked={featured} label='Featured' name="featured" id="featured" onChange={(e) => setFeatured(e.target.checked)} />
                        <li>
                            <button type="submit" class='ui button grey'>{id ? 'Edit' : 'Create'} Product</button>
                        </li>
                    </ul>

                </form> </div>}


            <div className='product-list'>
                <table className='product-list-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Color</th>
                            <th>Featured</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (<tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>{product.color}</td>
                            <td>{product.featured.toString()}</td>
                            <td>
                                <button class='ui orange inverted button' onClick={() => openModal(product)}>Edit</button>
                                <button class="ui red inverted button" onClick={() => deleteHandler(product)}>Delete</button>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            </div>



        </div>







    );


}

export default ProductsScreen;



