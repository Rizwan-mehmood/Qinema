exports.handler = async function (event, context) {
    const { handler } = await import('./server.esm.js');
    return handler(event, context);
};