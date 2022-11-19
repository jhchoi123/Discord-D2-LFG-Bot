import { BotAdmin } from "./bot-admin";
import RegularLfgStarter from "./regular-lfg-starter";
import { LongTermLfg, NormalLfg, RegularLfg } from "./lfg";
import { ServerLfgConfig } from "./server-lfg-config";
import { LongTermLfgUser, NormalLfgUser, RegularLfgUser } from "./lfg-user";
import { LongTermLfgThread, NormalLfgThread, RegularLfgThread } from "./lfg-thread";
import { LongTermLfgMessage, NormalLfgMessage, RegularLfgMessage } from "./lfg-message";

const index = [
    BotAdmin,
    RegularLfgStarter,
    NormalLfg,
    LongTermLfg,
    RegularLfg,
    ServerLfgConfig,
    NormalLfgUser,
    LongTermLfgUser,
    RegularLfgUser,
    NormalLfgThread,
    LongTermLfgThread,
    RegularLfgThread,
    NormalLfgMessage,
    LongTermLfgMessage,
    RegularLfgMessage
];

export default index;
