import { user, csgo } from "@/server";
import { FastifyReply } from "fastify";

export default class FloatParser {
  public static execute(array: any[], steamId: string, reply: FastifyReply) {
    // const steamid = "76561198195920183"; // Valor de Exemplo
    // ASSET ID CONTIDO NO INVENTÁRIO, É O ID DA ARMA
    // const assetsid = ["24996228323"]; // Valor de Exemplo
    // QUALQUER INSPECT LINK DA ARMA, CONTIDO NO INVENTÁRIO
    // Obs: É necessário apenas para pegar o id que vem depois do 'assetid%D',
    // contido no final da url
    // const inspectLinks = [
    //   "steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20S%owner_steamid%A%assetid%D9539414150741237703",
    // ]; // Valor de Exemplo
    console.log("Entrando");
    user.on("loggedOn", () => {
      user.gamesPlayed(730);
      console.log("Com");
      csgo.on("connectedToGC", () => {
        console.log("Logado !");
        if (csgo.haveGCSession) {
          return array.map((item, index) => {
            const filteredID = item.market_actions[0].link.slice(
              item.indexOf("%D") + 2,
              item.length
            );
            return csgo.inspectItem(
              steamId,
              item.assetsid,
              filteredID,
              ({ paintwear }) => reply.status(200).send(paintwear) // paintwear === float / Só precisamos dessa informação de cada arma,
              // Também dá pra puxar os Stickers, o nosso site vai utilizar também, caso queira já adicionar.
            );
          });
        } else {
          // ERRO NO LOGIN/CONEXÃO COM A GAME CONNECTION
          console.error("Error");
        }
      });
    });
    user.on("error", (error) => console.log(error));
  }
}
