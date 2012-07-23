> Nah: you could wirte your own argument handler, but why?

*Nah* is a simple command line argument/flag/parameter handler interface for Node.js.

I created *Nah* as a personal learning excersize, but  hopefully others will
find it useful. I fully intend to make as robust as reasonably possible.

# Goal

Simplify working with command line parameters. Allow Node.js scripts to access
command line parameters via objects rather than trying to parse [process.argv]
(http://nodejs.org/docs/latest/api/process.html#process_process_argv).

# Argument definitions

For each argument, the clients must provide the following information:

* namereq    - boolean: is the name required? (true false)
* parseorder - parsing order of unnamed args - lower numbers first, cannot be below 0.
	* If the name isn't required and praseorder isn't specified, unordered args
	  will after ordered args and appear in the order they are defined by the client.
* full       - full name of the arg (e.g. --wake-on-timestamp)
* short      - short name of the arg (e.g. -w)
* req        - boolean: if the caller must supply the arg (true [false])
* userval    - boolean: if the arg takes a user-supplied value ([true] false)
	* Args w/o userval are treated as Booleans with {unset:false,default:true}
* valreq     - boolean: if the caller must provide a value when arg is supplied (true [false])
* type       - type of data expected ([boolean], integer, float, string, character, etc.)
* default    - value if the caller supplies the arg without a value
* unset      - value if the caller doesn't supply the arg (same as default if not provided)

# Parameter specification schemes

## Basic flags

*Naw* must support Windows and *Nix style syntax.

     Win: /help /? /debug  /silent
    *nix: --help  --debug --silent

## Shorthand

Windows and *Nix have different shorthand syntax styles.

**Basic* Windows* shorthand is a slash (/) immediately followed by the shorthand
command name. Note that this is virtually identcal to Windows' standard
stynax.

**Multiple Windows** shortand commands follow the above syntax rules. Callers
MAY provide a space between commands. The slash (/) between commands MUST be
present.

	  Win: del /q /s
	  Win: del /q/s    // Supported by Windows, but toally weird
	  Win: del /qs     // Not supported by Winodws, but useful

**Basic \*Nix** shorthand commands begin with a single dash (-) as compared to
the standard double dash (--) and are immdiately followed by a single-
character command identifier.

** Multiple \*Nix** shorthand commands may be provided using two different
schemes. First, multiple commands can be specified using the basic shorthand
syntax with a space ( ) between each basic command. Second, multiple commands
can be specified by providing a single dash (-) immediatley followed by a
string of single-character command identifiers. Both syntaxes achieve the same
result.

	 *nix: -h -d -s
	 *nix: -hds

## Operations on multiple entities

Command line arguments may appear in any order. *Nah* must be able to handle
arbitrary values placed outside the scope of a given argument. It must also
properly support arguments that do not take values immeidately followed by
an arbitrary value.

	  Win: del [arg] File-A [arg] File-B [arg]
	 *nix: rm  [arg] File-A [arg] File-B [arg]

## Parameter with value

Windows and *Nix use different syntaxes for 

Windows uses a colon to seperate argument and value.

	  Win: xcopy /d:10-24-12  

*Nix* uses two patterns to seperate argument and value: an equals character (=)
or a space ( ).

	 *nix: rm    --interactive=once

# Brainstorming

Clients will want/need to 

* Specify valid flags
* Set default flag values
* Interact with your args as objects, not as strings
* *(are these the same?)*
	* Read multiple values for a single arg name.
	* Easy handling of multiple values for a single arg?
		e.g. app.js --file-list=head.txt,shoulders.txt,knees.txt,toes.txt
* Let users pass in JSON obojects. (nice idea, I'm not looking forward to implementing it)

		// e.g.
		{1:"fred.xsl",2:"bob.txt"}