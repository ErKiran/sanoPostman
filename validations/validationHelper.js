const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;  
    }
  }

const isValidPhone = (number) =>{
    try{
        const pattern =  /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
        const re =  new RegExp(pattern);
        return re.exec(number);
    }
    catch(err){
        throw new Error(`Can't validate Phone Number ${err}`)
    }
}  

module.exports ={
    isValidUrl,
    isValidPhone
}