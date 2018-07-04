;Jacob Reed
;PrintLetters.asm
;Prints alphabet in order then reverse order
;TCSS 371A

.ORIG x3000
LD R2, alpha ;Loads "A" into R2
LD R3, counter ;Loads counter into R3

BRp inOrder ;Start in order print

inOrder:
	AND R0, R0, #0 ;Clear R0
	ADD R0, R2, #0 ;Loads char into R0
	OUT ;Prints char
	ADD R2, R2, #1 ;Increment char
	ADD R3, R3, #-1 ;Decrement counter
	BRp inOrder ;Loop
	BRz resetCounter ;Resets counter

resetCounter:
	AND R3, R3, #0 ;Resets counter
	LD R3, counter ;New counter
	ADD R2, R2, #-1; Offset for reverse print
	BRnzp reversePrint ;Start reverse print

reversePrint:
	AND R0, R0, #0 ;Clear R0
	ADD R0, R2, #0 ;Load char into R0
	OUT ;Prints char
	ADD R2, R2, #-1 ;Decrement char
	ADD R3, R3, #-1 ;Decrement counter
	BRp reversePrint ;Loop
	BRnz end ;Ends program
	
end HALT

alpha .fill x41 ;ASCII "A"
counter .fill #26 ;Counter

.END