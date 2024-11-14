import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
// import './ServiceDetailsPage.css';

// Enhanced service data
const servicesInfo = [
  {
    title: 'Full Car Service',
    description:
      'Comprehensive maintenance including engine diagnostics, fluid check, brake inspection, and tire rotation.',
    features: ['Engine Diagnostics', 'Fluid Check', 'Brake Inspection', 'Tire Rotation'],
    img: 'https://source.unsplash.com/featured/?car,service',
    benefits: 'Reduces long-term costs and ensures safety.',
  },
  {
    title: 'Repair & Maintenance',
    description:
      'Comprehensive repair services including brake repair, oil changes, and suspension maintenance.',
    features: ['Brake Repair', 'Oil Change', 'Battery Check', 'Suspension Maintenance'],
    img: 'https://source.unsplash.com/featured/?car,repair',
    benefits: 'Prevents unexpected breakdowns.',
  },
  {
    title: 'Battery Replacement',
    description:
      'Reliable battery replacement with high-quality batteries, ensuring your car starts every time.',
    features: ['Battery Check', 'Quick Replacement', 'Warranty Included', 'Old Battery Disposal'],
    img: 'https://source.unsplash.com/featured/?battery,car',
    benefits: 'Prevents battery-related issues.',
  },
  {
    title: 'Oil Change',
    description:
      'Regular oil changes with top-grade engine oil, reducing wear and extending engine life.',
    features: ['Synthetic Oil', 'Filter Replacement', 'Engine Health Check', 'Quick Service'],
    img: 'https://source.unsplash.com/featured/?oil,car',
    benefits: 'Improves engine longevity.',
  },
  {
    title: 'Collision Repair',
    description:
      'Expert collision repair services to restore your car’s appearance and safety after an accident.',
    features: ['Dent Repair', 'Frame Alignment', 'Paint Matching', 'Parts Replacement'],
    img: 'https://source.unsplash.com/featured/?collision,repair',
    benefits: 'Restores vehicle aesthetics and safety.',
  },
];

// Hero Section Animation Variants
const heroVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const ServiceDetailsPage = () => {
  return (
    <div style={{ backgroundColor: '#f0f2f5' }}>
      {/* Hero Section with Image Background */}
      <div
        style={{
          position: 'relative',
          height: '500px',
          backgroundImage: 'url(https://www.shutterstock.com/image-photo/car-diagnostic-service-close-computer-600nw-2296773977.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8))',
          }}
        ></div>
        <Container style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <motion.h1
            className="display-4 text-white fw-bold"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            Premium Car Services
          </motion.h1>
          <motion.p
            className="lead text-white"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            Reliable, Professional, and Fast
          </motion.p>
          <motion.a
            href="#services"
            className="btn btn-primary btn-lg mt-3"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            Explore Services
          </motion.a>
        </Container>
      </div>

      {/* Service Cards Section */}
      <Container className="py-5" id="services">
        <h2 className="text-center mb-4">Our Services</h2>
        <Row>
          {servicesInfo.map((service, index) => (
            <Col md={6} lg={4} className="mb-4" key={index}>
              <motion.div
                className="service-card shadow-lg"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="h-100">
                  <motion.img
                    src={service.img}
                    alt={service.title}
                    className="card-img-top"
                    whileHover={{ scale: 1.05 }}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title className="text-center fw-bold">{service.title}</Card.Title>
                    <Card.Text>{service.description}</Card.Text>
                    <h6>Key Features:</h6>
                    <ul>
                      {service.features.map((feature, i) => (
                        <li key={i}>
                          <FaCheckCircle className="text-success me-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <p><strong>Benefits:</strong> {service.benefits}</p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Call to Action */}
      <div style={{ background: '#004e92', padding: '40px 0', color: '#fff' }}>
        <Container className="text-center">
          <h4>Need Assistance? Contact Us Today!</h4>
          <Button variant="light" className="m-2">Call Now</Button>
          <Button variant="light" className="m-2">Email Us</Button>
        </Container>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
