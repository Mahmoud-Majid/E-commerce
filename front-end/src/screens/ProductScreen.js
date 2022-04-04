import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader';
import Message from '../components/Message';

export default function ProductScreen({ history }) {
    const [qty, setQty] = React.useState(0);
    const params = useParams();
    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    useEffect(() => {

        dispatch(listProductDetails(params.id));
    }, [dispatch, params.id]);

    const addToCartHandler = () => {
        history.push(`/cart/${product._id}?qty=${qty}`);
    }
    return (
        <>
            <Link className='btn btn-light my-3' to='/'>Back to products</Link>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                (<Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.name} text={`${product.numReviews}`} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Describtion: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {
                                product.countInStock > 0 &&
                                (<ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                            <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                                {[...Array(product.countInStock).keys()].map(x => <option key={x + 1} value={x + 1}>{x + 1}</option>)}
                                            </Form.Control>
                                        </Col>

                                    </Row>
                                </ListGroup.Item>)
                            }
                            <ListGroup.Item>
                                <Button
                                    onClick={addToCartHandler}
                                    className='btn-block' type='button' disabled={product.countInStock === 0}>
                                    Add to cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                </Row>)}

        </>
    )
}
