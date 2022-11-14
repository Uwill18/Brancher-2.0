import React,{useState, useEffect} from 'react'
import {Grid,InputLabel,Select,Typography, MenuItem,Button} from '@material-ui/core';
import {useForm} from 'react-hook-form';
//import FormInput from './CustomTextField';
import {Link} from 'react-router-dom';
import {commerce} from '../../lib/commerce';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {Label,Col,FormGroup} from 'reactstrap';


const AddressForm = ({checkoutToken, test}) => {
  const [shippingCountries, setShippingCountries] = useState([]); //set to an empty array
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions,setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');
  const methods = useForm();
  const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label:name}));
  const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label:name}));
  const options = shippingOptions.map((sO)=>({id:sO.id, label:`${sO.description}-(${sO.price.formatted_with_symbol})`}))
  
  
  const fetchShippingCountries = async(checkoutTokenId) => {
      const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);    
      setShippingCountries(countries);
      setShippingCountry(Object.keys(countries)[0]);//fetches the keys of the countries to return
    }

    
   const fetchSubdivisions = async(countryCode) => {
    const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[7]);
   }

   const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId,{country, region: stateProvince});
    
    setShippingOptions(options);
    setShippingOption(options[0].id); //sets options to the first avail option in the array

  }

    
    useEffect (()=>{
     fetchShippingCountries(checkoutToken.id);
    }, []);

//second useEffect applies and mutates response according to shipping country

useEffect(()=>{
  if(shippingCountry) fetchSubdivisions(shippingCountry);
}, [shippingCountry]);

//third useEffect changes according to option selection

useEffect(()=>{
  if(shippingSubdivision) fetchShippingOptions(checkoutToken.id,shippingCountry,shippingSubdivision);
}, [shippingSubdivision]);

  return (
    <>
    <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                address1: '',
                //phoneNum: '',
                email: '',
                city: '',
                zip: ''
                //agree: false,
                //contactType: 'By Phone',
                //feedback: ''
            }}
            {...methods}
            onSubmit={methods.handleSubmit((data) =>test({...data, shippingCountry,shippingSubdivision,shippingOption}))}>
              
            <Form>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
                <FormGroup row>
                    <Label htmlFor='firstName' md='2'>
                        First Name
                    </Label>
                    <Col md='6'>
                        <Field
                            name='firstName'
                            placeholder='First Name'
                            className='form-control'
                        />
                    </Col>

                </FormGroup>
                <FormGroup row>
                    <Label htmlFor='lastName' md='12'>
                        Last Name
                    </Label>
                    <Col md='10'>
                        <Field
                            name='lastName'
                            placeholder='Last Name'
                            className='form-control'
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor='address1' md='12'>
                        Address
                    </Label>
                    <Col md='10'>
                        <Field
                            name='address1'
                            placeholder='Address'
                            className='form-control'
                        />
                    </Col>
                </FormGroup>

                {/* <FormGroup row>
                    <Label htmlFor='phoneNum' md='2'>
                        Phone
                    </Label>
                    <Col md='10'>
                    </Col>
                </FormGroup> */}

                <FormGroup row>
                    <Label htmlFor='email' md='2'>
                        Email
                    </Label>
                    <Col md='10'>
                    <Field
                            name='email'
                            placeholder='Email'
                            type='email'
                            className='form-control'
                        />
                    </Col>

                </FormGroup>
                <FormGroup row>
                    <Label htmlFor='city' md='2'>
                        City
                    </Label>
                    <Col md='10'>
                    <Field
                            name='city'
                            placeholder='City'
                            className='form-control'
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor='zip' md='2'>
                        Zip/Postal code
                    </Label>
                    <Col md='10'>
                    <Field
                            name='zip'
                            placeholder='Zip/Postal Code'
                            className='form-control'
                        />
                    </Col>
                    </FormGroup> 
                    <br/>
                    <br/>
                    <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
          <InputLabel>Shipping Country</InputLabel>
            {/*the line below sets the country to whatever is selected with the event switching to the target value  */}
          <Select value={shippingCountry} fullWidth onChange={(e)=> setShippingCountry(e.target.value)}>
           {/* this gives us keys and values of shippingCountries, making an array of arrays */}
           {countries.map((country)=> (
                         <MenuItem key={country.id} value={country.id}>
                         {country.label}
                     </MenuItem>
           ))}
      

          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel>Shipping Subdivision</InputLabel>
          <Select value={shippingSubdivision} fullWidth onChange={(e)=> setShippingSubdivision(e.target.value)}>
          {subdivisions.map((subdivision)=> (
                         <MenuItem key={subdivision.id} value={subdivision.id}>
                         {subdivision.label}
                     </MenuItem>
           ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel>Shipping Options</InputLabel>
          <Select value={shippingOption} fullWidth onChange={(e)=> setShippingOption(e.target.value)}>
          {options.map((option)=> (
                         <MenuItem key={option.id} value={option.id}>
                         {option.label}
                     </MenuItem>
           ))}
          </Select>
        </Grid> 
        </Grid>
        <br/>
        <div style={{display:'flex', justifyContent:'space-between'}}>
           <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
           <Button type="submit" variant="contained" color="primary">Next</Button>
        </div>
     </Form>
        </Formik> 
        
        
         
    
        </>
  );
}

export default AddressForm