import React from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';







function AboutUsScreen(props) {


    return (

        <div>
            <Grid centered columns={1}>

                <Grid.Row>
                    <Grid.Column className="aboutuscontent">
                        <Container className='aboutus-items' textAlign={"left"} text> <h1>About Us</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> </Container>
                            
                    </Grid.Column>


                </Grid.Row>

            </Grid>
            <Grid centered columns={2} >
                <Grid.Row>
                    <Grid.Column width={4}><Image size={'large'} src='https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80'></Image></Grid.Column>
                    <Grid.Column width={4}>
                        <Image size={'medium'} src='https://images.unsplash.com/photo-1520869422133-f2ac1279d8b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'></Image>
                        <Image size={'medium'} src="https://images.unsplash.com/photo-1546238232-20216dec9f72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1907&q=80">
                        </Image>

                        <Image size={'medium'} src="https://images.unsplash.com/photo-1597936571914-4ce0152f2aa8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80">

                        </Image></Grid.Column>
                </Grid.Row>

            </Grid></div>)
}


export default AboutUsScreen;