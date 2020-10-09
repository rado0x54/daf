import { TAgent, IIdentityManager, IDataStore, IMessageHandler } from '../../packages/daf-core/src'
import { ICredentialIssuer } from '../../packages/daf-w3c/src'
import { ISelectiveDisclosure } from '../../packages/daf-selective-disclosure/src'
import { IDataStoreORM } from '../../packages/daf-typeorm/src'

type ConfiguredAgent = TAgent<
  IIdentityManager & ICredentialIssuer & IDataStoreORM & IDataStore & IMessageHandler & ISelectiveDisclosure
>

export default (testContext: {
  getAgent: () => ConfiguredAgent
  setup: () => Promise<boolean>
  tearDown: () => Promise<boolean>
}) => {
  describe('Documentation examples', () => {
    let agent: ConfiguredAgent

    beforeAll(() => {
      testContext.setup()
      agent = testContext.getAgent()
    })
    afterAll(testContext.tearDown)

    //DO NOT EDIT MANUALLY START

    it('daf-core-IResolver-resolveDid example', async () => {
      const doc = await agent.resolveDid({
        didUrl: 'did:ethr:rinkeby:0xb09b66026ba5909a7cfe99b76875431d2b8d5190',
      })

      expect(doc).toEqual({
        '@context': 'https://w3id.org/did/v1',
        id: 'did:ethr:rinkeby:0xb09b66026ba5909a7cfe99b76875431d2b8d5190',
        publicKey: [
          {
            id: 'did:ethr:rinkeby:0xb09b66026ba5909a7cfe99b76875431d2b8d5190#controller',
            type: 'Secp256k1VerificationKey2018',
            controller: 'did:ethr:rinkeby:0xb09b66026ba5909a7cfe99b76875431d2b8d5190',
            ethereumAddress: '0xb09b66026ba5909a7cfe99b76875431d2b8d5190',
          },
        ],
        authentication: [
          {
            type: 'Secp256k1SignatureAuthentication2018',
            publicKey: 'did:ethr:rinkeby:0xb09b66026ba5909a7cfe99b76875431d2b8d5190#controller',
          },
        ],
      })
    })

    it('daf-core-IIdentityManager-identityManagerCreateIdentity example', async () => {
      const identity = await agent.identityManagerCreateIdentity({
        alias: 'alice',
        provider: 'did:ethr:rinkeby',
        kms: 'local',
      })
    })

    it('daf-core-IIdentityManager-identityManagerGetIdentities example', async () => {
      const aliceIdentities = await agent.identityManagerGetIdentities({
        alias: 'alice',
      })

      const rinkebyIdentities = await agent.identityManagerGetIdentities({
        provider: 'did:ethr:rinkeby',
      })
    })

    it('daf-core-IIdentityManager-identityManagerGetIdentityByAlias example', async () => {
      const identity = await agent.identityManagerGetIdentityByAlias({
        alias: 'alice',
        provider: 'did:ethr:rinkeby',
      })
    })

    it('daf-core-IIdentityManager-identityManagerSetAlias example', async () => {
      const identity = await agent.identityManagerCreateIdentity()
      const result = await agent.identityManagerSetAlias({
        did: identity.did,
        alias: 'carol',
      })
    })

    //DO NOT EDIT MANUALLY END
  })
}