#include <stdio.h>
#include <stdlib.h>

typedef struct node_tag {
   int value;
   struct node_tag *next;
} Node;



/* prints all data in list */
void printAll(Node* list);

/* adds n to front of list */
Node *add_to_list(Node *list, int n);

/* adds n to front of list, alternative version */
void add_to_listP2P(Node **list  ,int n);

/* return boolean indicating if list is in order,
   i.e. never decreasing */
int inOrder(Node *list);

/* remove n from the list */
Node *delete_from_list(Node *list, int n);



int looplesslength(Node *list);

Node *merge(Node* list1, Node* list2);

int nodupdata(Node *list);

Node *doubleAll(Node* list);

Node *deleteAll(Node *list, int n);


