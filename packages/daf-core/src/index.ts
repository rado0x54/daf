export { Core, EventTypes, Resolver } from './core'
export { AbstractActionHandler } from './action/action-handler'
export { EncryptionKeyManager, KeyPair } from './encryption-manager'
export { IdentityManager } from './identity/identity-manager'
export { AbstractIdentity } from './identity/abstract-identity'
export { AbstractIdentityProvider } from './identity/abstract-identity-provider'
export { AbstractMessageValidator } from './message/abstract-message-validator'
export { Message } from './message/message'
export { ServiceManager, LastMessageTimestampForInstance, ServiceEventTypes } from './service/service-manager'
export { AbstractServiceController } from './service/abstract-service-controller'
import * as Types from './types'
import { baseTypeDefs } from './graphql/graphql-base-type-defs'
import * as GqlCore from './graphql/graphql-core'
import * as GqlIdentityManager from './graphql/graphql-identity-manager'

const Gql = {
  baseTypeDefs,
  Core: GqlCore,
  IdentityManager: GqlIdentityManager,
}

export { Types, Gql }
