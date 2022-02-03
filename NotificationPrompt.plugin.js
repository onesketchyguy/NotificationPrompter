/**
 * @name NotificationPrompter
 * @description This is a plugin intended to prompt the user when joining a server with chat notifications default. 
 * @version 0.1.3
 * @author OneSketchyGuy
 * @authorLink https://github.com/onesketchyguy
 * @source https://github.com/onesketchyguy/NotificationPrompter/blob/main/NotificationPrompt.plugin.js
 * @updateUrl https://raw.githubusercontent.com/onesketchyguy/NotificationPrompter/main/NotificationPrompt.plugin.js
 * @website https://github.com/onesketchyguy/NotificationPrompter
 */
 
 module.exports = class NotificationPrompter {
	getName() { return "Notification prompter"; }
	getAlertHead() { return "HEADS UP!"; }
	getAlert() { return "This server has global notifications enabled."; }
	//getUseAlert() { return this.useAlerts; }
	 
	load()  { } // Optional function. Called when the plugin is loaded in to memory
	start() { } // Required function. Called when the plugin is activated (including after reloads)
	stop()  { } // Required function. Called when the plugin is deactivated

	observer(changes) { } // Optional function. Observer for the `document`. Better documentation than I can provide is found here: <https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver>

	// getSettingsPanel() {
		// this.useAlerts = !this.useAlerts;
		
		// if (this.useAlerts == true) BdApi.alert("Notificatins", "will appear like this.");
		// else if (this.useAlerts == false) BdApi.showToast("Notificatins will appear like this.", {type:"info", icon: true});
		// return null;
	// }

	onSwitch() {
		// Get the ID from the current server/guild
		var ID = BdApi.findModuleByProps("getLastSelectedGuildId").getLastSelectedGuildId();
		
		// Only show one notification per server/guild
		if (ID == this.lastGuild) return;
		this.lastGuild = ID;
		
		// Get the server/guild from the ID
		var guild = BdApi.findModuleByProps("getGuild").getGuild(ID);
		//console.log(guild);

		// FIXME: Add a check for if the user has overwritten the default notification settings
		// FIXME: Add a check if this is the first time the user has joined this server
		if (guild.defaultMessageNotifications == 0) { // On found server with Notify all messages flag
			// FIXME: Provide user with an option to disable the notification settings
			//if (this.getUseAlert() == true) BdApi.alert(this.getAlertHead(), this.getAlert());
			
			BdApi.showToast(this.getAlertHead() + " " + this.getAlert(), {type:"warning", icon: true});
		}
	}
}