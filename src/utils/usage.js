import axiosAgent from './axiosAgent';

axiosAgent.methods.list().then((products) => products /**product code */);

// OR:

const products = await axiosAgent.methods.list();

const product = await axiosAgent.methods.details(3);

// we have to catch the errors from the interceptors
try {
  axiosAgent.TestErrors.get400Error();
} catch (error) {
  console.log(error);
}
