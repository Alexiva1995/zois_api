import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configuración CORS con opciones específicas
  app.enableCors({
    origin: [
      'http://localhost:8100', // Origen de tu aplicación Ionic en desarrollo (ajústalo si es diferente)
      'https://zois.valdusoft.com/login', // Origen de tu aplicación Ionic en producción (descomenta y ajusta)
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Si necesitas manejar cookies o el encabezado de autorización
    allowedHeaders: 'Content-Type, Authorization',
  });
  const config = new DocumentBuilder()
    .setTitle("File Management API")
    .setDescription(
      "This API allows for file management with operations for uploading, downloading, and searching for images through Unsplash, designed for Zois by Ramón Figuera."
    )
    .setVersion("1.0")
    .addBearerAuth()
    .addTag("files", "Operations related to file management")
    .addTag("unsplash", "Operations related to searching for images on Unsplash")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
