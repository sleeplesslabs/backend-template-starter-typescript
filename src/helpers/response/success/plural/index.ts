export default function SuccessPluralFormatter(message: string, meta: object, data: Array<object> | object){
    const response: object = {
      info: {
        success: true,
        meta: meta,
        message: message
      },
      data: data,
    }
  
    return response
  }