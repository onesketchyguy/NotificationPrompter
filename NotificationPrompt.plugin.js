/**
 * @name NotificationPrompter
 * @description This is a plugin intended to prompt the user when joining a server with chat notifications default. 
 * @version 0.2.2
 * @author OneSketchyGuy
 * @authorLink https://github.com/onesketchyguy
 * @source https://github.com/onesketchyguy/NotificationPrompter/blob/main/NotificationPrompt.plugin.js
 * @updateUrl https://raw.githubusercontent.com/onesketchyguy/NotificationPrompter/main/NotificationPrompt.plugin.js
 * @website https://github.com/onesketchyguy/NotificationPrompter
 */

let MessageNotifications;
let GuildStore;
let SelectedGuildIDManager;

const ARBITRARY_JOIN_TIME = 0.1;

 module.exports = class NotificationPrompter {
	getName() { return "Notification prompter"; }
	getAlertHead() { return "HEADS UP!"; }
	getAlert(name) { return "This server has all message notifications enabled."; }
	 
	load()  { // Optional function. Called when the plugin is loaded in to memory

		// Cache all the required modules
		MessageNotifications = BdApi.findModuleByProps('resolvedMessageNotifications');
		GuildStore = BdApi.findModuleByProps("getGuild"); 
		SelectedGuildIDManager = BdApi.findModuleByProps("getLastSelectedGuildId");
	}

	start() { this.load() } // Required function. Called when the plugin is activated (including after reloads)
	stop()  { } // Required function. Called when the plugin is deactivated

	observer(changes) { } // Optional function. Observer for the `document`. Better documentation than I can provide is found here: <https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver>

	onSwitch() {
		// Get the ID from the current server/guild
		var guildID = SelectedGuildIDManager.getLastSelectedGuildId();
		console.log(guildID);

		// Only show one notification per server/guild
		if (guildID == this.lastGuildID) return;
		this.lastGuildID = guildID;

		// Get the server/guild from the ID
		var guild = GuildStore.getGuild(guildID);

		// Check for if the user has overwritten the default notification settings
		var userSettings = MessageNotifications.getMessageNotifications(guildID);

		 // On found server with Notify all messages flag
		if (guild.defaultMessageNotifications == 0 && userSettings == 0) {
			// Compare difference between the join date and current date
			var joinDate = guild.joinedAt;
			var diff = (Date.now()-joinDate)/86400000;
			console.log(diff);

			if (diff <= ARBITUARY_JOIN_TIME) {
				BdApi.alert(this.getAlertHead(), this.getAlert());
			}
			else {
				BdApi.showToast(this.getAlertHead() + " " + this.getAlert(), {type:"warning", icon: true});
			}

			// FIXME: Provide user with an option to disable the notification settings
		}
	}
}