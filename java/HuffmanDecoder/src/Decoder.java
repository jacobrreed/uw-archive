/*
 * Jacob Reed
 * TCSS 342 Summer 2017
 * Assignment 2
 */

/**
 * Decoder.
 * @author j9xinca
 *
 */
public class Decoder {
    private String myString;
    private HuffmanTreeNode myRoot;
    
    /**
     * Constructor.
     * @param theMessage Message to decode in bit code.
     * @param theRoot Root node.
     */
    public Decoder(String theMessage, HuffmanTreeNode theRoot) {
        myString = theMessage;
        myRoot = theRoot;
    }
    
    /**
     * Gets decode message.
     * @return Decoded message.
     */
    public String decodeMessage() {
        HuffmanTreeNode lowerTree = myRoot;
        StringBuilder aString = new StringBuilder();
        boolean found = false;
        //Traverse appending characters.
        for (int i = 0; i < myString.length(); i++) {
            if (found) {
                lowerTree = myRoot;
                found = false;
            }

            if (myString.charAt(i) == '0') {
                if (lowerTree.getLeft().getChar() == null) {
                    lowerTree = lowerTree.getLeft(); 
                } else {
                    aString.append(lowerTree.getLeft().getChar());
                    found = true;
                }
            } else {
                if (lowerTree.getRight().getChar() == null) {
                    lowerTree = lowerTree.getRight();
                } else {
                    aString.append(lowerTree.getRight().getChar());
                    found = true;
                }
            }
        }

        return aString.toString();
    }
    
    /**
     * Prints the decoded message.
     */
    public void printDecodedMessage() {
        System.out.println(myString);
    }

}