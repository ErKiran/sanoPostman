const {message_types,supported_images} = require('./types');
function validateImage(image){
    try{
      if(!message_types.includes(image.type)){
        return `Images can be of only following types ${message_types}`;
      }
      
      if(!supported_images.includes(image.img_big.split('.').pop() && image.img_big.split('.').pop())){
        return `The file extension for image must be the following types ${ supported_images }.`
      }
  
      if(!image.title){
        return 'The title of the image is required.'
      }
  
      if (!(image.img_small && image.img_big)) {
        return 'Both small and big images are required.'
      }
    }
    catch (err) {
      throw new Error(`Error while validating Images ${err}`)
    }
  }

  module.exports ={
      validateImage
  }