FROM node:24.16.0-bookworm AS build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .
RUN --mount=type=secret,id=env_file,target=/app/.env pnpm run build
RUN pnpm prune --prod

FROM node:24.16.0-slim AS runtime
RUN apt-get update -y && apt-get install -y --no-install-recommends \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
COPY --from=build /app/public /app/public
ENV NODE_ENV=production
ENTRYPOINT ["node", "/app/dist/index.js"]
