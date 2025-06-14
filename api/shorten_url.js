import axios from "axios";

export default async function (context, req) {
  try {
    const response = await axios.post(
      "https://api.short.io/links",
      {
        originalURL: originalUrl,
        domain: process.env.VITE_SHORTIO_DOMAIN,
      },
      {
        headers: {
          authorization: process.env.VITE_SHORTIO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    context.res = {
      status: 200,
      body: response.data,
    };
  } catch (error) {
    context.res = {
      status: err.response?.status || 500,
      body: {
        error: err.message,
        details: err.response?.data,
      },
    };
  }
}
