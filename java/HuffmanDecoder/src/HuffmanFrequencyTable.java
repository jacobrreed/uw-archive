/*
 * Jacob Reed
 * TCSS 342 Summer 2017
 * Assignment 2
 */

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

/**
 * Creates Huffman frequency table and nodes.
 * @author j9xinca
 *
 */
public class HuffmanFrequencyTable {
	private String myString;
	private Map<Character, Integer> myFreqTable;
	private List<HuffmanTreeNode> myLeaves;
	
	/**
	 * Constructor.
	 * @param theString String to create frequencies for.
	 */
	public HuffmanFrequencyTable(final String theString) {
		myString = theString;
		myFreqTable = new TreeMap<Character, Integer>();
		buildTable();
		myLeaves = new ArrayList<>();
		createLeaves();
	}
	
	/**
	 * Creates leaf nodes.
	 */
	private void createLeaves() {
		for(Character c : myFreqTable.keySet()) {
			myLeaves.add(new HuffmanTreeNode(c, myFreqTable.get(c)));
		}
	}
	
	/**
	 * Gets leave nodes
	 * @return Leave Nodes as a list.
	 */
	public List<HuffmanTreeNode> getLeaves() {
		return myLeaves;
	}
	
	/**
	 * Builds a table by first splitting string into char array, 
	 * then placing one instance of each char into map, 
	 * and setting the value appropriately.
	 */
	private void buildTable() {
		char[] temp = myString.toCharArray();
		for (char c : temp) {
			if(myFreqTable.containsKey(c)) {
				myFreqTable.put(c, myFreqTable.get(c) + 1);
			} else {
				myFreqTable.put(c, 1);
			}
		}
	}
	
	/**
	 * Returns the frequency table
	 * @return Map containing char as keys, and the frequency as values.
	 */
	public Map<Character, Integer> getTable() {
		return myFreqTable;
	}
}
