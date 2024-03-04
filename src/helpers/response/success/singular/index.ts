export default function SuccessSingularFormatter(message: string, data: object | null){
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