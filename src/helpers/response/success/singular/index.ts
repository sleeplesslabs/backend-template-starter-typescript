export default function SuccessSingularFormatter(message: string, data: object){
    const response: object = {
      info: {
        success: true,
        meta: null,
        message: message
      },
      data: data,
    }
  
    return response
  }