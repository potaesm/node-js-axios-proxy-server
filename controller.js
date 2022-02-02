const axios = require('axios');

module.exports = async (app = require('express')()) => {
    app.get('/', async (request, response) => {
        try {
            const { url } = request.query;
            const axiosResponse = await axios.default.get(url);
            return response.send(axiosResponse.data);
        } catch (error) {
            return response.send(JSON.stringify(error));
        }
    });
    app.post('/', async (request, response) => {
        try {
            const { url } = request.query;
            const axiosResponse = await axios.default.post(url, request.body);
            return response.send(axiosResponse.data);
        } catch (error) {
            return response.send(JSON.stringify(error));
        }
    });
    app.get('/download-file/', async (request, response) => {
        try {
            const { url, filename } = request.query;
            if (!url) {
                return response.send('');
            }
            let originalname = filename;
            if (!originalname) {
                const chunks = url.split('/');
                originalname = chunks[chunks.length - 1];
            }
            const fileResponse = await axios.default.get(decodeURIComponent(url), { responseType: 'arraybuffer' });
            const body = Buffer.from(fileResponse.data).toString('base64');
            const file = {
                name: originalname,
                contentType: 'application/octet-stream',
                body
            };
            const encodedFileName = encodeURIComponent(file.name).replace(/['()]/g, escape).replace(/\*/g, '%2A').replace(/%(?:7C|60|5E)/g, unescape);
            response.set({
                'Content-Disposition': `inline; filename*=UTF-8''${encodedFileName}`,
                'Content-Type': file.contentType,
                'Last-Modified': (new Date()).toUTCString(),
                'Cache-Control': 'no-cache'
            });
            return response.send(file.body);
        } catch (error) {
            return response.send(JSON.stringify(error));
        }
    });
}
