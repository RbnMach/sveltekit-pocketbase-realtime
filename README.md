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

Create user accounts directly in Pocketbase and use them for logon.
