const {mime_types,supported_media} = require('./types')
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

  module.exports ={
      validateMedia
  }