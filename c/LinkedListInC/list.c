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

/*
 * Instructor Given Methods
*/
void printAll(Node* list) {
    Node* curr = list;
    printf("list: ");
    while (curr != NULL) {  // Watch Out: curr->next !=  NULL
        printf("%d ", curr->value);
        curr = curr->next;
    }
    printf("\n");
}

Node *add_to_list(Node *list, int n) {
    Node *new_node;
    new_node = malloc(sizeof(Node));
    if (new_node == NULL) {
        printf("Error: malloc failed in add_to_list\n");
        exit(EXIT_FAILURE);
    }
    new_node->value = n;
    new_node->next = list;
    return new_node;
}

void add_to_listP2P( Node **list  ,int n) {
    Node *new_node;
    new_node = malloc(sizeof(Node));
    if (new_node == NULL) {
        printf("Error: malloc failed in add_to_list\n");
        exit(EXIT_FAILURE);
    }
    new_node->value = n;
    new_node->next = *list;
    *list = new_node;
}

int inOrder(Node *list) {
    Node *curr = list;
    if (curr == NULL)
        return 1;
    while (curr->next != NULL) {  // SAFETY CHECK: curr  != NULL
        if (curr->value > curr->next->value) {  // SAFETY CHECK:  curr->next != NULL
            return 0;
        }
        curr = curr->next;
    }
    return 1;
} 

Node *delete_from_list(Node *list, int n) {
   Node *cur, *prev;
   for (cur = list, prev = NULL;
        cur != NULL ;
        prev = cur, cur = cur->next) {
        if (cur->value == n) {
            if (prev == NULL)
                list = list->next; /* n is in the first node */
            else
                prev->next = cur->next; /* n is in some other node */
            free(cur);
            break;
        }
   }
   return list;
}


/*
My Functions Below
*/

// Deletes every node in the list with N
Node *deleteAll(Node *list, int n) {
    Node *curr, *prev, *temp;
    curr = list, prev = NULL;

    while (curr != NULL) {
        if (list->value == n) {
            temp = list;
            list = list->next;
            curr = list;
            free(temp);
        }
        if (curr == NULL)
            return list;
        if (curr->value != n) {
            prev = curr;
            curr = curr->next;
        }
        if (curr != NULL && prev != NULL && curr->value == n) {
            temp = curr;
            prev->next = curr->next;
            curr = curr->next;
            free(temp);
        }
    }
    return list;
}

/*
Creates a duplicate for each element in list */
Node *doubleAll(Node* thelist) {
    Node *curr, *prev, *copy;
    //If list is empty return it.
    if (thelist == NULL) {
        return thelist;
	}
	curr = thelist;
    //Create a copy node for each node and copy data and relink list.
    while (curr != NULL) {
        copy = malloc(sizeof(Node)); //size of node
        prev = curr;
        curr = curr->next;
        copy->value = prev->value;
        copy->next = curr;
        prev->next = copy;
    }
    return thelist;
}

/*
Takes two lists and merges them without creating extra nodes. */
Node *merge(Node* list1, Node* list2) {
    Node *result, *current1, *current2, *temp, *prevTemp;
    current1 = list1, current2 = list2;
    temp = result;

    current1 = list1, current2 = list2;
    result = NULL;

    while (current1 != NULL || current2 != NULL) {
        //list2 < list1
        if (current1 != NULL && current2 != NULL && current2->value < current1->value) {
            temp = current2;
            current2 = current2->next;
            temp->next = NULL;
        } else if (current1 != NULL && current2 != NULL && current1->value <= current2->value) {
            temp = current1;
            current1 = current1->next;
            temp->next = NULL;
        } else if (current2 != NULL && current1 == NULL) { //List 2 not empty, list 1 empty
            temp = current2;
            current2 = current2->next;
            temp->next = NULL;
        } else if (current1 != NULL && current2 == NULL) { //List 2 empty, list1 not
            temp = current1;
            current1 = current1->next;
            temp->next = NULL;
        }
        //Create merge list
        if (result == NULL) {
            result = temp;
            prevTemp = result;
        } else {
            prevTemp->next = temp;
            prevTemp = prevTemp->next;
        }
    }
    return result;
}

// Returns 1 if no duplicates, 0 if duplicates
int nodupdata(Node *list) {
    int result = 1;

    Node *curr, *comp;
    curr = list;

    if (list == NULL)
        return result;
	
	//Double loops to run over each element and compare to current ele
    while (curr != NULL && result) {
        comp = curr;
        while (comp->next != NULL) {
            comp = comp->next;
            if (curr->value == comp->value)
                result = 0; 
        }
        curr = curr->next;
    }

    return result;
}

// Returns length of list if loopless, return negative number of length of loop list
int looplesslength(Node *list) {
    int listEnd = 0, nodesNum = 0, isLoop = 0, i;
    
    Node *curr, *scan;
    curr = list;

    // loop until end of list
    while (!listEnd) {
        //if at end of list exit loop and return number of nodes
        if (curr == NULL) {
            listEnd = 1;
        } else {
            curr = curr->next;
            if (curr != NULL) {
                nodesNum++;
            }
            // check if loops exists
            if (curr != NULL && curr->next != NULL) {
                for (i = 0, scan = list; i < nodesNum; i++, scan = scan->next) {
                    if (curr->next == scan) {
                        listEnd = 1;
                        isLoop = 1;
                    }
                }
            }
        }        
    }
    //incremenet node count
    if (nodesNum != 0) {
        nodesNum++;
    }
    //if there is a loop then negate
    if (isLoop) {
        nodesNum = nodesNum - (nodesNum * 2);
    }

    return nodesNum;
}