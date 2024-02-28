export default function ErrorFormatter(message: object | string){
    const response: object = {
      info: {
        success: false,
        meta: null,
        message: message,
      },
      data: null,
    }
  
    return response
}