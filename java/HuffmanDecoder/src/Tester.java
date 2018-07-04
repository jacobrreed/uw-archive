/*
 * Jacob Reed
 * TCSS 342 Summer 2017
 * Assignment 2
 */
import java.util.Map;
import java.util.TreeMap;

/**
 * Test Driver program that encodes, decodes, creates Huffman tree, etc.
 * @author j9xinca
 *
 */
public class Tester {
	private static Map<Character, Integer> myFreqTable;
	private static HuffmanTree myTree;
	private static HuffmanTreeNode mySubTree;
	private static Map<Character, String> myBitCodes;
	
	public static void main(final String[] theArgs) {
		//Test String
		String testString;
		if(theArgs.length == 0) {
			throw new IllegalArgumentException("Usage: Tester \"string\"");
		} else if (theArgs[0].length() < 2) {
			throw new IllegalArgumentException("1st Parameter String must be at least 2 characters!");
		} else {
			testString = theArgs[0];
		}
		
		//Build Frequency Table
		HuffmanFrequencyTable testTable = new HuffmanFrequencyTable(testString);
		
		//Store table locally
		myFreqTable = new TreeMap<Character, Integer>();
		myFreqTable = testTable.getTable();
	    
		//Sort table based on frequency, low to high?
	    //TODO maybe
	    
		//Create Tree
	    myTree = new HuffmanTree(testTable.getLeaves());
	    
	    //Sub tree
	    mySubTree = myTree.getRoot();
	    
	    //Encode
	    Encoder enc = new Encoder(mySubTree);
	    myBitCodes = enc.getBitCodeData();
	    printTable(myFreqTable, myBitCodes);
	    
	    //Print codes
	    String huffCode = createHuffCode(testString, myBitCodes);
	    
	    //Decode
	    Decoder dec = new Decoder(huffCode, mySubTree);
	    String decoded = "Decoded string: " + dec.decodeMessage();
        System.out.println(decoded);
	}
	
	/**
	 * Creates the Huffman code and outputs to console.
	 * @param theMessage Message that is to be encoded/decoded
	 * @param theBitCode Bit codes for each letter
	 * @return String for printing.
	 */
	private static String createHuffCode(String theMessage, Map<Character, String> theBitCode) {

        StringBuilder huffmanCode = new StringBuilder();
        int size = 0;

        for (int i = 0; i < theMessage.length(); i++) {
            huffmanCode.append(theBitCode.get(theMessage.charAt(i)));
            size += theBitCode.get(theMessage.charAt(i)).length();
        }

        System.out.println("Encoded bit stream: ");
        System.out.println(huffmanCode);
        System.out.println("Total number of bits without Huffman coding: " + theMessage.length() * 16);
        System.out.println("Total number of bits with Huffman coding: " + size);

        return huffmanCode.toString();
    }
	
	/**
	 * Prints the table of characters with frequency and bit code.
	 * @param theFrequency Frequencies 
	 * @param theBitCode Bit codes
	 */
	private static void printTable(Map<Character, Integer> theFrequency, Map<Character, String> theBitCode) {

        System.out.println("=======================================");
        System.out.println("\tchar \tfrequency \tcode");
        System.out.println("---------------------------------------");

        for (Character key : theFrequency.keySet()) {
            System.out.printf("\t%c \t%d               %s\n", key, theFrequency.get(key), theBitCode.get(key));
        }

        System.out.println("=======================================");
    }

}

