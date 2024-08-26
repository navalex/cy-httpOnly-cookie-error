# Cypress HttpOnly cookie issue

This repo aim to reproduce a strange behavior with wordpress headless and httpOnly cookies.
This exemple contains a front in React-Vite, and a back with Fastify.

The backend provide 2 routes:
- `/login` to create 3 httpOnly cookies
- `/check` that returns 200 only if those cookies are presents

And the front provide 2 buttons, to fetch both routes. The test simply press the buttons and try to retrieve the response block.

## How to use

### Head mode

#### Install node_modules

You need to run `npm install` on both `./front` & `./back` folders

#### Run servers

Then you can run both servers (in separate shells)

```shell
# front server
cd front && npm run dev

# back server
cd back && npm run start
```

#### Run Cypress

```shell
cd front && npx cypress open
```

The test should work as expected. (tested on macos Chrome & Electron)

### Headless mode

Here is the real issue, where the test will not pass.

To run it, simply go at the root of the project and run:

```shell
docker compose up --abort-on-container-exit --exit-code-from cypress --attach cypress
```

## Tested solutions

- Moving the cookies to SameSite: None & Secure: True
- Adding front url to cors and poli