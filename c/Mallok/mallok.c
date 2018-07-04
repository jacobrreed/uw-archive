/*
	Jacob Reed
    TCSS 333 Summer 2017
	HW6
*/
#include<stdio.h>
#include<memory.h>
#include<stdlib.h>
#include "mallok.h"

struct aBlock;
typedef struct aBlock{
	void * address;//memory address
	unsigned int size;//number of bytes
	char isFree;
	struct aBlock *next;
} Block;

//Global block
static Block *myBlock = NULL;

/**
Aquires a block of memory with int size
*/
void create_pool(int size){
	void* memory = malloc(size); //Allocate memory for size
	
	if(myBlock){ 
		free(myBlock->address);
		free(myBlock);
		myBlock=NULL;
	}
	
	if(memory!=NULL){
		myBlock=(Block*)malloc(sizeof(Block));
		myBlock->next=NULL;
		myBlock->isFree=1;
		myBlock->size=size;
		myBlock->address=memory;
	}
}

/**
Allocates block of memory with int size of bytes
Returns NULL if not possible, splits block if block > size required
*/
void *my_malloc(int size){
	Block *tmp, *cur, *next; 
	
	cur = myBlock;
	
	//If this block is  valid block AND is not free or not enough space move on
	while(cur !=NULL && (!cur->isFree||cur->size<size)){
		cur = cur->next;
	}
	//If this block is not null, is free, and has enough space
	if((cur !=NULL) && (cur->isFree) && (cur->size >= size)){
		//If this block has more memory than needed, split
		if(cur->size > size){
			tmp = (Block*) malloc(sizeof(Block));
			tmp->isFree = 1; //This block is free
			tmp->next = cur->next;
			tmp->size = cur->size-size; //Set size of block to current block size minus allocated space
			tmp->address = (void*)(size + (char*)cur->address); //Change address of new block
			cur->next = tmp; //Put this split block next to new block
		}
		cur->isFree = 0; //Block is not free
		cur->size = size; //Set block size to parameter size
		return cur->address; //Return address of block that data was stored in
	} else {
		return NULL; //If no block available to place in or split, return NULL
	}
}

/**
Returns the block to the private heap and makes it available for storage.
*/
void my_free(void *block){
	Block *prev, *cur, *next;
	prev = NULL;
	cur = myBlock;
	
	//Go through blocks list until block is the one we want to free
	while((cur != NULL) && (cur->address != block)){
		prev=cur;
		cur=cur->next;
	}
	
	//If block given is invalid then do nothing, return 0
	if(cur == NULL) {
		return;
	}
	
	cur->isFree = 1; //Make block free again
	
	//Combine both previous block and current block if previous block is valid and free
	//Essentially here we are merging the free blocks together for one big block/partition
	if((prev!=NULL) && (prev->isFree)){
		prev->size += cur->size; //increase size of previous block to merge them
		prev->next = cur->next; //Set prev->next to current->next so that it links to next block.
		free(cur); //Free this current block, bye. Don't need anymore.
		cur = prev; //Current equals previous, which is linked and merged properly
	}
	
	//Merge next block
	next = cur->next;
	if((next!=NULL) && (next->isFree)){ //If next is valid and free
		cur->size += next->size; //Merge size
		cur->next = next->next; //Merge next pointers
		free(next); //Free next. Bye. Don't need anymore.
	}
}

