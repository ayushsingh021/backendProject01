//using promises
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };


// const asyncHandler = () => {};.\
// const asyncHandler = (func) => () => {}; //higher order function -- takes func as a parameter
// const asyncHandler = (func) => async () => {};

// Method 2 -- using trycatch
// const asyncHandler = (func) => async (req, res, next) => {
//   try {
//     await func(req, res, next);
//   } catch (error) {
//     res.status(err.code || 500).json({
//         success: false,
//         message : err.message
//     });
//     err;
//   }
// };
