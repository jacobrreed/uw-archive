/*
Jacob Reed
Operating Systems
University of Washington Tacoma
Autumn 2018
EXTRA CREDIT ALERT!:
Supports unlimited arguments
*/
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <fcntl.h>
#include <sys/stat.h>
#include <assert.h>
#include <time.h>

#define MAXIN 255
#define SEP "--------------------------------------------------------------------------------"

//Globals
int currProc = 0;
const char *procStrFin[] = {"First process finished...", "Second process finished...", "Third process finished..."};
pid_t wpid;
int status = 0;

//Response Struct
struct Response
{
  int pid1;
  int pid2;
  int pid3;
  char *result1;
  char *result2;
  char *result3;
  double time1;
  double time2;
  double time3;
};

//Fork and run command with args returns response struct
struct Response runCmd(char *command1, char *command2, char *command3, char *file)
{
  struct Response res;
  res.result1 = "";
  res.result2 = "";
  res.result3 = "";

  /*
    Command 1 Parse
    */
  char *fullCommand1 = strcat(command1, " ");
  fullCommand1 = strcat(fullCommand1, file);
  //Create an array of split commands for arg1 of execvp
  char *p1s = strtok(fullCommand1, " ");     //start token pointer
  char *splitCommand1[strlen(fullCommand1)]; //init split command array based on size of full command
  int i1 = 0;                                //init counter
  while (p1s != NULL)                        //Loop through each word and store in array
  {
    splitCommand1[i1++] = p1s;
    p1s = strtok(NULL, " ");
  }
  splitCommand1[i1] = NULL; //NULL terminate array

  /*
    Command 2 Parse
    */
  char *fullCommand2 = strcat(command2, " ");
  fullCommand2 = strcat(fullCommand2, file);
  //Create an array of split commands for arg1 of execvp
  char *p2s = strtok(fullCommand2, " ");     //start token pointer
  char *splitCommand2[strlen(fullCommand2)]; //init split command array based on size of full command
  int i2 = 0;                                //init counter
  while (p2s != NULL)                        //Loop through each word and store in array
  {
    splitCommand2[i2++] = p2s;
    p2s = strtok(NULL, " ");
  }
  splitCommand2[i2] = NULL; //NULL terminate array

  /*
    Command 3 Parse
    */
  char *fullCommand3 = strcat(command3, " ");
  fullCommand3 = strcat(fullCommand3, file);
  //Create an array of split commands for arg1 of execvp
  char *p3s = strtok(fullCommand3, " ");     //start token pointer
  char *splitCommand3[strlen(fullCommand3)]; //init split command array based on size of full command
  int i3 = 0;                                //init counter
  while (p3s != NULL)                        //Loop through each word and store in array
  {
    splitCommand3[i3++] = p3s;
    p3s = strtok(NULL, " ");
  }
  splitCommand3[i3] = NULL; //NULL terminate array

  /*
    FORKS
    */
  double time_spent1 = 0.0;
  double time_spent2 = 0.0;
  double time_spent3 = 0.0;
  clock_t begin = clock();
  clock_t end;

  int p1 = fork();
  if (p1 == 0) //P1 Controlled
  {
    //Output redirect to file and run command
    close(STDOUT_FILENO);
    int p1file = open("p1.temp", O_CREAT | O_WRONLY | O_TRUNC, S_IRWXU);
    execvp(splitCommand1[0], splitCommand1);
    //Output error
    printf("CMD1:[SHELL 1] STATUS CODE=-1\n");
    exit(1);
  }
  else //Parent Controlled
  {
    end = clock();
    time_spent1 += (double)(end - begin) * 1000.0 / CLOCKS_PER_SEC;
    printf("%s\n", procStrFin[currProc]);
    res.pid1 = p1;
    res.time1 = time_spent1;
    currProc++;

    int p2 = fork();
    if (p2 == 0) //P2 Controlled
    {
      close(STDOUT_FILENO);
      int p2file = open("p2.temp", O_CREAT | O_WRONLY | O_TRUNC, S_IRWXU);
      execvp(splitCommand2[0], splitCommand2);
      //Output error
      printf("CMD2:[SHELL 2] STATUS CODE=-1\n");
      exit(1);
    }
    else //Parent Controlled
    {
      end = clock();
      time_spent2 += (double)(end - begin) * 1000.0 / CLOCKS_PER_SEC;
      printf("%s\n", procStrFin[currProc]);
      res.pid2 = p2;
      res.time2 = time_spent2;
      currProc++;
      int p3 = fork();
      if (p3 == 0) //P3 Controlled
      {
        close(STDOUT_FILENO);
        int p3file = open("p3.temp", O_CREAT | O_WRONLY | O_TRUNC, S_IRWXU);
        execvp(splitCommand3[0], splitCommand3);
        //Output error
        printf("CMD3:[SHELL 3] STATUS CODE=-1\n");
        exit(1);
      }
      else //Parent Controlled
      {
        end = clock();
        time_spent3 += (double)(end - begin) * 1000.0 / CLOCKS_PER_SEC;
        printf("%s\n", procStrFin[currProc]);
        res.pid3 = p3;
        res.time3 = time_spent3;
        printf("Processing Results...\n");
        while ((wpid = wait(&status)) > 0)
          ;

        return res;
      }
    }
  }
}

//Quick max function
float max(float num1, float num2)
{
  return (num1 > num2) ? num1 : num2;
}

/* Take file path and read from file. Returns content*/
char *readFromFile(char *filename)
{
  char *buffer = 0;
  long length;
  FILE *f = fopen(filename, "rb");

  if (f)
  {
    fseek(f, 0, SEEK_END);
    length = ftell(f);
    fseek(f, 0, SEEK_SET);
    buffer = (char *)malloc((length + 1) * sizeof(char));
    if (buffer)
    {
      fread(buffer, sizeof(char), length, f);
    }
    fclose(f);
  }
  buffer[length] = '\0';
  remove(filename); //Delete file
  return buffer;
}

//Asks for input with prompt, returns string
char *getInput(char *prompt)
{
  char buf[MAXIN];
  printf("%s", prompt);
  fgets(buf, MAXIN, stdin);
  buf[strcspn(buf, "\n")] = 0; //remove newlines
  return strdup(buf);
}

//MAIN
int main(int argc, char const *argv[])
{
  //Prompts
  char buf[MAXIN];
  char *cmd1 = getInput("Welcome to MASH!\nmash-1>");
  char *cmd2 = getInput("mash-2>");
  char *cmd3 = getInput("mash-3>");
  char *fileCmd = getInput("file>");

  //Run commands and generate responses into struct
  struct Response response = runCmd(strdup(cmd1), strdup(cmd2), strdup(cmd3), strdup(fileCmd));

  //Command Results Output Formatting
  int pre = 12;
  int cmd1Len = 80 - (strlen(cmd1) + pre);
  int cmd2Len = 80 - (strlen(cmd2) + pre);
  int cmd3Len = 80 - (strlen(cmd3) + pre);
  char cmd1Sep[80] = "";
  for (int i = 0; i < cmd1Len; i++)
  {
    strcat(cmd1Sep, "-");
  }
  char cmd2Sep[80] = "";
  for (int i = 0; i < cmd2Len; i++)
  {
    strcat(cmd2Sep, "-");
  }
  char cmd3Sep[80] = "";
  for (int i = 0; i < cmd3Len; i++)
  {
    strcat(cmd3Sep, "-");
  }

  //Get file input
  char *cmd1Out = readFromFile("p1.temp");
  char *cmd2Out = readFromFile("p2.temp");
  char *cmd3Out = readFromFile("p3.temp");

  //Output results
  printf("-----CMD 1: %s%s\n", cmd1, cmd1Sep);
  printf("%sResult took:%fms\n", cmd1Out, response.time1);
  printf("-----CMD 2: %s%s\n", cmd2, cmd2Sep);
  printf("%sResult took:%fms\n", cmd2Out, response.time2);
  printf("-----CMD 3: %s%s\n", cmd3, cmd3Sep);
  printf("%sResult took:%fms\n", cmd3Out, response.time3);
  printf("%s\n", SEP);
  printf("Parent PID: %d\n", getpid());
  printf("Children process IDs: %d %d %d.\n", response.pid1, response.pid2, response.pid3);
  printf("Total elapsed time:%fms\n", max(response.time3, max(response.time2, response.time1)));

  return 0;
}
