import React from 'react'
import { Row, Col } from 'react-bootstrap'
import products from '../products'
import Product from '../components/Product'
export default function HomeScreen() {
    return (
        <>
            <h1>Latest products</h1>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={2}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
}
