#!/bin/bash

# Prisma scripts
bun db:generate
bun db:pull
bun db:migrate
bun db:seed

# Start da aplicação
bun start