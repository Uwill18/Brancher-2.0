import React,{useState, useEffect} from 'react'
import {Grid,InputLabel,Select,Typography, MenuItem,Button} from '@material-ui/core';
import {useForm, FormProvider} from 'react-hook-form';
import FormInput from './CustomTextField';
import {Link} from 'react-router-dom';
import {commerce} from '../../lib/commerce';


const AddressForm = ({checkoutToken}) => {
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
      console.log(countries);
      setShippingCountries(countries);
      setShippingCountries(Object.keys(countries)[0]);//fetches the keys of the countries to return
    }
   const fetchSubdivisions = async(countryCode) => {
    const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);
    setShippingSubdivisions(subdivisions);
    setShippingSubdivisions(Object.keys(subdivisions)[0]);
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
    <Typography variant="h6" gutterBottom>Shipping Address</Typography>
    <FormProvider{...methods}>
    <form onSubmit={methods.handleSubmit((data) =>test({...data, shippingCountry,shippingSubdivision,shippingOption}))}>
        <Grid container spacing={3}>
        <FormInput name='firstName' label='First name'/>
        <FormInput name='lastName' label='Last name'/>
        <FormInput name='address1' label='Address'/>
        <FormInput name='email' label='Email'/>
        <FormInput name='city' label='City'/>
        <FormInput name='zip' label='ZIP/ Postal code'/>
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
    </form>

    </FormProvider>
    </>
  );
}

export default AddressForm