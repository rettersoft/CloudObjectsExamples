import { Data, InitResponse, Response, StepResponse } from './CloudObjects'

export async function authorizer(data: Data): Promise<Response> {
    
    if(data.method.name === "spendMoney" && data.method.request.amount > data.state.public.amount) {
        return {
            statusCode: 403,
            body: {
                "message": "authorizer error, too much money"
            }
        }
    }

    return {
        statusCode: 200
    }
}

export async function preAuthorizer(data: Data): Promise<Response> {

    if( (data.method.name === "spendMoney" || data.method.name === "addMoney") && data.context.userId !== data.context.instanceId) {
        return { 
            statusCode: 403,
            body: {
                "message": "Sen kimsin?"
            }
        }
    }

    return { statusCode: 200 }
}



export async function init(data: Data): Promise<InitResponse> {
    return { state: { public: { amount: 0 } } }
}

export async function getState(data: Data): Promise<Response> {
    return { statusCode: 200, body: data.state }
}

export async function getInstanceId(data: Data): Promise<string> {
    return data.context.userId
}

// Method handlers
export async function addMoneyHandler(data: Data) : Promise<StepResponse> {
    const newAmount = data.state.public.amount + data.method.request.amount

    return {
        ...data,
        method: {
            ...(data.method),
            response: {
                statusCode: 200,
                body: {
                    "amount": newAmount
                }
            }
        },
        state: {
            public: {
                amount: newAmount
            }
        }
    }
}

export async function spendMoneyHandler(data: Data) : Promise<StepResponse> {

    if(data.method.request.amount > data.state.public.amount) {
        data.nextFlowId = "gotoInsufficientFunds"
        return data
    }

    const newAmount = data.state.public.amount - data.method.request.amount

    return {
        ...data,
        method: {
            ...(data.method),
            response: {
                statusCode: 200,
                body: {
                    "amount": newAmount
                }
            }
        },
        state: {
            ...data.state,
            public: {
                amount: newAmount
            }
        }
    }
}

export async function insufficientFundsHandler(data: Data) : Promise<StepResponse> {
    data.method.response = {
        statusCode: 403,
        body: {
            errorMessage: "Insufficient Funds"
        }
    }
    
    return data
}
