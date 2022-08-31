import Commerce from '@chec/commerce.js';

/**new instance objects created for the store through API call */
export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true);