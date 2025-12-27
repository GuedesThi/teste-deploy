import fastify, { FastifyRequest } from "fastify";
import { listaMensagens, postMessageService } from "./services/post-message.ts";
import "dotenv/config";

const app = fastify();

export interface messageBodySchema {
  mensagem: string;
}

app.get("/", (request, reply) => {
  reply.send("Bem-vindo ao o'Guedes API!!!");
});

app.get("/message", (request, reply) => {
  reply.send({
    mensagem: "Você pediu por uma mensagem padrão da o'Guedes API",
  });
});

app.post(
  "/message",
  (request: FastifyRequest<{ Body: messageBodySchema }>, reply) => {
    const { mensagem } = request.body;
    postMessageService(mensagem);
    reply.send("Mensagem enviado com sucesso");
  }
);

app.get("/my-message", (request, reply) => {
  reply.send({ mensagemPersonalizada: listaMensagens });
});

const PORT = Number(process.env.PORT) || 3333;

app.listen({ port: PORT }).then(() => {
  console.log("⚙🔥Server's running...");
});
