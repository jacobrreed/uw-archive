/*
 * Jacob Reed
 * Summer 2017
 * TCSS 33
 * Assignment 5
 * 
*/
#include <stdio.h>
#include <stdlib.h>
#include "list.h"

int main(void) {
    Node *intlist = NULL, *intlist2 = NULL, *intlist3 = NULL;
    intlist = add_to_list(intlist, 9);
    intlist = add_to_list(intlist, 7);
    intlist = add_to_list(intlist, 5);
    intlist = add_to_list(intlist, 3);
    intlist = add_to_list(intlist, 1);
	printf("#1 ");
	printAll(intlist);
	
    intlist2 = add_to_list(intlist2, 8);
    intlist2 = add_to_list(intlist2, 8);
    intlist2 = add_to_list(intlist2, 6);
    intlist2 = add_to_list(intlist2, 4);
	intlist2 = add_to_list(intlist2, 2);
	printf("#2 ");
	printAll(intlist2);
    printf("##############\n");
	
	//nodupdata TEST
    printf("NODUPE TEST\n");
    printf("List 1 : ");
	if(nodupdata(intlist)) {
		printf("List has no duplicates!\n");
	} else {
		printf("List has duplicates!\n");
	}
    printf("##############\n");
    
    //nodupdata TEST 2
    printf("NODUPE TEST 2\n");
    printf("List 2: ");
    if(nodupdata(intlist2)) {
		printf("List has no duplicates!\n");
	} else {
		printf("List has duplicates!\n");
	}
	printf("##############\n");
    
	//doubleAll TEST
    printf("DOUBLE TEST\n");
	printf("Duplicating each element in List 1.\n");
	intlist = doubleAll(intlist);
	printAll(intlist);
	printf("##############\n");
    
    //doubleAll TEST 2
    printf("DOUBLE TEST 2\n");
	printf("Duplicating each element in List 2.\n");
	intlist2 = doubleAll(intlist2);
	printAll(intlist2);
    printf("##############\n");
    
	//deleteAll TEST
    printf("DELETE TEST 1\n");
	printf("Removing all 7's from List 1!\n");
	intlist = deleteAll(intlist, 7);
	printAll(intlist);
    printf("##############\n");
    
    //deleteAll TEST 2
    printf("DELETE TEST 2\n");
	printf("Removing all 4's from List 2!\n");
	intlist2 = deleteAll(intlist2, 4);
	printAll(intlist2);
    printf("##############\n");
    
	//merge TEST  - FAIL it is merging side by side
	printf("MERGE TEST\n");
    printf("List 1: ");
    printAll(intlist);
    printf("List 2: ");
    printAll(intlist2);
    printf("List 1 + 2 Merged: \nMerged ");
    intlist3 = merge(intlist, intlist2);
	printAll(intlist3);
    printf("##############\n");
	
    //MERGE TEST 2
    printf("MERGE TEST 2\n");
    printf("List 3:");
    printAll(intlist3);
    Node* list4 = NULL;
    list4 = add_to_list(list4, 12);
    list4 = add_to_list(list4, 9);
    list4 = add_to_list(list4, 3);
    list4 = add_to_list(list4, 1);
    printf("List 4:");
    printAll(list4);
    printf("List 3 + List 4 Merged:\n");
    Node* mergedList2 = NULL;
    mergedList2 = merge(intlist3, list4);
    printAll(mergedList2);
    printf("##############\n");
	
	//Loopless TEST 1
	printf("LOOPLESS LENGTH TEST\n");
    Node* loopTest1 = NULL;
    loopTest1 = add_to_list(loopTest1, 1);
    loopTest1 = add_to_list(loopTest1, 2);
    loopTest1 = add_to_list(loopTest1, 3);
    loopTest1 = add_to_list(loopTest1, 4);
    loopTest1 = add_to_list(loopTest1, 5);
    printf("Loopless List:");
    printAll(loopTest1);
    printf("Test List Length should return 5, because it terminates at NULL.\n");
    printf("Loopless Length: %d\n", looplesslength(loopTest1));
    printf("##############\n");
    
    //Loopless TEST 2
    printf("LOOPLESS LENGTH TEST 2\n");
    Node* current;
    current = loopTest1;
    current = current->next->next->next->next;
    current->next = loopTest1;
    printf("1 should now point to 5\n");
    printf("Should return -5, since 1 points to 5.\n");
    printf("Loopless Length: %d\n", looplesslength(loopTest1));
    printf("##############\n");
    return 0;
}