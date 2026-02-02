# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# pnpm
pnpm i
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm run dev
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Dockerで立ち上げる方法
```bash
# build
docker build -t to-do-list-frontend .

# run
docker run -d -p 3000:3000 --name to-do-list-frontend to-do-list-frontend
```
