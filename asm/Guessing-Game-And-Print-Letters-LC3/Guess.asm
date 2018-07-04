;Jacob Reed
;Guess.asm
;Gets user input for a guess and checks against the number.
;TCSS 371A
;R4 = Guess number
;R5 = Number of guesses

.ORIG x3000
LD R4, const ;Stored value (default 6)
AND R5, R5, #0; ;Init number of guesses

LD R0, NL ;New Line
OUT ;Print New Line
AND R0, R0, #0 ;Clear R0
LEA R0, guess ;Load R0 with msg
PUTS ;Print R0
GETC ;R0 <-- Input
AND R6, R6, #0 ;Clear R6
ADD R6, R6, R0 ;Copy input to R6 for safe keeping
AND R0, R0, #0 ;Clear R0
BRnzp checkNum

;CHECK Input against R4
checkNum:
	ADD R5, R5, x0001 ;Increment guesses
	AND R2, R2, #0 ;Clear R2
	LD R2, MAX ;Add 57 to check if ASCII 0-9
	NOT R2, R2 ;Invert R2
	ADD R2, R2, #1 ;2's complement
	ADD R2, R2, R6 ;Subtract R6 from 39
	BRp invalidInput ;If positive, INVALID input
	AND R2, R2, #0 ;Clear R2
	LD R2, MIN ;Add 48 to check if ASCII 0-9
	NOT R2, R2 ;Invert
	ADD R2, R2, #1 ;2's complement
	ADD R2, R2, R6 ;Subtract R6 from 39
	BRn invalidInput ;If negative, INVALID input
	NOT R6, R6 ;Invert
	ADD R6, R6, #1 ;2's complement
	ADD R6, R6, R4 ;Subtraction
	BRp tooS ;Too Small Branch
	BRn tooB ;Too High Branch
	BRz win ;You Win! Branch

tooS:
	AND R0, R0, #0 ;Clear R0
	LD R0, NL ;New Line
	OUT ;Print New Line
	LEA R0, small ;Load "Too Small" message
	PUTS ;Print R0
	BRnzp guessAgain ;Branch to guess again

tooB:
	AND R0, R0, #0 ;Clear R0
	LD R0, NL ;New Line
	OUT ;Print New Line
	LEA R0, big ;Load "Too Big" message
	PUTS ;Print R0
	BRnzp guessAgain ;Branch to guess again

guessAgain:
	AND R0, R0, #0 ;Clear R0
	LD R0, NL ;New Line
	OUT ;Print New Line
	LEA R0, guessA ;Load "Guess Again" message
	PUTS ;Print R0
	GETC ;R0 <-- Input
	AND R6, R6, #0 ;Clear R6
	ADD R6, R6, R0 ;Copy input to R6 for safe keeping
	BRnzp checkNum ;Branch to check number

win:
	AND R0, R0, #0 ;Clear R0
	LD R0, NL ;New Line
	OUT ;Print New Line
	LEA R0, correct ;Load "Correct! You took" message
	PUTS ;Print Message
	AND R0, R0, #0 ;Clear R0 (just in case)
	LD R0, ZERO ;Load ASCII value for 0, to offset with number of guesses
	ADD R0, R0, R5 ;Offset 0 in ASCII with number of guesses
	OUT ;Print # corresponding to guesses
	LEA R0, correct2 ;Load "guesses." message
	PUTS ;Print Message
	BRnzp endIt ;DONE

invalidInput:
	LD R0, NL ;New Line
	OUT ;Print New Line
	LEA R0, INV ;Load invalid message
	PUTS ;Print invalid message
	BRnzp guessAgain ;Branch to guess again
	

endIt HALT ;HALT

const .FILL x0036 ;Correct choice number (6)
guess .STRINGZ "Guess a number:" ;Message on initial guess
small .STRINGZ "Too Small." ;Message for guess being under the value
big .STRINGZ "Too Big." ;Message for guess being above value
guessA .STRINGZ "Guess again:" ;Message to print during guess again branch
correct .STRINGZ "Correct! You took " ;First part of winning message
correct2 .STRINGZ " guesses." ;Second part of winning message
INV .STRINGZ "Invalid Input" ;Invalid Input message when entering numbers other than 0-9 48-57
ZERO .fill x30 ;ASCII code for '0' ;0 in ASCII to offset with number of guesses
NL .fill x0A ;Newline
MAX .fill #57 ;Max input value
MIN .fill #48 ;Min input value

.END