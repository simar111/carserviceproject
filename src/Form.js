import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button,Modal } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaCar, FaWrench, FaClock, FaNotesMedical, FaUser, FaPhone } from 'react-icons/fa';
import moment from 'moment';
import './Booking.css';
import Footer from './Footer';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    carBrand: '',
    carType: '',
    serviceType: '',
    timingSlot: '',
    additionalNotes: '',
  });

  const [carBrands, setCarBrands] = useState([]);
  const [carTypes, setCarTypes] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Fetch car brands on component mount
  useEffect(() => {
    const fetchCarBrands = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getcar');
        setCarBrands(response.data);
      } catch (error) {
        console.error('Error fetching car brands:', error);
      }
    };

    fetchCarBrands();
  }, []);
  useEffect(() => {
    const fetchCarTypes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/gettype');
        console.log(response);
        setCarTypes(response.data);
        console.log(carTypes);
      } catch (error) {
        console.error('Error fetching car brands:', error);
      }
    };

    fetchCarTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format timing to "hh:mm A"
    const timing = moment(formData.timingSlot).format("hh:mm A");

    const bookingData = {
      name: formData.name,
      email: formData.email,
      carbrand: formData.carBrand,
      cartype: formData.carType,
      servicetype: formData.serviceType,
      timing: timing,
      notes: formData.additionalNotes,
    };

    try {
      const response = await axios.post('http://localhost:3001/booking', bookingData);
      console.log('Booking created successfully:', response.data);
      //alert('Booking created successfully!');
      setResponseMessage('Booking created successfully!');
      setShowModal(true);  
    } catch (error) {
      console.error('Error creating booking:', error);
      //alert('Failed to create booking. Please try again.');
      setResponseMessage('Failed to create booking. Please try again.');
      setShowModal(true);  
    }
  };
  const handleCloseModal = () => setShowModal(false);
  return (
    <>
      <div className="booking-page d-flex align-items-center" style={{ minHeight: '100vh' }}>
        <Container fluid="md">
          <Row className="justify-content-center align-items-center">
            <Col md={6} className="form-column">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="shadow-lg booking-card p-4" style={{ borderRadius: '15px' }}>
                  <Card.Body className="p-3">
                    <h3 className="text-center mb-3" style={{ color: '#004e92' }}>Book Your Service</h3>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="formName" className="mb-3">
                        <Form.Label><FaUser /> Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="shadow-sm"
                          required
                          placeholder="Enter your name"
                        />
                      </Form.Group>

                      <Form.Group controlId="formMobile" className="mb-3">
                        <Form.Label><FaPhone />Email</Form.Label>
                        <Form.Control
                          type="tel"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="shadow-sm"
                          required
                          placeholder="Enter your email"
                        />
                      </Form.Group>

                      <Form.Group controlId="formCarBrand" className="mb-3">
                        <Form.Label><FaCar /> Car Brand</Form.Label>
                        <Form.Control
                          as="select"
                          name="carBrand"
                          value={formData.carBrand}
                          onChange={handleChange}
                          className="shadow-sm"
                          required
                        >
                          <option value="">Select a brand</option>
                          {carBrands.map((brand) => (
                            <option key={brand._id} value={brand.name}>
                              {brand.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="formCarType" className="mb-3">
                        <Form.Label><FaCar /> Car Type</Form.Label>
                        <Form.Control
                          as="select"
                          name="carType"
                          value={formData.carType}
                          onChange={handleChange}
                          className="shadow-sm"
                          required
                        >
                           <option value="">Select a brand</option>
                          {carTypes.map((brand) => (
                            <option key={brand._id} value={brand.typename}>
                              {brand.typename}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="formServiceType" className="mb-3">
                        <Form.Label><FaWrench /> Service Type</Form.Label>
                        <Form.Control
                          as="select"
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleChange}
                          className="shadow-sm"
                          required
                        >
                          <option value="">Select service</option>
                          <option value="Oil Change">Oil Change</option>
                          <option value="Tire Rotation">Tire Rotation</option>
                          <option value="Brake Inspection">Brake Inspection</option>
                          <option value="Engine Tune-up">Engine Tune-up</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="formTimingSlot" className="mb-3">
                        <Form.Label><FaClock /> Timing Slot</Form.Label>
                        <Form.Control
                          type="datetime-local"
                          name="timingSlot"
                          value={formData.timingSlot}
                          onChange={handleChange}
                          className="shadow-sm"
                          required
                        />
                      </Form.Group>

                      <Form.Group controlId="formAdditionalNotes" className="mb-3">
                        <Form.Label><FaNotesMedical /> Additional Notes</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          name="additionalNotes"
                          value={formData.additionalNotes}
                          onChange={handleChange}
                          className="shadow-sm"
                          placeholder="Enter any additional notes"
                        />
                      </Form.Group>

                      <Button
                        variant="primary"
                        type="submit"
                        className="w-100"
                        style={{
                          background: 'linear-gradient(135deg, #007bff, #66b2ff)',
                          borderRadius: '30px',
                          padding: '8px 0',
                        }}
                      >
                        Submit Booking
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
            {/* Info Section */}
            <Col md={4} className="info-column">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="shadow-lg p-3 custom-info-card">
                  <div className="image-container">
                    <motion.img
                      src="https://png.pngtree.com/thumb_back/fw800/background/20240729/pngtree-the-procedure-of-painting-a-car-in-the-service-center-image_15933744.jpg"
                      alt="Car Service"
                      className="info-image"
                      whileHover={{ scale: 1.05 }}
                    />
                    <div className="gradient-overlay"></div>
                  </div>
                  <div className="info-content text-center">
                    <h4 className="info-title">Premium Service, Every Time</h4>
                    <p className="info-description">
                      Providing high-quality car services with a personal touch. We ensure satisfaction with expert care and advanced technology.
                    </p>
                    <hr className="divider" />
                    <div className="info-features">
                      <div className="feature-item">
                        <i className="icon-expert"></i>
                        <span>Expert Technicians</span>
                      </div>
                      <div className="feature-item">
                        <i className="icon-equipment"></i>
                        <span>Modern Equipment</span>
                      </div>
                      <div className="feature-item">
                        <i className="icon-quality"></i>
                        <span>Top-Quality Service</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </Container>
        <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{responseMessage.includes('successfully') ? 'Success' : 'Error'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{responseMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      <Footer />
    </>
  );
};

export default Booking;
