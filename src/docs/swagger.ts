import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger_output.json";
const endpointsFiles = ["../routes/api.ts"];

const doc = {
  info: {
    version: "v0.0.1",
    title: "Dokumentasi API Toko Buku",
    description: "Dokumentasi API Toko Buku",
  },
  servers: [
    {
      url: "https://sanber62-firman.vercel.app/api",
      description: "Live Server",
    },
    {
      url: "http://localhost:3000/api",
      description: "Local Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      LoginRequest: {
        email: "xxx",
        password: "xxx",
      },
      RegisterRequest: {
        username: "test username",
        email: "xxx",
        password: "xxx",
        confirmPassword: "xxx",
        roles: ["user"],
      },
      ProductRequest: {
        category: "676f854b988f3d5f4a3e2009",
        name: "Buku 1",
        description: "Book 1 description",
        price: 50000,
        qty: 20,
      },
    },
  },
};
swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
