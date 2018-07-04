/*
 *  pcmatrix module
 *  Primary module providing control flow for the pcMatrix program
 * 
 *  Producer consumer bounded buffer program to produce random matrices in parallel
 *  and consume them while searching for valid pairs for matrix multiplication.
 *  Matrix multiplication requires the first matrix column count equal the 
 *  second matrix row count.  
 *
 *  A matrix is consumed from the bounded buffer.  Then matrices are consumed
 *  from the bounded buffer, one at a time, until an eligible matrix for multiplication
 *  is found.
 *
 *  Totals are tracked using the ProdConsStats Struct for:
 *  - the total number of matrices multiplied (multtotal from consumer threads)
 *  - the total number of matrices produced (matrixtotal from producer threads)
 *  - the total number of matrices consumed (matrixtotal from consumer threads)
 *  - the sum of all elements of all matrices produced and consumed (sumtotal from producer and consumer threads)
 *
 *  Correct programs will produce and consume the same number of matrices, and
 *  report the same sum for all matrix elements produced and consumed. 
 *
 *  For matrix multiplication only ~25% may be e
 *  and consume matrices.  Each thread produces a total sum of the value of
 *  randomly generated elements.  Producer sum and consumer sum must match.
 *
 *  University of Washington, Tacoma
 *  TCSS 422 - Operating Systems
 *  Fall 2018
 */

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <assert.h>
#include <time.h>
#include "matrix.h"
#include "counter.h"
#include "prodcons.h"
#include "pcmatrix.h"

int main(int argc, char *argv[])
{
  time_t t;
  // Seed the random number generator with the system time
  srand((unsigned)time(&t));

  printf("Producing %d %dx%d matrices.\n", LOOPS, ROW, COL);
  printf("Using a shared buffer of size=%d\n", MAX);
  printf("With %d producer and consumer thread(s).\n", NUMWORK);
  printf("\n");

  //Create stat trackers and init
  ProdConsStats prodStats;
  prodStats.multtotal = 0;
  prodStats.matrixtotal = 0;
  prodStats.sumtotal = 0;

  ProdConsStats conStats;
  conStats.multtotal = 0;
  conStats.matrixtotal = 0;
  conStats.sumtotal = 0;

  /*
  SINGLE THREAD TEST
  //Create one producer and one consumer thread TEST REMOVE AFTER
  pthread_t pr;
  pthread_t co;

  //Launch threads
  pthread_create(&pr, NULL, prod_worker, &prodStats);
  pthread_create(&co, NULL, cons_worker, &conStats);
  pthread_join(pr, NULL);
  pthread_join(co, NULL);
  */

  //Create an array of producer and consumer threads
  pthread_t producers;
  pthread_t consumers;
  int i;
  for (i = 0; i < NUMWORK; i++)
  {
    if (pthread_create(&producers, NULL, prod_worker, &prodStats) != 0)
    {
      printf("Producer thread #%d creation failed.\n", i);
    }
    if (pthread_create(&consumers, NULL, cons_worker, &conStats) != 0)
    {
      printf("Consumer thread #%d creation failed.\n", i);
    }
  }

  for (i = 0; i < NUMWORK; i++)
  {
    pthread_join(producers, NULL);
    pthread_join(consumers, NULL);
  }

  int prs = prodStats.sumtotal;
  int cos = conStats.sumtotal;
  int prodtot = prodStats.matrixtotal;
  int constot = conStats.matrixtotal;
  int consmul = conStats.multtotal;

  //Summary
  printf("Sum of Matrix elements --> Produced=%d = Consumed=%d\n", prs, cos);
  printf("Matrices produced=%d consumed=%d multiplied=%d\n", prodtot, constot, consmul);

  return 0;
}
