import Fastify from 'fastify'
import cookie from '@fastify/cookie'
import cors from '@fastify/cors'

const fastify = Fastify({
  logger: {
    level: 'debug'
  }
})

const isDocker = process.env.DOCKER_MODE === 'true'

fastify.register(cors, {
    origin: `http://${isDocker ? 'frontend' : 'localhost'}:9898`,
    credentials: true
})

fastify.register(cookie)

fastify.get('/login', (request, reply) => {
    reply
        .setCookie('accessToken', 'mySuperToken', { httpOnly: true, secure: true, sameSite: 'None' })
        .setCookie('session', `${Math.random()}`, { httpOnly: true, secure: true, sameSite: 'None' })
        .setCookie('other', `${Math.random()}`, { httpOnly: true, secure: true, sameSite: 'None' })
        .header('access-control-allow-credentials', 'true')
        .send({
            statut: "ok"
        })

})

fastify.get('/check', (request, reply) => {
    const cookies = request.cookies
    if (cookies.accessToken && cookies.session && cookies.other) {
        reply.code(200).send(cookies)
    } else {
        reply.code(401).send()
    }
})

// healthcheck with disabled log
fastify.get('/health', { logLevel: 'silent' }, (request, reply) => {
    reply.code(200).send({ status: 'ok' })
})

// Run the server!
fastify.listen({ host: '0.0.0.0', port: 9897 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})