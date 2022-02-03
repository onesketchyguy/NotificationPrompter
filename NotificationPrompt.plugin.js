/**
 * @name NotificationPrompter
 * @version 0.1.0
 * @description This is a plugin intended to prompt the user when joining a server with chat notifications default. 
 * @author OneSketchyGuy
 */
 
 module.exports = class NotificationPrompter {
	getName() { return "Notification prompter"; }
	getAlertHead() { return "HEADS UP!"; }
	getAlert() { return "This server has global notifications enabled."; }
	getUseAlert() { return false; }
	 
	load()  { } // Optional function. Called when the plugin is loaded in to memory
	start() { } // Required function. Called when the plugin is activated (including after reloads)
	stop()  { } // Required function. Called when the plugin is deactivated

	observer(changes) { } // Optional function. Observer for the `document`. Better documentation than I can provide is found here: <https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver>

	onSwitch() {
		var SelectedGuildStore = BdApi.findModuleByProps("getLastSelectedGuildId");
		var ID = SelectedGuildStore.getLastSelectedGuildId();
		
		if (ID == this.lastGuild) return;
		
		var GuildStore = BdApi.findModuleByProps("getGuild");
		var guild = GuildStore.getGuild(ID);
		console.log(guild);

		console.log(guild.joinedAt.getMinutes());

		// FIXME: Add a check for if the user has overwritten the default notification settings
		// FIXME: Add a check if this is the first time the user has joined this server
		if (guild.defaultMessageNotifications == 0) {
			// On found server with Notify all messages flag
			if (this.getUseAlert() == true) BdApi.alert(this.getAlertHead(), this.getAlert());
			else BdApi.showToast(this.getAlertHead() + " " + this.getAlert(), {type:"warning", icon: true});
			
			this.lastGuild = ID;
		}
	}
}