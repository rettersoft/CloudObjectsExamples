interface KeyValue {
    [key: string]: any
}

interface Configuration {
    stepLimit?: number
}

interface OperationResponse {
    success: boolean
    data?: any
    error?: string
}

export interface Response {
    statusCode: number
    body?: any
    headers?: { [key: string]: string }
}

export interface Context {
    requestId: string
    projectId: string
    action: string
    identity: string
    serviceId?: string
    payload?: KeyValue
    headers?: KeyValue
    classId: string
    instanceId?: string
    methodName: string
    refererClassId?: string
    refererInstanceId?: string
    refererMethodName?: string
    refererUserId?: string
    refererServiceId?: string
    refererIdentity?: string
    claims?: KeyValue
    isAnonymous?: boolean
    culture?: string
    platform?: string
    userId?: string
    sourceIP: string
    sessionId?: string
    clientOs?: string
    targetServiceIds?: string[]
    relatedUserId?: string
}

interface State {
    public?: KeyValue
    private?: KeyValue
    user?: KeyValue
    role?: KeyValue
}

interface Method {
    name: string
    context: Context
    state: KeyValue
    request?: KeyValue
    response?: Response
}

interface StepResponseMethod {
    state: KeyValue
    response?: Response
}

interface RbsActionResponse {
    errorCode: string
    serviceId: string
    status: number
    errors: string[]
    response: any
    durationInMilliseconds: number
    executionDurationInMilliseconds: number
    headers: { [key: string]: string }
    isExtract: boolean
}

interface RbsAction {
    name: string
    data?: KeyValue
    targetServiceIds?: string[]
    headers?: {
        classId: string
        instanceId: string
    }
    response?: RbsActionResponse[]
}

interface GetGlobalMemory {
    key: string
    response?: OperationResponse
}

interface SetGlobalMemory extends GetGlobalMemory {
    value: string
}

enum PublicFileTTL {
    _,
    DAY_1,
    DAY_3,
    DAY_7,
    DAY_15,
}

interface GetFile {
    filename: string
    ttl?: PublicFileTTL
    isBuffer?: boolean
    response?: OperationResponse
}

interface SetFile extends GetFile {
    body: any
    contentType?: string
    isBase64?: boolean
    isPublic?: boolean
    response?: OperationResponse
}
interface LookUpKey {
    key: {
        name: string
        value: string
    }
    response: {
        success: boolean
        data?: {
            instanceId: string
        }
        error?: string
    }
}

interface MethodCall {
    classId?: string
    instanceId?: string
    methodName: string
    payload?: KeyValue
    response?: OperationResponse
}

export interface InitResponse {
    state?: State
    config?: Configuration
}
type HttpMethod =
    | 'get'
    | 'GET'
    | 'delete'
    | 'DELETE'
    | 'head'
    | 'HEAD'
    | 'options'
    | 'OPTIONS'
    | 'post'
    | 'POST'
    | 'put'
    | 'PUT'
    | 'patch'
    | 'PATCH'
    | 'purge'
    | 'PURGE'
    | 'link'
    | 'LINK'
    | 'unlink'
    | 'UNLINK'

interface BasicCredentials {
    username: string
    password: string
}
interface HttpRequest {
    url?: string
    headers?: { [key: string]: string }
    params?: any
    data?: any
    timeout?: number
    auth?: BasicCredentials
    response?: OperationResponse
    method?: HttpMethod
}

export interface StepResponse {
    state?: State
    method?: StepResponseMethod
    rbsAction?: RbsAction[]
    getGlobalMemory?: GetGlobalMemory[]
    setGlobalMemory?: SetGlobalMemory[]
    getFile?: GetFile[]
    setFile?: SetFile[]
    getLookUpKey?: LookUpKey[]
    setLookUpKey?: LookUpKey[]
    httpRequest?: HttpRequest[]
    methodCall?: MethodCall[]
    nextFlowId?: string
}

export interface Data extends StepResponse {
    context: Context
    env: KeyValue
    config: Configuration
    version: number
    state: State
    method: Method
}
