import { AbstractIdentity } from 'daf-core'
import { agent } from './setup'

async function main() {
  // Getting existing identity or creating a new one
  let identity: AbstractIdentity
  const identities = await agent.getIdentities()
  if (identities.length > 0) {
    identity = identities[0]
  } else {
    identity = await agent.createIdentity()
  }

  // Sign verifiable credential
  const credential = await agent.signCredentialJwt({
    data: {
      issuer: identity.did,
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      credentialSubject: {
        id: 'did:web:uport.me',
        you: 'Rock',
      },
    },
  })

  // Send verifiable credential using DIDComm
  const message = await agent.sendMessageDIDCommAlpha1({
    data: {
      from: identity.did,
      to: 'did:ethr:rinkeby:0x79292ba5a516f04c3de11e8f06642c7bec16c490',
      type: 'jwt',
      body: credential.raw,
    },
  })
  console.log({ message })
}

main().catch(console.log)
