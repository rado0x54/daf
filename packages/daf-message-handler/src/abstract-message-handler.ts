import { IAgentContext } from 'daf-core'
import { Message } from './message'

export const unsupportedMessageTypeError = 'Unsupported message type'

/**
 * An abstract class for creating {@link daf-message-handler#MessageHandler} plugins
 * @public
 */
export abstract class AbstractMessageHandler {
  public nextMessageHandler?: AbstractMessageHandler

  public setNext(messageHandler: AbstractMessageHandler): AbstractMessageHandler {
    this.nextMessageHandler = messageHandler
    return messageHandler
  }

  public async handle(message: Message, context: IAgentContext<{}>): Promise<Message> {
    if (this.nextMessageHandler) {
      return this.nextMessageHandler.handle(message, context)
    }
    return Promise.reject(unsupportedMessageTypeError)
  }
}
