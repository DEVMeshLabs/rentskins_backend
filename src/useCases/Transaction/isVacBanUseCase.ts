export class IsVacBanUseCase {
  constructor() {}
  async execute(owner_id: string) {
    const vacBan = await fetch(
      `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1?key=0B98876BF7EBF6720920F4F00CD20FA3&steamids=${owner_id}`
    ).then((response) => response.json());

    return vacBan;
  }
}
