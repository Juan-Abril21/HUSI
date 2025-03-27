# Etapa de construcción
FROM node:18-alpine as build

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción con serve en lugar de nginx
FROM node:18-alpine

WORKDIR /app

# Instalar serve globalmente
RUN npm install -g serve

# Copiar los archivos de distribución desde la etapa de construcción
COPY --from=build /app/dist /app

# Puerto por defecto para serve
EXPOSE 3000

# Iniciar serve con bandera single para SPA
CMD ["serve", "-s", "/app", "-l", "3000", "--single"]