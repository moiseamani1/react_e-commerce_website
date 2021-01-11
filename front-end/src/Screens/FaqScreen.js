import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dimmer, Grid, Loader } from 'semantic-ui-react';
import { listFaq } from '../Actions/faqActions';
import Faq from '../Components/faq';




function FaqScreen(props) {
  const faqList = useSelector(state => state.faqList);
  const dispatch = useDispatch();

  const {
    faq,
    error: errorFaq,
    loading: loadingFaq,
  } = faqList;
  useEffect(() => {
    dispatch(listFaq());
    return () => {

    };
  }, []);

  return (


    <Grid padded centered columns={1}>{loadingFaq ? (
      <Dimmer active inverted>
        <Loader size='huge'>Loading</Loader>
      </Dimmer>
    ) : errorFaq ? (
      <p>{errorFaq}</p>
    ) : (<div>  {faq.length === 0 && <p>No Faq Found</p>}

      <Grid.Column className="faqcontent"><h1>FREQUENTLY ASKED QUESTIONS</h1>{faq.map((faqitem) => (<Grid.Row><Faq key={faqitem._id} faqitem={faqitem} /> </Grid.Row>))}</Grid.Column>
    </div>)
    }</Grid>



  )


}

export default FaqScreen;