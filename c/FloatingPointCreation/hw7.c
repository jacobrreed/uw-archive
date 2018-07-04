/*
* Jacob Reed
* TCSS 333 Summer 2017
* HW7 Bitwise operations on floats
*/

#include <stdio.h>

//Union for float representation in binary, holds float and binary rep
typedef union {
    float fnumerator;
    unsigned int bits : 32;
} BinaryFloat;

//BT represents 1 byte
typedef unsigned char BT;

//Prints out the steps of creating fractions
void createFraction(BinaryFloat myBinFloat) {
    BT b; //Byte
    int i;
    int exp, shift, sign;
    double numerator = 1.0, denominator = 2.0;
    float fract = 1.0, result = 1.0;
  
    //Shift exponent
    shift = ((myBinFloat.bits & 0x7F800000) >> 23) - 127; 
    //Sign
    sign = (myBinFloat.bits & 0x80000000) >> 31;
    
    myBinFloat.bits = myBinFloat.bits << 9;

    printf("\nCreating the fraction:\n");
    printf("fraction = 1.000000 (the implicit 1)\n");

    //Fraction creation and printout
    for (i = 0; i < 23; i++) {
        //Current fraction bit
        b = (myBinFloat.bits & 0x80000000) >> 31;
        fract = numerator / denominator;
        
        if (b == 1) {
            result += fract;
            printf("fraction = %f, after adding %f\n", result, fract);
        } else {
            printf("fraction = %f, after skipping %f\n", result, fract);
            }  
        
        myBinFloat.bits = myBinFloat.bits << 1; //Shift 1
        denominator += denominator;
    }
    
    printf("\nApplying the exponent:\n");
    printf("unshifted exponent = %d\n", shift);
    
    //Modify based on shift
    if (shift > 0) {
        for (i = 0; i < shift; i++) {
            printf("times 2 = %f\n", result *= 2);
            }
    } else {
        for (i = 0; i > shift; i--) {
            printf("divided by 2 = %f\n", result /= 2);
            }
    }

    //Check sign, if == 1, make negative
    if (sign == 1) {
        result -= (result * 2);
        }
    
    printf("\nFinal Answer: %f\n", result);
}

//Prints binary represenation fo the float in 32 bit format
void printBinRepOfFloat(BinaryFloat myBinFloat) {
    int i;
    printf("Your float in 32 bits: ");
    //Print all bits
    for ( i = 0; i < 32; i++) {
        printf("%d", (myBinFloat.bits & 0x80000000) >> 31);
        //Shift bit by 1
        myBinFloat.bits = myBinFloat.bits << 1; 
    }
    printf("\n");
}

//Prints fraction, exponent, and sign seperated
void printBinFloatParts(BinaryFloat myBinFloat) {
    int i;
    for (i = 0; i < 32; i++) {
        if (i == 0) {  
            printf("Sign: ");
        } 
        else if (i == 1) {
            printf("\nExponent: ");
        } 
        else if (i == 9) {
            printf("\nFraction: ");
        }

        printf("%d", (myBinFloat.bits & 0x80000000) >> 31);        
        myBinFloat.bits = myBinFloat.bits << 1; //shift by 1
    }
    printf("\n");
}

void main(void) {
    float fn;
    //User Input
    printf("Enter a float: ");
    scanf("%f", &fn);
    printf("Your float was read as: %f\n", fn);
    
    //Create Binary Float representation
    BinaryFloat myBinFloat;
    myBinFloat.fnumerator = fn;
    
    //Print Info
    printBinRepOfFloat(myBinFloat);
    printBinFloatParts(myBinFloat);
    createFraction(myBinFloat);
}

