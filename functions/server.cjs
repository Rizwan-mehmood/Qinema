exports.handler = async function (event, context) {
    // Dynamically import your ESM module:
    const { handler } = await import('./server.esm.js');
    // Delegate to the actual handler:
    return handler(event, context);
};