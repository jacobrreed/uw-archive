;Jacob Reed
;Crypt.asm
;Encrypts and Decrypts messages (Caesar Cypher)
;TCSS 371A

.ORIG x3000

LEA	R0, PROMPT	;Load prompt
PUTS			;Display prompt
GETC 			;Get Input
LD 	R6, CHOICEADDR	;Loads x3100 into R6
STR 	R0, R6, #0 	;Store input at x3100
LD 	R5, CHOICEOFF 	;Load -68 into R5 TO TEST IF E OR D WAS ENTERED
LDI 	R4, CHOICEADDR	;Load x3100 value into R4
ADD 	R5, R4, R5 	;Subtract TO TEST E OR D
BRz 	DECRYPT 	;Branch to decrypt
BRp 	ENCRYPT 	;Branch to encrypt

DECRYPT:	
	JSR 	GETKEY		;GET KEY
	JSR 	GETMSG		;GET MSG
	LD	R6, MSGADDR	;Load message address
	LD	R3, ALGADDR	;Load storage address to store e/d string
DECRYPTINNER:
	LDR	R4, R6, #0	;Load character into R4
	BRz	PRINTOUT	;If at end of message, notated by a 0, Branch to print out
	LDI	R5, KEYADDR	;Load e/d key into R5
	NOT	R5, R5		;Inverse
	ADD	R5, R5, #1	;2's Complement
	ADD	R4, R4, R5	;Subtract key
	LD	R5, BITTOG	;Load the bit toggler value
	NOT	R2, R4		;TOGGLE BIT ALGORITHM
	AND	R2, R2, R5	;TOGGLE BIT ALGORITHM
	NOT	R5, R5		;TOGGLE BIT ALGORITHM
	AND	R4, R4, R5	;TOGGLE BIT ALGORITHM
	ADD	R4, R4, R2	;TOGGLE BIT ALGORITHM
	STR	R4, R3, #0	;Store at address
	ADD	R3, R3, #1	;Increment crypted message address
	ADD	R6, R6, #1	;Increment message address
	BRnzp 	DECRYPTINNER	;LOOP until done

ENCRYPT:

	JSR 	GETKEY		;GET KEY
	JSR 	GETMSG		;GET MSG
	LD	R6, MSGADDR	;Load message address
	LD	R3, ALGADDR	;Load storage address to store e/d string
ENCRYPTINNER:
	LDR	R4, R6, #0	;Load character into R4
	BRz	PRINTOUT	;If at end of message, notated by a 0, Branch to print out
	LD	R5, BITTOG	;Load the bit toggler value
	NOT	R2, R4		;TOGGLE BIT ALGORITHM
	AND	R2, R2, R5	;TOGGLE BIT ALGORITHM
	NOT	R5, R5		;TOGGLE BIT ALGORITHM
	AND	R4, R4, R5	;TOGGLE BIT ALGORITHM
	ADD	R4, R4, R2	;TOGGLE BIT ALGORITHM
	LDI	R5, KEYADDR	;Load e/d key into R5
	ADD	R4, R4, R5	;ADD Key to toggled bits
	STR	R4, R3, #0	;Store at address
	ADD	R3, R3, #1	;Increment crypted message address
	ADD	R6, R6, #1	;Increment message address
	BRnzp 	ENCRYPTINNER	;LOOP until done
	
GETKEY:
	ST 	R7, R7SAV	;Saves R7 to be restored after
	LD	R0, NL		;Load New Line
	OUT 			;Print New Line
	LEA 	R0, KEYMSG 	;Load key message
	PUTS 			;Display Message
	GETC
	ADD 	R6, R6, #1 	;Increment memory address
	LD 	R5, NUMBEROFF 	;Load -48 into R5
	ADD 	R0, R0, R5 	;Subtract to get input number
	STR 	R0, R6, #0	;Store number at x3101
	ADD	R6, R6, #1	;Incremement memory to x3012
	LD	R7, R7SAV	;Restore R7
	RET			;Return to Encrypt/Decrypt

GETMSG:
	ST 	R7, R7SAV	;Saves R7 to be restored after
	LD 	R0, NL 		;Load New Line
	OUT 			;Print New Line
	LEA 	R0, MESSAGE	;Load message
	PUTS 			;Print message
	JSR	GETMSGLOOP	;Jump to GETMSGLOOP to get message until ENTER
	LD	R7, R7SAV	;Restore R7
	RET			;Return to Encrypt/Decrypt

GETMSGLOOP:
	ST 	R7, R7SAV2	;Saves R7 to be restored after
GETMSGLOOPINNER:
	GETC			;Get character
	OUT			;ECHO input
	STR	R0, R6, #0	;Store character at memory location
	ADD 	R6, R6, #1	;Incremement memory pointer
	LD 	R4, ENTTEST	;LD <ENTER> tester
	ADD 	R4, R4, R0	;ADD (subtract) tester
	BRnp	GETMSGLOOPINNER	;If not 0 Loop
	ADD	R6, R6, #-1	;Decrement memory address
	AND	R4, R4, #0	;Clear R4
	STR	R4, R6, #0	;Store 0 at end of message for printing later
	LD	R7, R7SAV2	;Restore R7
	RET			;If 0 return to GETMSG

PRINTOUT:
	LD	R3, ALGADDR	;Load address of message into R4
PRINTINNER:
	LDR	R0, R3, #0	;Load ecrypted/decrypted message address into R0 for printing
	BRz END			;If arrive at 0 HALT
	OUT			;Print char
	ADD	R3, R3, #1	;Increment Address
	BRnp 	PRINTINNER	;Loop

END	HALT

;VARIABLES-----------
CHOICEOFF 	.FILL 		#-68 		;Offset to test E or D input
NUMBEROFF 	.FILL 		#-48 		;Offset to test number input for key
R7SAV		.BLKW		1		;Save memory for saving R7 for JSR's
R7SAV2		.BLKW		1		;Save memory for saving R7 during GETMSG for double jump
BITTOG		.FILL		00000001	;To toggle last bit

;ADDRESSES-------------
CHOICEADDR 	.FILL 		x3100 		;Memory space to save encrypt/decrypt input
MSGADDR		.FILL		x3102		;Memory space of message
ALGADDR		.FILL		x3117		;Memory space to save encrypted/decrypted message
KEYADDR		.FILL		x3101		;Memory address of encryption/decryption key

;MESSAGES--------------
MESSAGE 	.STRINGZ	"Enter message (20 char limit): " 	;Enter message prompt
KEYMSG 		.STRINGZ	"Enter encryption key(1-9): " 		;Enter key prompt
PROMPT 		.STRINGZ 	"Type (E)ncrypt/(D)ecrypt: " 		;Choice Prompt
NL 		.FILL		x0A 					;New Line
ENTTEST		.FILL		x-0A					;Enter tester

.END