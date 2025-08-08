module.exports = async function BaseResponseHelper(response) {
  const subStatus = response.code.toString().substring(0, 1);
  if (subStatus === '2') {
    if (response.filepath !== undefined) {
      return {
        code: response.code,
        result: response.data,
        filepath: response.filepath,
      };
    } 
    return {
      code: response.code,
      result: response.data
    };
    
  }
  if (subStatus === '4') {
    return {
      code: response.code,
      result: {
        resp_code: response.statusCode,
        data: null,
        resp_desc: response.errorMessage,
        errors: response.errors,
        csv : response.csv
      },
    };
  }
  return {
    code: response.code,
    result: {
      resp_code: response.statusCode,
      data: null,
      resp_desc: response.errorMessage || 'Internal Server Error',
    },
  };
};
