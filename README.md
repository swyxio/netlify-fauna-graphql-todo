# netlify-fauna-graphql-todo

Netlify Identity + FaunaDB app with most recent versions of FaunaDB client and React.

- Video: https://youtu.be/7OB_IjTTcwg
- Demo: https://cocky-almeida-4df361.netlify.com/
- Github: https://github.com/sw-yx/netlify-fauna-todo

One click deploy:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/sw-yx/netlify-fauna-todo&stack=fauna) (and then make sure to turn on Netlify Identity since it doesnt do that yet)

Local development

1. git clone
2. `netlify init`
3. `netlify addons:create fauna` (if you were starting from scratch, you could use `netlify functions:create fauna-graphql`)
4. `netlify dev:exec functions/fauna-graphql/sync-schema.js`

Features of note:

- Netlify Identity Authentication
- `useFauna` React Hook
- custom hooks from [@swyx/hooks](https://github.com/sw-yx/hooks)
