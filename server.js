const fastify = require('fastify')({
    logger: true
})
const path = require('path')
const pov = require("point-of-view")
const pug = require("pug")

fastify.register(require("fastify-static"), {
    root: path.join(__dirname, "public"),
    prefix: "/" // optional: default '/'
});

fastify.register(pov, {
    engine: {
        handlebars: pug
    }
});

fastify.get("/", function (request, reply) {
    let params = {
        greeting: "Hello Node!"
    };
    reply.view("/src/pages/index.pug", params);
});

// A POST route to handle form submissions
fastify.post("/", function (request, reply) {
    let params = {
        greeting: "Hello Form!"
    };
    // request.body.paramName <-- a form post example
    reply.view("/src/pages/index.pug", params);
});

// Run the server and report out to the logs
fastify.listen(process.env.PORT, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
    fastify.log.info(`server listening on ${address}`);
});
