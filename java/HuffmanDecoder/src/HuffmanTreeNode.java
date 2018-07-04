/*
 * Jacob Reed
 * TCSS 342 Summer 2017
 * Assignment 2
 */

/**
 * Huffman Tree Node
 * @author j9xinca
 *
 */
public class HuffmanTreeNode {
	private int myFreq;
	private Character myChar;
	private HuffmanTreeNode myLeft;
	private HuffmanTreeNode myRight;
	
	/**
	 * Constructor.
	 * @param theChar Character
	 * @param theFrequency Frequency
	 */
	public HuffmanTreeNode(Character theChar, int theFrequency) {
		myChar = theChar;
		myFreq = theFrequency;
		myLeft = null;
		myRight = null;
	}
	
	/**
	 * Gets frequency.
	 * @return Int Frequency
	 */
	public int getFreq() {
		return myFreq;
	}
	
	/**
	 * Gets char data.
	 * @return Char data from node.
	 */
	public Character getChar() {
		return myChar;
	}
	
	/**
	 * Gets left node.
	 * @return Node Left
	 */
	public HuffmanTreeNode getLeft() {
		return myLeft;
	}
	
	/**
	 * Gets right node.
	 * @return Right Node.
	 */
	public HuffmanTreeNode getRight() {
		return myRight;
	}
	
	/**
	 * Sets frequency for node.
	 * @param theFreq Frequency to set.
	 */
	public void setFreq(int theFreq) {
		myFreq = theFreq;
	}
	
	/**
	 * Sets char data for node.
	 * @param theChar Char to set.
	 */
	public void setChar(Character theChar) {
		myChar = theChar;
	}
	
	/**
	 * Sets left node.
	 * @param theLeft Node to set as left.
	 */
	public void setLeft(HuffmanTreeNode theLeft) {
		myLeft = theLeft;
	}
	
	/**
	 * Sets right node.
	 * @param theRight Node to set as right.
	 */
	public void setRight(HuffmanTreeNode theRight) {
		myRight = theRight;
	}
	
	/**
	 * To String to test nodes data.
	 */
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("Key: " + myChar + " Freq: " + myFreq + "\n");
		return sb.toString();
	}
}
