import React from 'react';
import { Link } from 'react-router-dom';

import data from '../data';
import { Grid, Image } from 'semantic-ui-react';




export default function Popular() {
    const popular=data.popular;
  return (
    <Grid container stackable columns={2}>
        <Grid.Row>
        {popular.map((pop) =>
<Grid.Column width={8} as={Link} to={'/search/brand/'+pop.title} className="popular-brand-columns"> 
<Image src={pop.image}  className="popular-brand-image"/>
<h2>{pop.title}</h2>
<p>{pop.description}</p>
<div></div>
</Grid.Column>)

}


        </Grid.Row>
        
    </Grid>
  );
}