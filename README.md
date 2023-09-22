## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Pocketbase Connection

The JSON configuration file is in the root path "pb_schema.json"

By default it is configured with the route: *http://127.0.0.1:8090*

This configuration is in *$lib/conexion-pocketbase/conexion_pocket.ts*

## About the problem

To reproduce the issue:

1. Create two users in pocketbase in the "cuenta" entity
2. In the project, start the two user sessions with emails (either on different computers or different browser tabs or using the private tab) on the page http://localhost:5173/login
3. With both sessions started, update the pages of both users at the same time (two or more attempts must be made).

This will reproduce the problem where one session will replace the other user's session.
