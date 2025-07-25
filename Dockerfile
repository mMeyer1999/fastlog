FROM node:20-alpine
WORKDIR /app
COPY package*.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build
CMD ["bun", "run", "start"]

LABEL authors="mm"
