import fastify, { FastifyRequest } from "fastify";
import { postMessageService } from "./services/post-message.ts";
import "dotenv/config";
import { getMessagesService } from "./services/get-message.ts";

const app = fastify();

export interface messageBodySchema {
  mensagem: string;
}

app.get("/message", (request, reply) => {
  reply.send({
    mensagem: "Você pediu por uma mensagem padrão da o'Guedes API",
  });
});

app.post(
  "/message",
  async (request: FastifyRequest<{ Body: messageBodySchema }>, reply) => {
    const { mensagem } = request.body;

    if (!mensagem) {
      return reply
        .status(400)
        .send({ error: "O campo 'mensagem' é obrigatório." });
    }

    const result = await postMessageService(mensagem);
    return reply
      .status(201)
      .send({ message: "Mensagem enviada com sucesso", id: result.id });
  }
);

app.get("/my-message", async (request, reply) => {
  const mensagens = await getMessagesService();
  return reply.send({ mensagens });
});

const PORT = Number(process.env.PORT) || 3333;

app.listen({ port: PORT, host: "0.0.0.0" }).then(() => {
  console.log("⚙🔥Server's running...");
});
