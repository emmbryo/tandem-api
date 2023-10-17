const links = {}

links.registerTandem = {
  register: `${process.env.BASE_URL}/tandem/users`,
  method: 'POST',
  header: {
    Authentication: 'Bearer access_token'
  },
  body: {
    native: ['ita'],
    languages: [
      {
        language: 'eng',
        level: 'B2'
      },
      {
        language: 'rus',
        level: 'A1'
      }
    ],
    role: ['tandem', 'tutor', 'student'],
    location: {
      city: 'city-name',
      country: 'country-name'
    },
    remote: 'true | false'
  }
}

links.authWelcome = {
  message: 'Welcome to the authentication part of the API',
  endpoints: {
    register: {
      href: `${process.env.BASE_URL}/auth/register`,
      method: 'POST',
      headers: 'application/json',
      body: {
        username: 'username',
        password: 'password - min 10 characters',
        email: 'valid email',
        firstname: 'firstname',
        lastname: 'lastname'
      }
    },
    login: {
      href: `${process.env.BASE_URL}/auth/login`,
      method: 'POST',
      headers: 'application/json',
      body: {
        username: 'username',
        password: 'password'
      }
    }
  }
}

links.loginInfo = {
  href: `${process.env.BASE_URL}/auth/login`,
  method: 'POST',
  body: {
    username: 'username',
    password: 'password'
  }
}

links.tandemWelcome = {
  message: 'Welcome to the tandem API. If you have an account, proceed by logging in and using the JWT provided at login. The following links require authentication.',
  links: {
    register_tandem_user: {
      register: `${process.env.BASE_URL}/tandem/users`,
      method: 'POST',
      header: {
        Authentication: 'Bearer access_token'
      },
      body: {
        native: ['ita'],
        languages: [
          {
            language: 'eng',
            level: 'B2'
          },
          {
            language: 'rus',
            level: 'A1'
          }
        ],
        role: ['tandem', 'tutor', 'student'],
        location: {
          city: 'city-name',
          country: 'country-name'
        },
        remote: 'true | false'
      }
    },
    all_users: `${process.env.BASE_URL}/tandem/users`,
    user_by_id: {
      href: `${process.env.BASE_URL}/tandem/users/:id`,
      options: ['get', 'put', 'patch', 'delete']
    }
  }
}

links.webhookWelcome = {
  message: 'Welcome to the webhook route! You can via a webhook be notified when an update occurs or when a new, potential language tandem partner has registered. You will receive the type of event (update/create) and the username and languages.',
  instructions: {
    endpoint: `${process.env.BASE_URL}/webhooks/register`,
    method: 'POST',
    body: {
      url: 'url (string) to where the webhook will send a request when the specified event occurs.',
      accessToken: 'A token (string) to identify that the webhook is sent from the correct origin.'
    },
    response: 'After receiving the webhook request, respond with the appropriate http status code.'
  }
}

export default links
