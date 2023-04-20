import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';
import ThreeCanvas from './ThreeCanvas';

const Card = ({ title, modelPath }) => (
  <BootstrapCard style={{ width: '18rem', marginBottom: '1rem' }}>
    <ThreeCanvas modelPath={modelPath} />
  </BootstrapCard>
);

export default Card;
