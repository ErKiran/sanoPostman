const {
  sendSutiableHttpResponse,
} = require('../library/sendSutiableHttpResponse');

const message_types = [
  'text',
  'image',
  'video',
  'audio',
  'file',
  'cards',
  'list_item',
  'attachment'
];

const keyboard_types = [
  'url',
  'flow',
  'call',
  'share',
  'node',
  'flow',
  'content',
  'buy',
  'dynamic_block_callback'
]

const supported_images = [
  'png',
  'jpg',
  'jpeg',
]

const supported_media = [
  'mp3',
  'ogg',
  'mpeg',
  'mp4',
  'avi',
]

const mime_types = [
  'audio/mp3' || 'audio/mpeg3',
  'audio/ogg',
  'audio/mpeg',
  'validation/mpeg',
  'video/mp4',
  'video/avi',
  'video/mpeg'
]

function validateResponse(res) {
  try {
    if (res.data) {      
      // check for content 
      if(!res.data.content){
        return sendSutiableHttpResponse(406,res,'Content is required')
      }
      
      // check for message types
      const check = message_types.includes(res.data.type);
      if(!check){
        return sendSutiableHttpResponse(406,res,`Type should be one of the following ${message_types}`)
      } 


      
      // Check if data -> content -> type is image
      if (res.data.content.type == "image") {

        const validation = validateImage(res.data.content.data, res);
        console.log(validation)

        // if (!validation.valid) {
        //   return sendSutiableHttpResponse(406, res, validation.errors);
        // }
      }

      // Check if data -> content -> type is audio or video
      if (res.data.content.type == "audio" || res.data.content.type == "video") {

        const validation = validateMedia(res.data.content.data, res);
        console.log(validation)

        // if (!validation.valid) {
        //   return sendSutiableHttpResponse(406, res, validation.errors);
        // }
      }

      // Check if data contains button
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

// Buttons validation
function validateKeyboard(keyboards){
  try{
    let errors = [];
    Promise.all(keyboards.map(i=>{
      if(!keyboard_types.includes(i.type)){
        errors.push(`Keyboards can be of only following types ${keyboard_types}`)
      }

      if(!i.caption){
        errors.push(`Caption can't be empty`)
      }

      if(i.type === 'url'){
        if(!i.url){
          errors.push(`Url can't be empty in the type of URL`)
        }
      }

      if(i.type === 'call'){
        if(!i.phone){
          errors.push(`Phone can't be empty in the type call`)
        }
      }

    }))
    if(errors.length>0){
    return {
      valid: false,
      errors
    }
  }
  return {
    valid: true
  }
  }
  catch(err){
    throw new Error(`Error while validating Button ${err}`)
  }
}

// Image Validation
function validateImage(image){
  try{
    if(message_types.includes(image.type)){
      return `Images can be of only following types ${message_types}`;
    }
    
    if(!supported_images.includes(image.img_big.split('.').pop() && image.img_big.split('.').pop())){
      return `The file extension for image must be the following types ${ supported_images }.`
    }

    if(image.title){
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

// Audio/Video Validation
function validateMedia(media) {
  try {
    if (media.type != "file") {
      return 'The media format must be file'
    }

    if(!mime_types.includes(media.mime)) {
      return `Media files must be the following types ${ mime_types }.`
    }

    if (!supported_media.includes(media.file.split('.').pop())) {
      return `Media files must be the following types ${ supported_media }.`
    }

    if (!media.title) {
      return 'The title for the media file is required.'
    }
  } catch (err) {
    throw new Error(`Error while validating Media ${err}`)
  }
}

module.exports = {
  validateResponse,
};
