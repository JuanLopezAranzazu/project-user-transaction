-- Script para inicializar la base de datos y crear las tablas necesarias
\c postgres;
DROP DATABASE IF EXISTS mydatabase;
CREATE DATABASE mydatabase;

\c mydatabase;

-- Crear tabla "User"
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Crear índice único para el campo "email" en la tabla "User"
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- Crear tabla "Transaction"
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- Agregar clave foránea en "Transaction" referenciando "User"
ALTER TABLE "Transaction" 
ADD CONSTRAINT "Transaction_userId_fkey" 
FOREIGN KEY ("userId") 
REFERENCES "User"("id") 
ON DELETE RESTRICT 
ON UPDATE CASCADE;