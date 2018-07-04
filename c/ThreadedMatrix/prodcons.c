/*
 *  prodcons module
 *  Producer Consumer module
 * 
 *  Implements routines for the producer consumer module based on 
 *  chapter 30, section 2 of Operating Systems: Three Easy Pieces
 *
 *  University of Washington, Tacoma
 *  TCSS 422 - Operating Systems
 *  Fall 2016
 */

// Include only libraries for this module
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include "counter.h"
#include "matrix.h"
#include "pcmatrix.h"
#include "prodcons.h"
#include <sys/types.h>
#include <sys/syscall.h>

// Define Locks and Condition Variables
pthread_mutex_t prodConsLock = PTHREAD_MUTEX_INITIALIZER; //Lock for producer/consumer
pthread_mutex_t getPutLock = PTHREAD_MUTEX_INITIALIZER;   //Lock for put/get
pthread_mutex_t counterLock = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t filled = PTHREAD_COND_INITIALIZER;         //filled condition
pthread_cond_t spaceAvailable = PTHREAD_COND_INITIALIZER; //spaceAvailable condition                                        //Ready flag

//Create counters
counters_t prodConCounter;
int fill_ptr = 0;
int use_ptr = 0;
int count = 0; //Holds current number of matrices in shared buffer

//Shared Buffer
Matrix *buffer[MAX];

//Matrices to multiply and store result
Matrix *M1, *M2, *M3;

/* Bounded buffer put()
Adds a matrix to end of bounded buffer
*/
int put(Matrix *value)
{
  pthread_mutex_lock(&getPutLock);
  buffer[fill_ptr] = value;
  fill_ptr = (fill_ptr + 1) % MAX;
  count++;
  pthread_mutex_unlock(&getPutLock);
}

/*Bounded buffer get()
Retrieves matrix from beginning of bounded buffer
*/
Matrix *get()
{
  pthread_mutex_lock(&getPutLock);
  Matrix *temp = buffer[use_ptr];
  use_ptr = (use_ptr + 1) % MAX;
  count--; //causes a hang sometimes
  pthread_mutex_unlock(&getPutLock);
  return temp;
}

/* Matrix PRODUCER worker thread
Call put() from within and add all necessary locks, condition variables, and signals.
*/
void *prod_worker(void *arg)
{
#if OUTPUT
  printf("Producer Thread Created PID=%lu\n", pthread_self());
#endif
  ProdConsStats *prodStats = (ProdConsStats *)arg;
  int i;
  for (i = 0; i < LOOPS; i++)
  {
    pthread_mutex_lock(&prodConsLock);
    //While the count is at max, sleep thread
    while (count == MAX)
      pthread_cond_wait(&spaceAvailable, &prodConsLock);

    //Create a random matrix and call put() to store into shared buffer
    Matrix *temp;
    temp = GenMatrixRandom();
    //temp = GenMatrixBySize(3, 3);
    put(temp);

    //Increase stat counters
    pthread_mutex_lock(&counterLock);
    prodStats->matrixtotal += 1;
    prodStats->sumtotal += SumMatrix(temp);
    pthread_mutex_unlock(&counterLock);

    //signal
    pthread_cond_signal(&filled);
    pthread_mutex_unlock(&prodConsLock);
  }
}

/* Matrix CONSUMER worker thread
*/
void *cons_worker(void *arg)
{
#if OUTPUT
  printf("Consumer Thread Created PID=%lu\n", pthread_self());
#endif
  //Cast argument as ProdConsStats
  ProdConsStats *conStats = (ProdConsStats *)arg;

  int i;
  for (i = 0; i < LOOPS; i++)
  {
    pthread_mutex_lock(&prodConsLock);
    //When buffer is spaceAvailable sleep
    while (count == 0)
      pthread_cond_wait(&filled, &prodConsLock);

    //If M1 is empty get M1
    if (M1 == NULL)
    {
      M1 = get();
      pthread_mutex_lock(&counterLock);
      conStats->matrixtotal++;
      conStats->sumtotal += SumMatrix(M1);
      pthread_mutex_unlock(&counterLock);
    } //If M2 is empty get M2 and check for multiplication compatibility
    else if (M2 == NULL)
    {
      M2 = get();
      pthread_mutex_lock(&counterLock);
      conStats->matrixtotal++;
      conStats->sumtotal += SumMatrix(M2);
      pthread_mutex_unlock(&counterLock);
      //If not compatible empty M2
      if (MatrixMultiply(M1, M2) == NULL)
      {
        //Increase consumed total
        pthread_mutex_lock(&counterLock);
        pthread_mutex_unlock(&counterLock);
        FreeMatrix(M2);
        M2 = NULL;
      }
    }

    //If M1 and M2 are filled and compatible multiply
    if (M1 != NULL && M2 != NULL)
    {
      printf("MULTIPLY (%d x %d) BY (%d x %d):\n", M1->rows, M1->cols, M2->rows, M2->cols);
      DisplayMatrix(M1, stdout);
      printf("    X\n");
      DisplayMatrix(M2, stdout);
      //Multiply M1xM2
      M3 = MatrixMultiply(M1, M2);
      //Increase multiplier total
      pthread_mutex_lock(&counterLock);
      conStats->multtotal++;
      pthread_mutex_unlock(&counterLock);
      printf("    =\n");
      DisplayMatrix(M3, stdout);
      FreeMatrix(M1);
      FreeMatrix(M2);
      FreeMatrix(M3);
      M1 = NULL;
      M2 = NULL;
      M3 = NULL;
    }

    //signal
    pthread_cond_signal(&spaceAvailable);
    pthread_mutex_unlock(&prodConsLock);
  }
}
