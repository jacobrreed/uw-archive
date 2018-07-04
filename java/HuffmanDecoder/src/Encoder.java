/*
 * Jacob Reed
 * TCSS 342 Summer 2017
 * Assignment 2
 */

import java.util.HashMap;
import java.util.Map;

/**
 * Encoder for Huffman tree
 * @author j9xinca
 *
 */
public class Encoder {

    private HuffmanTreeNode myRoot;
    private boolean myFound;
    private StringBuilder myBitCode;
    private Map<Character, String> myBitCodeTable;

    /**
     * Constructor.
     * @param theRoot Root node.
     */
    public Encoder(HuffmanTreeNode theRoot) {
        myRoot = theRoot;
        myBitCode = new StringBuilder();
        myFound = false;
        myBitCodeTable = new HashMap<>();
        createBitCodeTable(myRoot);
    }

    /**
     * Creates bit code table for Huffman tree.
     * @param myRoot Root Node.
     */
    private void createBitCodeTable(HuffmanTreeNode myRoot) {
    	//Traverse through tree adding 1s for right, 0s for left.
        if (myRoot.getLeft() != null) {
            myBitCode.append(0);
            createBitCodeTable(myRoot.getLeft());
            myBitCode.deleteCharAt(myBitCode.length() - 1);
        }

        if (myRoot.getChar() != null) {
            String str = String.valueOf(myBitCode);
            myBitCodeTable.put(myRoot.getChar(), str);
        }

        if (myRoot.getRight() != null && !myFound) {
            myBitCode.append(1);
            createBitCodeTable(myRoot.getRight());
            myBitCode.deleteCharAt(myBitCode.length() - 1);
        }

    }
    
    /**
     * Prints the bit codes table.
     */
    public void printBitCodeTable() {
        for (Character key : myBitCodeTable.keySet()) {
            System.out.println(key + ": " + myBitCodeTable.get(key));
        }
    }

    /**
     * Gets the bit code data for return.
     * @return Bit code data.
     */
    public Map<Character, String> getBitCodeData() {
        return myBitCodeTable;
    }

}