import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { detailsUser, updateUserProfile } from '../Actions/userActions';

import { saveShipping } from '../Actions/cartActions';
import CheckoutSteps from '../Components/checkOutSteps';
import { Form, Dropdown } from 'semantic-ui-react';
import data from '../data';


function ShippingScreen(props) {


  //retrieve addresses form userInfo object and instantiate radio button elements
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const [savedOption, setSavedOption] = useState([]);


  const selectedAddressHandler = (e, data) => {
    setAddress(data.value.street)
    setCity(data.value.city)
    setPostalCode(data.value.postal)
    setCountry(data.value.country)

  }
  const initSavedOption = (savedAddress) => {
    // setSavedOption([])
    // savedAddress.map((address,index)=>{
    //   const saved=address.street+','+address.city+','+address.postal+','+address.country
    //   savedOption.push({ key: index, value: savedAddress, flag: index, text: saved  })

    // })
    savedAddress.forEach((address, index) => {
      const saved = address.street + ',' + address.city + ',' + address.postal + ',' + address.country
      savedOption.push({ key: index, value: address, flag: index, text: saved, })
    })


    console.log('This is saved option:' + savedOption.toString())


  }

  if (!userInfo) {
    props.history.push('/login');
  }




  const [savedAddress, setSavedAddress] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {


    if (!user) {
      dispatch(detailsUser(userInfo._id));
    } else {
      //dispatch(detailsUser(userInfo._id));
      setSavedAddress(user.shippingAddress || [])
      initSavedOption(user.shippingAddress || [])
    }




  }, [dispatch, userInfo._id, user]);



  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [saveAddress, setSaveAddress] = useState(false);



  const submitHandler = (e) => {
    e.preventDefault();
    //check if chek box is checked to save shipping permanently
    if (saveAddress) {
      var shippingAddress = {}
      shippingAddress['street'] = address
      shippingAddress['city'] = city
      shippingAddress['postal'] = postalCode
      shippingAddress['country'] = country

      dispatch(updateUserProfile({ userId: userInfo._id, shippingAddress, isContentManager: userInfo.isContentManager, delAddress: false }))
    }
    dispatch(saveShipping({ fullName, address, city, postalCode, country }));
    props.history.push('payment');
  }
  return <div>
    <CheckoutSteps step1 step2 ></CheckoutSteps>
    <div className="form form-section">
      <form className="ui form" onSubmit={submitHandler} >
        <ul className="form-container">
          <li>
            <h2>Shipping</h2>
          </li>
          <Dropdown
            placeholder='Use Saved Address'
            fluid
            search
            selection
            options={savedOption}
            onChange={(e, data) => selectedAddressHandler(e, data)}

          />

          <Form.Input fluid label='Full Name' type="text" name="fullName" value={fullName} id="fullName" onChange={(e) => setFullName(e.target.value)} />
          <Form.Input fluid label='Address' type="text" name="address" value={address} id="address" onChange={(e) => setAddress(e.target.value)} />
          <Form.Input fluid label='City' type="text" name="city" value={city} id="city" onChange={(e) => setCity(e.target.value)} />
          <Form.Input fluid label='Postal Code' type="text" name="postalCode" value={postalCode} id="postalCode" onChange={(e) => setPostalCode(e.target.value)} />
          <Form.Input fluid label='Country' type="text" name="country" value={country} id="country" onChange={(e) => setCountry(e.target.value)} />
          <Form.Checkbox checked={saveAddress} label='Save Address' name="saveAddress" id="saveAddress" onChange={(e) => setSaveAddress(e.target.checked)} />



          <li>
            <button type="submit" className='ui grey button'>Continue</button>
          </li>

        </ul>
      </form>
    </div>
  </div>

}
export default ShippingScreen;