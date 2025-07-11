exports.handler = async function (event, context) {
    const { handler } = await import('./serverHandler.js');
    return handler(event, context);
};