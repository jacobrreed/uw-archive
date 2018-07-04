/*
	Jacob Reed
    TCSS 333 Summer 2017
	HW6
*/
#include <stdio.h>
#include <memory.h>
#include <assert.h>
#include"mallok.h"

/*
* Test 1:
* Create a pool of 1000 bytes.  
* Count how times you can successfully request a block of size 10
*/
void testOne(){
	int size = 1000;
	int block_size = 10;
	int time = 0;
	void*blks;
	create_pool(size);
	while((blks=my_malloc(block_size)) != NULL) {
		++time;
	}
	printf("Test #1:\n\tPool Size:%d\n\tBlock Size:%d\n\tRequests for Blocks Count: %d (Block Size: %d * Requests: %d = Pool Size: %d)\n", 
			size, block_size, time, block_size, time, size);
	
	printf("Test #1: Successful!\n");
}

/*
* Test 2:
* Create a pool of 1000 bytes.  
* Make 5 requests for blocks of 200 bytes.  
* Free all 5 blocks.  
* Repeat this request/free pattern several times to make sure you can use blocks after they are returned
*/
void testTwo(){
	int size = 1000;
	int blk_size = 200;
	void*blks[5];
	int k, n;
	create_pool(size);
	for(n=0; n<10; ++n){
		for(k=0; k<5; ++k){
			blks[k] = my_malloc(blk_size);
			assert(blks[k] != NULL);
		}
		for(k=0; k<5; ++k){
			my_free(blks[k]);
			blks[k]=NULL;
		}
	}
	
	printf("Test #2: Successful!\n");
}

/*
* Test #3:
* Create a pool of 1000 bytes.  
* Make 5 requests for blocks of 200 bytes.   
* Free the middle block. 
* Request a block of 210 bytes (it should fail) 
* Request a block of 150 bytes (it should succeed) 
* Request a block of 60 bytes (it should fail) 
* Request a block of 50 bytes (it should succeed) 
*/
void testThree(){
	int size=1000;
	void *blk1, *blk2, *blk3, *blk4, *blk5, *blk6, *blk7; //7 blocks
	
	create_pool(size);
	blk1=my_malloc(200); //request 200 byte block
	assert(blk1);
	blk2=my_malloc(200); //request 200 byte block
	assert(blk2);
	blk3=my_malloc(200); //request 200 byte block
	assert(blk3);
	blk4=my_malloc(200); //request 200 byte block
	assert(blk4);
	blk5=my_malloc(200); //request 200 byte block
	assert(blk5);

	//Free middle block
	my_free(blk3);
	blk3=NULL;
	
	//Request new blocks 210, 150, 60, 50
	blk3=my_malloc(210); //Should Fail
	assert(blk3 == NULL);
	blk3=my_malloc(150); //Should pass
	assert(blk3 != NULL);
	blk6=my_malloc(60); //Should fail
	assert(blk6 == NULL);
	blk7=my_malloc(50); //Should pass
	assert(blk7 != NULL);
	
	printf("Test #3: Successful!\n");
}

/*
* Test #4:
* Create a pool of 1000 bytes.    
* Request  5 blocks of 200 bytes.    
* Fill the first block with the letter 'A', the second block with 'B', etc. 
* Verify that the values stored in each block are still there.  (Is the first block full of A's, second block full of B's, etc.)
*/
void testFour(){
	int size=1000;
	void *blk1, *blk2, *blk3, *blk4, *blk5; //5 blocks
	char *tmp;
	
	create_pool(size);
	
	blk1=my_malloc(200);//request 200 byte block
	assert(blk1); //Check blocks
	memset(blk1, 'A', 200); //Fill with 'A's
	blk2=my_malloc(200);//request 200 byte block
	assert(blk1); //Check blocks
	memset(blk2, 'B', 200); //Fill with 'B's
	blk3=my_malloc(200);//request 200 byte block
	assert(blk1); //Check blocks
	memset(blk3, 'C', 200);//Fill with 'C's
	blk4=my_malloc(200);//request 200 byte block
	assert(blk1); //Check blocks
	memset(blk4, 'D', 200);//Fill with 'D's
	blk5=my_malloc(200);//request 200 byte block
	assert(blk1); //Check blocks
	memset(blk5, 'E', 200);//Fill with 'E's
	
	//Check if all blocks still contain their chars
	for(tmp = (char*)blk1; tmp < (char*) blk1+200; ++tmp) {
		assert(*tmp == 'A');
	}
	for(tmp = (char*)blk2; tmp < (char*) blk1+200; ++tmp) {
		assert(*tmp == 'B');
	}
	for(tmp = (char*)blk3; tmp < (char*) blk1+200; ++tmp) {
		assert(*tmp == 'C');
	}
	for(tmp = (char*)blk4; tmp < (char*) blk1+200; ++tmp) {
		assert(*tmp == 'D');
	}
	for(tmp = (char*)blk5; tmp < (char*) blk1+200; ++tmp) {
		assert(*tmp == 'E');
	}
	printf("Test #4: Successful!\n");
}

/*
* Test #5:
* Create a pool of 1000 bytes. 
* Request and return a block of 1000 bytes 
* Request and return four blocks of 250 bytes 
* Request and return ten blocks of 100 bytes 
*/
void testFive(){
	int size=1000;
	void *blk1;
	void *blks[10];
	int k;
	create_pool(size); //Create pool of 1000 bytes
	
	//Request and return block of 1000 bytes
	blk1=my_malloc(1000);
	assert(blk1);
	my_free(blk1);
	
	//Request and return four blocks of 250 bytes.
	for(k=0;k<4;k++){
		blks[k]=my_malloc(250);
		assert(blks[k]);
	}
	//Free all four blocks
	for(k=0;k<4;k++){
		my_free(blks[k]);
	}
	//Request and return ten blocks of 100 bytes
	for(k=0;k<10;k++){
		blks[k]=my_malloc(100);
		assert(blks[k]);
	}
	//Free all ten blocks
	for(k = 0; k < 10; k++) {
		my_free(blks[k]);
	}
	
	printf("Test #5: Successful!\n");
}

void main(void){
	testOne();
	testTwo();
	testThree();
	testFour();
	testFive();
}