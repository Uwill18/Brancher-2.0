import Commerce from '@chec/commerce.js';

/**new instance objects created for the store through API call */
export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true);


/*export const commerce = new Commerce('pk_test_46481e40f8d134d1dc5625e004188670ceba41b80edf3', true);*/