/*
Jacob Reed
HW3
TCSS 333 Summer
*/
#include <stdio.h>
#include <string.h>

#define MAXNAMELEN 20 
#define MAXNAMES 1000
#define YEARS 10


void processFile(char theFile[11], int currentYear, char theNames[][MAXNAMELEN], int theRanks[][YEARS], int *totalNames) {
    FILE *inputFile = fopen(theFile, "r");
    int line = 1;
    char seps[] = ",";
    while(line <= 100) { //read first 100 lines
        char* tempName;
        int* tempRank;
        char tempLine[50];
        fscanf(inputFile, "%s", tempLine);
        
        //Get name
        tempName = strtok(tempLine, seps);
        
        //Check if name exists in array
        int i, found = 0, insertion;
        for(i = 0; i < (*totalNames); i++) {
            if(strcmp(theNames[i], tempName) == 0) {
                found = 1;
                insertion = i;
                theRanks[insertion][currentYear] = line; //add rank CHANGE THIS TO CURRENT YEAR
            } 
        }
        
        //If name does exist

        if(found == 0) { //If name doesn't exist
            strcpy(theNames[*totalNames], tempName); //copy name to next available spot
            theRanks[*totalNames][currentYear] = line; //add corresponding rank for current year
            (*totalNames)++; //increment how many total names there are
        }
        line++; //Next line
    }

    fclose(inputFile);
    
}

void processAllFiles(char theNames[][MAXNAMELEN], int theRanks[][YEARS], int *totalNames) {
    char * fileNames[] = {
        "yob1920.txt",
        "yob1930.txt",
        "yob1940.txt",
        "yob1950.txt",
        "yob1960.txt",
        "yob1970.txt",
        "yob1980.txt",
        "yob1990.txt",
        "yob2000.txt",
        "yob2010.txt"
    };
    
    int year;
    //For each file name process file, passing year number 0-9
    for(year = 0; year <= 9; year++) {
        processFile(fileNames[year], year, theNames, theRanks, totalNames);
    }
}

void writeFile(char theNames[][MAXNAMELEN], int theRanks[][YEARS], int *totalNames) {
    FILE *outFile = fopen("output.csv", "w");
    char header[] = "Name,1920,1930,1940,1950,1960,1970,1980,1990,2000,2010\n";
    
    //Write header info for CSV
    fprintf(outFile, header);
    
    //For every name
    int i = 0;
    while(i <= (*totalNames)) {
        int x;
        //Write name
        fprintf(outFile, "%s,",&theNames[i]);
        //For every rank
        for(x = 0; x <= 9; x++) {
            int tempRank = theRanks[i][x];
            if(tempRank == -1) { //If no rank
                fprintf(outFile, ","); //Add comma
            } else { //Add rank
                fprintf(outFile, "%d,", tempRank);
            }
        }
        fprintf(outFile, "\n"); //Jump to next line in CSV
        i++;
    }
    
    fclose(outFile);
}

void switchRank(char theNames[][MAXNAMELEN], int theRanks[][YEARS], int eleA, int eleB) {
    char tmp[MAXNAMELEN];
    int i = 0, tr;
    if (eleA == eleB)
        return;
    strcpy(tmp, theNames[eleA]);
    strcpy(theNames[eleA], theNames[eleB]);
    strcpy(theNames[eleB], tmp);
    while(i< 10){
        tr = theRanks[eleA][i];
        theRanks[eleA][i] = theRanks[eleB][i];
        theRanks[eleB][i] = tr;
        i++;
    }
}

void sortArrays(char theNames[][MAXNAMELEN], int theRanks[][YEARS], int totalNames) {
    int i = 0, j, min;
    while(i < totalNames){
        min = i;
        for (j = i + 1; j < totalNames; ++j) {
            if (strcmp(theNames[j], theNames[min]) < 0)
                min = j;
        }
        if (min != i) {
            switchRank(theNames, theRanks, min, i);
        }
        i++;
    }
}

int main(void) {
    char names[MAXNAMES][MAXNAMELEN];
    int ranks[MAXNAMES][YEARS];
    int totalNames = 0;
    
    //Init ranks array to all -1 values for parsing blank ranks
    memset(ranks, -1, sizeof(ranks[0][0]) * MAXNAMES * YEARS);

    //Process all files
    processAllFiles(names, ranks, &totalNames);
    
    //Sort names & ranks
    sortArrays(names, ranks, totalNames);
    
    //Write File
    writeFile(names, ranks, &totalNames);

}


