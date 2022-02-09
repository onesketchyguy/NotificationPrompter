This is a plugin intended to prompt the user when joining a server with chat notifications default. 
Very simple, every time you join a server that has notification settings set to "All messages" you'll get a warning letting you know about it.
If you manually set the message notifications to anything other than notify all, you won't get this warning.

This will appear when you have been in the server for some amount of time. (Editable in script)

![notification](https://user-images.githubusercontent.com/34846360/153130254-b8f74cb6-6346-4865-bda8-55cb58f98991.png)

This will appear when you are new to a server. (Editable in script)

![popup](https://user-images.githubusercontent.com/34846360/153130260-53af2f1a-cb04-476f-9150-71efe354d3ad.PNG)


SCRIPT EDITING
If you do want to edit the time period it's very easy. Open the edit panel, and change 
`const ARBITRARY_JOIN_TIME = 1 * MINUTE;` 
The digit here is the number of minutes before you are no longer considered new to a server.

The code is commented pretty explicitly, if anything is confusing find me on my discord and ask me about it.

DEV NOTE: This plugin is pretty much dead. It's where I want it, so I won't be updating it again willingly. The community around this application was very toxic at the time of writing so I had a terrible experience working on this very simple plugin. I won't be coming back unless BetterDiscord gets a massive overhaul.
