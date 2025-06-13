import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions"

const handler = async (event, context) => {
    const value = 'Netlify value'
    return {
        statusCode: 200,
        body: JSON.stringify({ message: `Value of MY_IMPORTANT_VARIABLE is ${value}.`}),
    }
}

export { handler }