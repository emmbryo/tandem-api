import users from './mockUsers.js'
import data from './mockTandem.js'

console.log(data.length)
console.log(users.length)

console.log(JSON.stringify(users[0]))

users.forEach(async (user) => {
  try {
    const response = await fetch('https://cscloud8-114.lnu.se/tandem-api/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    if (!response.ok) {
      console.log(response)
      throw new Error('Server not responding')
    }
  } catch (error) {
    console.log(error.message)
  }
})

const jwts = []
console.log(jwts)
for (let i = 0; i < users.length; i++) {
  try {
    const response = await fetch('https://cscloud8-114.lnu.se/tandem-api/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(users[i])
    })

    if (!response.ok) {
      console.log(response)
      throw new Error('Server not responding')
    }
    const jwt = await response.json()
    const tandemResponse = await fetch('https://cscloud8-114.lnu.se/tandem-api/api/v1/tandem/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt.access_token}`
      },
      body: JSON.stringify(data[i])
    })

    if (!tandemResponse.ok) {
      throw new Error('Tandemserver not responding')
    }

    const tandemRes = await tandemResponse.json()
    console.log(tandemRes)
  } catch (error) {
    console.log(error)
  }
}
