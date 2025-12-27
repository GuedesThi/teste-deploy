export const listaMensagens: string[] = [];

export function postMessageService(data: string) {
  listaMensagens.push(data);
}
