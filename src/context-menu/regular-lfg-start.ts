import { ApplicationCommandType, ContextMenuCommandBuilder, MessageContextMenuCommandInteraction } from "discord.js";
import { getLocale } from "../command/lfg/share";
import { getLocalizedString } from "../lfg/locale-map";
import { LfgManager } from "../lfg/lfg-manager";
import { isStarter } from "../lfg/regular-lfg-starter";
import { LfgUserManager } from "../lfg/lfg-user-manager";
import startRegularLfg from "../lfg/regular-lfg-start";

const regularLfgStart = new ContextMenuCommandBuilder()
    .setName("regular-lfg-start")
    .setType(ApplicationCommandType.Message)
    .setNameLocalizations({
        ko: "정규-파티모집-시작",
        ja: "定期パーティ募集開始"
    });

const hasStartPermission = (userID: string, guildID: string, lfgID: number) => {
    const starter = isStarter(userID, guildID);

    if (starter) return true;

    const creator = LfgUserManager.instance.getRegularUsers(lfgID)
        .find((user) => user.state == "CREATOR");
    return (creator && creator.userID == userID);
};

const doRegularLfgStart = async (interaction: MessageContextMenuCommandInteraction) => {
    const locale = getLocale(interaction.locale);
    const message = interaction.targetMessage;
    const embed = message.embeds[0];

    if (!embed) {
        return interaction.reply({
            ephemeral: true,
            content: getLocalizedString(locale, "invalidLfgMessage")
        });
    }

    const split = embed.title.replaceAll(" ", "")
        .split(":");
    try {
        const lfgID = Number(split[split.length - 1]);
        if (Number.isNaN(lfgID)) {
            throw new Error();
        }

        const lfg = LfgManager.instance.getRegularLfg(lfgID);
        if (!lfg) {
            throw new Error();
        }

        if (!hasStartPermission(interaction.user.id, interaction.guild.id, lfgID)) {
            return await interaction.reply({
                ephemeral: true,
                content: getLocalizedString(locale, "needPermissionToStartLfg")
            });
        }

        const result = await startRegularLfg(lfgID);
    } catch (ignore) {
        return interaction.reply({
            ephemeral: true,
            content: getLocalizedString(locale, "invalidLfgMessage")
        });
    }
};

export { regularLfgStart, doRegularLfgStart };
