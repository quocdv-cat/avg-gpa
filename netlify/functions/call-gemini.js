// This is a Netlify Function, which runs on a server, not in the browser.

exports.handler = async function (event, context) {
    // Chỉ cho phép phương thức POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        // Lấy nội dung prompt từ yêu cầu của trang web
        const { prompt } = JSON.parse(event.body);
        
        // Lấy API key từ biến môi trường của Netlify (AN TOÀN!)
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            throw new Error("API key is not set.");
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        // Gọi đến API của Gemini
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                 contents: [{ parts: [{ text: prompt }] }],
            }),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error("Gemini API Error:", errorBody);
            return { statusCode: response.status, body: `Gemini API Error: ${errorBody}` };
        }

        const data = await response.json();

        // Trả kết quả về cho trang web của bạn
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };

    } catch (error) {
        console.error("Serverless function error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
