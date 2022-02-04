/**
 * @name NotificationPrompter
 * @description This is a plugin intended to prompt the user when joining a server with chat notifications default. 
 * @version 0.2.3
 * @author OneSketchyGuy
 * @authorLink https://github.com/onesketchyguy
 * @source https://github.com/onesketchyguy/NotificationPrompter/blob/main/NotificationPrompt.plugin.js
 * @updateUrl https://raw.githubusercontent.com/onesketchyguy/NotificationPrompter/main/NotificationPrompt.plugin.js
 * @website https://github.com/onesketchyguy/NotificationPrompter
 */

// Cache all the required modules
let MessageNotifications = BdApi.findModuleByProps('resolvedMessageNotifications');
let GuildStore = BdApi.findModuleByProps("getGuild"); 
let SelectedGuildIDManager = BdApi.findModuleByProps("getLastSelectedGuildId");

const ARBITRARY_JOIN_TIME = 0.1;

 module.exports = class NotificationPrompter {	 
	start() { } // Required function. Called when the plugin is activated (including after reloads)
	stop()  { } // Required function. Called when the plugin is deactivated
	
	getAlertHead() { return "HEADS UP!"; }
	getAlert(name) { return "This server has all message notifications enabled."; }
	
	onSwitch() {
		// Get the ID from the current server/guild
		const guildID = SelectedGuildIDManager.getLastSelectedGuildId();

		// Only show one notification per server/guild
		if (guildID == this.lastGuildID) return;
		this.lastGuildID = guildID;

		// Get the server/guild from the ID
		const guild = GuildStore.getGuild(guildID);

		// Check for if the user has overwritten the default notification settings
		const userSettings = MessageNotifications.getMessageNotifications(guildID);

		 // On found server with Notify all messages flag
		if (guild.defaultMessageNotifications == 0 && userSettings == 0) {
			// Compare difference between the join date and current date
			const diff = (Date.now() - guild.joinedAt) / 86400000;

			if (diff <= ARBITRARY_JOIN_TIME) {
				BdApi.alert(this.getAlertHead(), this.getAlert());
			}
			else {
				BdApi.showToast(this.getAlertHead() + " " + this.getAlert(), {type:"warning", icon: true});
			}

			// FIXME: Provide user with an option to disable the notification settings
		}
	}
}