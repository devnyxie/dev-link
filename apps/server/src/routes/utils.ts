// Response
// interface ResponseOptions {
//   res: any;
//   response: any;
//   expectedValue?: any;
//   expectedType?: any;
//   successMessage: string;
//   errorMessage?: string;
// }

// export function handleResponse(options: ResponseOptions) {
//   const {
//     res,
//     response,
//     expectedValue,
//     expectedType,
//     successMessage,
//     errorMessage = "An error occurred.",
//   } = options;

//   if (
//     response === expectedValue ||
//     response === expectedType ||
//     response === typeof expectedType
//   ) {
//     res.status(200).json({ message: successMessage });
//   } else {
//     res.status(404).json({
//       message: errorMessage,
//       error: response,
//     });
//   }
// }

//
interface ResponseOptions {
  res: any;
  response: any;
  expectedValue?: any;
  expectedType?: any;
  successMessage: string;
  errorMessage?: string;
}

export function handleResponse(options: ResponseOptions) {
  const {
    res,
    response,
    expectedValue,
    expectedType,
    successMessage,
    errorMessage = "An error occurred.",
  } = options;

  if (
    (expectedType &&
      (Array.isArray(response)
        ? response.length > 0 &&
          response.every((item) => item instanceof expectedType)
        : response instanceof expectedType)) ||
    response === expectedValue
  ) {
    res.status(200).json({ message: successMessage, response: response });
  } else {
    res.status(404).json({
      message: errorMessage,
      error: response,
    });
  }
}
