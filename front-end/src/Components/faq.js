import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Label, Reveal } from 'semantic-ui-react';


export default function Faq(props) {
  const { faqitem } = props;
  return (
<Container  className='faq-items'textAlign={"left"} text> <h1>{faqitem.title}</h1> <p>{faqitem.description}</p></Container>
      
    
      
   


);
}