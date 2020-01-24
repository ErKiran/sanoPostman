const {keyboard_types, webview_sizes} = require('./types');
const {isValidUrl, isValidPhone} = require('./validationHelper');
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
          if(!i.webview_size){
              errors.push(`WebView Size is required`)
          }
          const urlChecker = isValidUrl(i.url);
          if(!urlChecker){
              errors.push(` ${i.url} URL is invalids`)
          }
          if(!webview_sizes.includes(i.webview_size)){
              errors.push(`Webview size can be of following sizes ${webview_sizes}`)
          }
        }
  
        if(i.type === 'call'){
          if(!i.phone){
            errors.push(`Phone can't be empty in the type call`)
          }
          const phoneChecker = isValidPhone(parseInt(i.phone)); 
         if(!phoneChecker){
             errors.push(`This number can't be considered as valid number ${i.phone}`)
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
  
module.exports ={
    validateKeyboard
}  