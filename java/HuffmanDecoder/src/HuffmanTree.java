/*
 * Jacob Reed
 * TCSS 342 Summer 2017
 * Assignment 2
 */
import java.util.List;
//import java.util.PriorityQueue;

/**
 * Huffman Tree
 * @author j9xinca
 *
 */
public class HuffmanTree {
	private List<HuffmanTreeNode> myNodes;
	//private PriorityQueue<HuffmanTreeNode> myQ; //Unsure of usage of priorityQueue, doing work around, come back to this later and FIX
	
	/**
	 * Constructor.
	 * @param theLeaves
	 */
	public HuffmanTree(List<HuffmanTreeNode> theLeaves) {
		myNodes = theLeaves;
		createTree();
	}
	
	/**
	 * Creates the Huffman tree given nodes.
	 */
	private void createTree() {
		int a;
		int b;
		HuffmanTreeNode newNode;
		
		while(myNodes.size() > 1) {
			a = findMinimum();
			HuffmanTreeNode nodeOne = myNodes.get(a);
			myNodes.remove(a);
			
			b = findMinimum();
			HuffmanTreeNode nodeTwo = myNodes.get(b);
			myNodes.remove(b);
			
			newNode = new HuffmanTreeNode(null, nodeOne.getFreq() + nodeTwo.getFreq());
			newNode.setLeft(nodeOne);
			newNode.setRight(nodeTwo);
			myNodes.add(newNode);
		}
	}
	
	/**
	 * Finds the minimum node frequencies.
	 * @return index of minimum.
	 */
	private int findMinimum() {
		int next;
		int min = myNodes.get(0).getFreq();
		int ind = 0;
		
		for (int i = 0; i < myNodes.size() - 1; i++) {
			next = myNodes.get(i + 1).getFreq();
			if (min >= next) {
				min = next;
				ind = i + 1;
			}
		}
		return ind;
	}
	
	/**
	 * Gets root node.
	 * @return Root Node
	 */
	public HuffmanTreeNode getRoot() {
		return myNodes.get(0);
	}
}
