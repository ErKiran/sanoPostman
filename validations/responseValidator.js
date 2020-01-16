const StatusCodes = require('../library/statusCodes')
const message_types = ["text","image","video","audio","file","cards","list"]
function validateResponse(res){
    try{
        if(res.data){
            if(!res.data.version){
                return StatusCodes.validationError(`Invalid Payload message Version is required`)
            }
            if(!(res.data.version === 'v2')){
                return StatusCodes.validationError(`Invalid Version`)
            }
            if(!res.data.content){
                if(!res.data.content.messages){
                    if(!(Array.isArray(res.data.content.messages))){
                        if(!res.data.content.messages[0].type){
                            return StatusCodes.validationError(`Type is required`)
                        }
                        if(res.data.content.messages[0].type){
                            const check = message_types.includes(res.data.content.messages[0].type)
                            if(!check){
                                return StatusCodes.validationError(`Unsupported message Type`)
                            }
                        }
                        return StatusCodes.validationError(`Message should be array`)
                    }
                    return StatusCodes.validationError(`Message is required`)
                }
                return StatusCodes.validationError(`Content is required`)
            }
        }
    }
    catch(err){
        throw new Error(`Error while validating the response ${err}`)
    }
}

module.exports = {
    validateResponse
}