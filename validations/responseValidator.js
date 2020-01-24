const {
  sendSutiableHttpResponse,
} = require('../library/sendSutiableHttpResponse');

const {validateMedia} = require('./validateMedia');
const {validateKeyboard} = require('./validateKeyboard');
const {validateImage} = require('./validateImage');
const {message_types} = require('./types');

function validateResponse(res) {
  try {
    if (res.data) {      
      if(!res.data.content){
        return sendSutiableHttpResponse(406,res,'Content is required')
      }

      const check = message_types.includes(res.data.type);
      if(!check){
        return sendSutiableHttpResponse(406,res,`Type should be one of the following ${message_types}`)
      } 

      if (res.data.content.type == "image") {
        const validationError = validateImage(res.data.content.data, res);
        if (validationError) {
          return sendSutiableHttpResponse(406, res, validationErr);
        }
      }

      if (res.data.content.type == "audio" || res.data.content.type == "video") {
        const validationError = validateMedia(res.data.content.data, res);
        if (!validationError) {
          return sendSutiableHttpResponse(406, res, validationError);
        }
      }

      if(res.data.keyboard){
        if(!Array.isArray(res.data.keyboard)){
          return sendSutiableHttpResponse(406,res,'Keyboard should be of Type Array')
        }
        
        const validation = validateKeyboard(res.data.keyboard,res)

        if(!validation.valid){
          return sendSutiableHttpResponse(406,res,validation.errors)
        }
      }
    }
  } catch (err) {
    throw new Error(`Error while validating the response ${err}`);
  }
}

module.exports = {
  validateResponse,
};
